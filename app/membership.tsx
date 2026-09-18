import { View, Text, StyleSheet, Linking } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { colors, fonts } from "@/constants/theme";
import { ARC_MEMBERSHIP_URL } from "@/constants/links";
import { PrimaryButton, SecondaryButton } from "@/components/Buttons";

export default function MembershipScreen() {
  const router = useRouter();
  return <View style={styles.screen}>
    <ArrowLeft size={18} color={colors.paper} onPress={() => router.back()} />
    <Text style={styles.eyebrow}>Membership</Text>
    <Text style={styles.h1}>Join the regenerative movement</Text>
    <Text style={styles.body}>ARC membership options, applications, pricing, and payment paths are managed on the official ARC website.</Text>
    <PrimaryButton label="Open ARC membership" onPress={() => Linking.openURL(ARC_MEMBERSHIP_URL)} />
    <SecondaryButton label="Already have a verification code?" onPress={() => router.push("/verify-membership")} style={{ marginTop: 10 }} />
    <SecondaryButton label="Continue browsing" onPress={() => router.back()} style={{ marginTop: 10 }} />
    <Text style={styles.url}>{ARC_MEMBERSHIP_URL}</Text>
  </View>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bgDeep, padding: 20, paddingTop: 28 },
  eyebrow: { fontFamily: fonts.mono, fontSize: 10.5, color: colors.gold, letterSpacing: 0.6, textTransform: "uppercase", marginTop: 28, marginBottom: 7 },
  h1: { fontFamily: fonts.display, fontSize: 28, lineHeight: 34, color: colors.paper, marginBottom: 12 },
  body: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 21, color: colors.textMuted, marginBottom: 22 },
  url: { fontFamily: fonts.mono, fontSize: 10, color: colors.textMuted, marginTop: 20 },
});
