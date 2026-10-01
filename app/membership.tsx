import { ScrollView, View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft, Check } from "lucide-react-native";
import { colors, fonts, radius } from "@/constants/theme";
import { ARC_MEMBERSHIP_URL } from "@/constants/links";
import { PrimaryButton, SecondaryButton } from "@/components/Buttons";
import { ArcLogo } from "@/components/ArcLogo";
import { membershipTiers } from "@/data/membershipTiers";

export default function MembershipScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ArrowLeft size={18} color={colors.paper} onPress={() => router.back()} />
      <Text style={styles.eyebrow}>Membership</Text>
      <View style={styles.headingRow}>
        <Text style={styles.h1}>Join the regenerative movement</Text>
        <ArcLogo />
      </View>
      <Text style={styles.body}>ARC membership options, applications, pricing, and payment paths are managed on the official ARC website.</Text>
      <PrimaryButton label="Open ARC membership" onPress={() => router.push({ pathname: "/platform", params: { entry: "membership" } })} />
      <SecondaryButton label="Already have a verification code?" onPress={() => router.push("/verify-membership")} style={{ marginTop: 10 }} />
      <SecondaryButton label="Continue browsing" onPress={() => router.back()} style={{ marginTop: 10 }} />
      <Text style={styles.url}>{ARC_MEMBERSHIP_URL}</Text>

      <Text style={styles.sectionTitle}>Compare membership tiers</Text>
      <Text style={styles.body}>For reference only — join and pay on the ARC website above.</Text>
      <View style={styles.tiers}>
        {membershipTiers.map((tier) => (
          <View key={tier.id} style={styles.tierCard}>
            <Text style={styles.tierName}>{tier.name}</Text>
            <Text style={styles.tierPrice}>{tier.price}</Text>
            <Text style={styles.tierTagline}>{tier.tagline}</Text>
            <View style={styles.benefits}>
              {tier.benefits.map((b) => (
                <View key={b} style={styles.benefitRow}>
                  <Check size={13} color={colors.sage} />
                  <Text style={styles.benefitText}>{b}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Membership agreements</Text>
      <Text style={styles.body}>Review ARC's agreements before joining.</Text>
      <PrimaryButton label="Read MOU" icon="none" onPress={() => router.push("/legal/mou")} />
      <SecondaryButton label="Read NDA / NCC" onPress={() => router.push("/legal/nda")} style={{ marginTop: 10 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bgDeep },
  content: { padding: 20, paddingTop: 28, paddingBottom: 40 },
  eyebrow: { fontFamily: fonts.mono, fontSize: 10.5, color: colors.gold, letterSpacing: 0.6, textTransform: "uppercase", marginTop: 28, marginBottom: 7 },
  headingRow: { flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 12, maxWidth: 420 },
  h1: { flex: 1, fontFamily: fonts.display, fontSize: 28, lineHeight: 34, color: colors.paper },
  body: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 21, color: colors.textMuted, marginBottom: 22 },
  url: { fontFamily: fonts.mono, fontSize: 10, color: colors.textMuted, marginTop: 20, marginBottom: 8 },
  sectionTitle: { fontFamily: fonts.display, fontSize: 22, color: colors.paper, marginTop: 28, marginBottom: 10 },
  tiers: { gap: 12 },
  tierCard: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.surfaceLight, borderRadius: radius.lg, padding: 16 },
  tierName: { fontFamily: fonts.display, fontSize: 17, color: colors.paper },
  tierPrice: { fontFamily: fonts.bodySemibold, fontSize: 13.5, color: colors.gold, marginTop: 4 },
  tierTagline: { fontFamily: fonts.body, fontSize: 12.5, color: colors.textMuted, marginTop: 6, marginBottom: 10 },
  benefits: { gap: 6 },
  benefitRow: { flexDirection: "row", alignItems: "flex-start", gap: 8 },
  benefitText: { fontFamily: fonts.body, fontSize: 12, color: colors.textMuted, flex: 1, lineHeight: 17 },
});
