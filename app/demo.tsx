import { View, Text, StyleSheet, Linking } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { colors, fonts } from "@/constants/theme";
import { ARC_WEBSITE } from "@/constants/links";
import { PrimaryButton } from "@/components/Buttons";

export default function DemoScreen() {
  const router = useRouter();
  return <View style={styles.screen}><ArrowLeft size={18} color={colors.paper} onPress={() => router.back()} /><Text style={styles.eyebrow}>Platform demo</Text><Text style={styles.h1}>See how ARC works</Text><Text style={styles.body}>Schedule a conversation with the ARC team to explore the platform, membership paths, and tools for regenerative collaboration.</Text><PrimaryButton label="Visit ARC's website" onPress={() => Linking.openURL(ARC_WEBSITE)} /></View>;
}
const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: colors.bgDeep, padding: 20, paddingTop: 28 }, eyebrow: { fontFamily: fonts.mono, fontSize: 10.5, color: colors.gold, letterSpacing: 0.6, textTransform: "uppercase", marginTop: 28, marginBottom: 7 }, h1: { fontFamily: fonts.display, fontSize: 28, lineHeight: 34, color: colors.paper, marginBottom: 12 }, body: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 21, color: colors.textMuted, marginBottom: 22 } });
