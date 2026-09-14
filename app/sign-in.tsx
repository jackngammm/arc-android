import { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { colors, fonts, radius } from "@/constants/theme";
import { PrimaryButton } from "@/components/Buttons";
import { useApp } from "@/context/AppContext";

export default function SignInScreen() {
  const router = useRouter();
  const { signIn } = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function handleSignIn() {
    if (!name.trim() || !email.trim()) {
      setError("Enter your name and email to continue.");
      return;
    }
    if (!email.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    // Mock sign-in: this doesn't check a real account, it just simulates being
    // a signed-in free member. Wire this to real auth when ARC has a backend.
    signIn("free", name.trim());
    router.back();
  }

  return (
    <View style={styles.screen}>
      <ArrowLeft size={18} color={colors.paper} onPress={() => router.back()} style={{ marginBottom: 20 }} />
      <Text style={styles.eyebrow}>Welcome back</Text>
      <Text style={styles.h1}>Sign in</Text>
      <Text style={styles.body}>
        This is a mock sign-in for the prototype — it doesn't check a real account yet.
      </Text>

      <Text style={styles.label}>Full name</Text>
      <TextInput style={styles.input} placeholder="Jordan Rivera" placeholderTextColor={colors.textMuted} value={name} onChangeText={setName} />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="jordan@studio.com"
        placeholderTextColor={colors.textMuted}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <PrimaryButton label="Sign in" icon="none" onPress={handleSignIn} style={{ marginTop: 6 }} />
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
});
