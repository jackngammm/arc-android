import { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { colors, fonts, radius } from "@/constants/theme";
import { PrimaryButton } from "@/components/Buttons";
import {
  DOCUMENTED_FEATURE_KEYS,
  isValidMembershipCodeFormat,
  verifyMembershipCode,
  type MembershipVerificationResult,
} from "@/services/membership";

function featureLabel(value: boolean | undefined): string {
  if (value === true) return "Yes";
  if (value === false) return "No";
  return "Not reported";
}

export default function VerifyMembershipScreen() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [localError, setLocalError] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MembershipVerificationResult | null>(null);
  const [retrySecondsLeft, setRetrySecondsLeft] = useState<number | null>(null);

  useEffect(() => {
    if (retrySecondsLeft === null || retrySecondsLeft <= 0) return;
    const timer = setTimeout(() => setRetrySecondsLeft((s) => (s === null ? null : s - 1)), 1000);
    return () => clearTimeout(timer);
  }, [retrySecondsLeft]);

  async function handleVerify() {
    const trimmed = code.trim();
    if (!isValidMembershipCodeFormat(trimmed)) {
      setLocalError("Enter exactly 12 letters/numbers — no spaces or symbols.");
      setResult(null);
      return;
    }

    setLocalError("");
    setLoading(true);
    setResult(null);

    const verification = await verifyMembershipCode(trimmed);

    setLoading(false);
    setResult(verification);

    if (!verification.ok && verification.error.kind === "rate_limited" && verification.error.retryAfterSeconds) {
      setRetrySecondsLeft(verification.error.retryAfterSeconds);
    }
  }

  const isRateLimitedWaiting = retrySecondsLeft !== null && retrySecondsLeft > 0;

  return (
    <View style={styles.screen}>
      <ArrowLeft size={18} color={colors.paper} onPress={() => router.back()} style={{ marginBottom: 20 }} />
      <Text style={styles.eyebrow}>Membership</Text>
      <Text style={styles.h1}>Verify your membership</Text>
      <Text style={styles.body}>
        Generate a 12-character verification code from your ARC website dashboard, then enter it below.
      </Text>

      <Text style={styles.label}>Verification code</Text>
      <TextInput
        style={styles.input}
        placeholder="A1B2C3D4E5F6"
        placeholderTextColor={colors.textMuted}
        value={code}
        onChangeText={setCode}
        autoCapitalize="characters"
        autoCorrect={false}
        maxLength={12}
        editable={!loading}
      />

      {localError ? <Text style={styles.error}>{localError}</Text> : null}

      <PrimaryButton
        label={loading ? "Verifying..." : "Verify"}
        icon="none"
        onPress={handleVerify}
        disabled={loading || isRateLimitedWaiting || code.trim().length === 0}
        style={{ marginTop: 6 }}
      />

      {result && !result.ok && (
        <View style={styles.resultCard}>
          <Text style={styles.errorText}>{result.error.message}</Text>
          {isRateLimitedWaiting && <Text style={styles.retryText}>Try again in {retrySecondsLeft}s</Text>}
        </View>
      )}

      {result && result.ok && result.data.status === "active" && (
        <View style={styles.resultCard}>
          <Text style={styles.resultHeading}>Active membership</Text>
          <Text style={styles.resultRow}>Name: {result.data.member_name ?? "Not reported"}</Text>
          <Text style={styles.resultRow}>Tier: {result.data.tier}</Text>
          <Text style={styles.resultRow}>Status: {result.data.status}</Text>
          <Text style={styles.resultRow}>Expires: {result.data.expires_at ?? "Not reported"}</Text>

          <Text style={[styles.resultHeading, { marginTop: 14 }]}>Features</Text>
          {DOCUMENTED_FEATURE_KEYS.map((key) => (
            <Text key={key} style={styles.resultRow}>
              {key}: {featureLabel(result.data.features[key])}
            </Text>
          ))}
          {Object.keys(result.data.features)
            .filter((key) => !(DOCUMENTED_FEATURE_KEYS as readonly string[]).includes(key))
            .map((key) => (
              <Text key={key} style={styles.resultRow}>
                {key}: {featureLabel(result.data.features[key])}
              </Text>
            ))}
        </View>
      )}

      {result && result.ok && result.data.status === "inactive" && (
        <View style={styles.resultCard}>
          <Text style={styles.resultHeading}>Inactive membership</Text>
          <Text style={styles.resultRow}>This code is valid, but the membership is currently inactive.</Text>
          <Text style={styles.resultRow}>Name: {result.data.member_name ?? "Not reported"}</Text>
          <Text style={styles.resultRow}>Tier: {result.data.tier}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bgDeep, padding: 20, paddingTop: 60 },
  eyebrow: {
    fontFamily: fonts.mono,
    fontSize: 10.5,
    color: colors.gold,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  h1: { fontFamily: fonts.display, fontSize: 24, color: colors.paper, marginBottom: 10 },
  body: { fontFamily: fonts.body, fontSize: 12.5, lineHeight: 19, color: colors.textMuted, marginBottom: 22 },
  label: { fontFamily: fonts.body, fontSize: 12, color: colors.textMuted, marginBottom: 4 },
  input: {
    fontFamily: fonts.body,
    fontSize: 13.5,
    color: colors.paper,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.surfaceLight,
    borderRadius: radius.sm,
    padding: 12,
    marginBottom: 14,
  },
  error: { fontFamily: fonts.body, fontSize: 12, color: colors.danger, marginBottom: 10 },
  resultCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.surfaceLight,
    borderRadius: radius.lg,
    padding: 16,
    marginTop: 18,
  },
  resultHeading: { fontFamily: fonts.display, fontSize: 15.5, color: colors.paper, marginBottom: 8 },
  resultRow: { fontFamily: fonts.body, fontSize: 12.5, lineHeight: 19, color: colors.textMuted },
  errorText: { fontFamily: fonts.body, fontSize: 13, color: colors.danger },
  retryText: { fontFamily: fonts.body, fontSize: 12, color: colors.textMuted, marginTop: 8 },
});
