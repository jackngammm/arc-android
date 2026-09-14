import { View, Text, StyleSheet, Linking } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft, Mail } from "lucide-react-native";
import { colors, fonts } from "@/constants/theme";
import { ARC_CONTACT_EMAIL } from "@/constants/links";
import { PrimaryButton } from "@/components/Buttons";

export default function ContactScreen() {
  const router = useRouter();
  return <View style={styles.screen}><ArrowLeft size={18} color={colors.paper} onPress={() => router.back()} /><Text style={styles.eyebrow}>Contact ARC</Text><Text style={styles.h1}>Let’s build a better future together</Text><Text style={styles.body}>Questions about membership, resources, events, or collaboration? Reach the ARC team directly.</Text><View style={styles.email}><Mail size={17} color={colors.sage} /><Text style={styles.emailText}>{ARC_CONTACT_EMAIL}</Text></View><PrimaryButton label="Email ARC" onPress={() => Linking.openURL(`mailto:${ARC_CONTACT_EMAIL}`)} /></View>;
}
const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: colors.bgDeep, padding: 20, paddingTop: 28 }, eyebrow: { fontFamily: fonts.mono, fontSize: 10.5, color: colors.gold, letterSpacing: 0.6, textTransform: "uppercase", marginTop: 28, marginBottom: 7 }, h1: { fontFamily: fonts.display, fontSize: 28, lineHeight: 34, color: colors.paper, marginBottom: 12 }, body: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 21, color: colors.textMuted, marginBottom: 22 }, email: { flexDirection: "row", alignItems: "center", gap: 9, marginBottom: 22 }, emailText: { fontFamily: fonts.bodyMedium, fontSize: 13, color: colors.paper } });
