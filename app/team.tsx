import { ScrollView, Text, View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { colors, fonts, radius } from "@/constants/theme";
import { teamMembers } from "@/data/siteContent";

export default function TeamScreen() {
  const router = useRouter();
  return <ScrollView style={styles.screen} contentContainerStyle={styles.content}><ArrowLeft size={18} color={colors.paper} onPress={() => router.back()} /><Text style={styles.eyebrow}>About ARC</Text><Text style={styles.h1}>Meet our full team</Text><Text style={styles.body}>ARC is powered by visionary leaders, practitioners, partners, and volunteers committed to regenerative communities.</Text>{teamMembers.map((member) => <View key={member.name} style={styles.card}><Text style={styles.name}>{member.name}</Text><Text style={styles.role}>{member.role}</Text></View>)}</ScrollView>;
}
const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: colors.bgDeep }, content: { padding: 20, paddingTop: 28, paddingBottom: 32 }, eyebrow: { fontFamily: fonts.mono, fontSize: 10.5, color: colors.gold, letterSpacing: 0.6, textTransform: "uppercase", marginTop: 24, marginBottom: 7 }, h1: { fontFamily: fonts.display, fontSize: 26, lineHeight: 32, color: colors.paper, marginBottom: 12 }, body: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 21, color: colors.textMuted, marginBottom: 22 }, card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.surfaceLight, borderRadius: radius.md, padding: 15, marginBottom: 10 }, name: { fontFamily: fonts.display, fontSize: 17, color: colors.paper, marginBottom: 5 }, role: { fontFamily: fonts.mono, fontSize: 10, color: colors.sage, textTransform: "uppercase", letterSpacing: 0.4 } });
