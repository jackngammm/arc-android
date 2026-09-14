import { ScrollView, Text, View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft, Map } from "lucide-react-native";
import { colors, fonts, radius } from "@/constants/theme";
import { bioRegions } from "@/data/siteContent";

export default function BioRegionsScreen() {
  const router = useRouter();
  return <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
    <ArrowLeft size={18} color={colors.paper} onPress={() => router.back()} />
    <View style={styles.icon}><Map size={22} color={colors.gold} /></View>
    <Text style={styles.eyebrow}>Bio-regions</Text><Text style={styles.h1}>Regeneration starts with place</Text>
    <Text style={styles.body}>Bio-regions help us organize around the living systems that sustain us. ARC connects local knowledge and action across a global network.</Text>
    <View style={styles.stack}>{bioRegions.map((item) => <View key={item.title} style={styles.card}><Text style={styles.title}>{item.title}</Text><Text style={styles.description}>{item.description}</Text></View>)}</View>
    <Text style={styles.note}>The interactive bio-regional map is part of the platform roadmap.</Text>
  </ScrollView>;
}

const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: colors.bgDeep }, content: { padding: 20, paddingTop: 28, paddingBottom: 32 }, icon: { marginTop: 22 }, eyebrow: { fontFamily: fonts.mono, fontSize: 10.5, color: colors.gold, letterSpacing: 0.6, textTransform: "uppercase", marginTop: 10, marginBottom: 7 }, h1: { fontFamily: fonts.display, fontSize: 26, lineHeight: 32, color: colors.paper, marginBottom: 12 }, body: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 21, color: colors.textMuted, marginBottom: 22 }, stack: { gap: 10 }, card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.surfaceLight, borderRadius: radius.md, padding: 15 }, title: { fontFamily: fonts.display, fontSize: 16, color: colors.paper, marginBottom: 6 }, description: { fontFamily: fonts.body, fontSize: 12.5, lineHeight: 18, color: colors.textMuted }, note: { fontFamily: fonts.mono, fontSize: 10.5, color: colors.sage, lineHeight: 16, marginTop: 20 }, });
