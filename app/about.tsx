import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft, ChevronRight } from "lucide-react-native";
import { colors, fonts, radius } from "@/constants/theme";
import { founders, identityPillars } from "@/data/siteContent";

export default function AboutScreen() {
  const router = useRouter();
  return <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
    <ArrowLeft size={18} color={colors.paper} onPress={() => router.back()} />
    <Text style={styles.eyebrow}>About ARC</Text>
    <Text style={styles.h1}>Building regenerative communities together</Text>
    <Text style={styles.body}>The Alliance for Regenerative Communities is more than a membership. It is a movement bringing together diverse professionals committed to sustainable practices and regenerative solutions.</Text>
    <View style={styles.stack}>{identityPillars.map((pillar) => <View key={pillar.title} style={styles.card}>
      <Text style={styles.title}>{pillar.title}</Text><Text style={styles.description}>{pillar.description}</Text>
    </View>)}</View>
    <Text style={styles.sectionTitle}>Meet our founders</Text>
    <Text style={styles.body}>Visionary leaders creating regenerative communities and positive impact.</Text>
    <View style={styles.stack}>{founders.map((founder) => <TouchableOpacity key={founder.id} style={styles.card} onPress={() => router.push(`/about/${founder.id}`)}>
      <Text style={styles.title}>{founder.name}</Text><Text style={styles.role}>{founder.role}</Text><Text style={styles.description}>{founder.bio}</Text><View style={styles.linkRow}><Text style={styles.link}>View profile</Text><ChevronRight size={15} color={colors.gold} /></View>
    </TouchableOpacity>)}</View>
    <TouchableOpacity style={styles.teamLink} onPress={() => router.push("/team")}><Text style={styles.teamText}>Meet our full team</Text><ChevronRight size={17} color={colors.gold} /></TouchableOpacity>
    <Text style={styles.sectionTitle}>Explore ARC</Text>
    {[["What is regenerative?", "what-is-regenerative"], ["Benefits", "benefits"], ["Virtual world", "virtual-world"], ["Investment portal", "investment-portal"], ["Sponsors & partners", "sponsors-partners"], ["Mascots", "mascots"]].map(([label, slug]) => <TouchableOpacity key={slug} style={styles.linkRowLarge} onPress={() => router.push(`/about/${slug}`)}><Text style={styles.listLabel}>{label}</Text><ChevronRight size={16} color={colors.textMuted} /></TouchableOpacity>)}
  </ScrollView>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bgDeep }, content: { padding: 20, paddingTop: 28, paddingBottom: 32 },
  eyebrow: { fontFamily: fonts.mono, fontSize: 10.5, color: colors.gold, letterSpacing: 0.6, textTransform: "uppercase", marginTop: 24, marginBottom: 7 },
  h1: { fontFamily: fonts.display, fontSize: 26, lineHeight: 32, color: colors.paper, marginBottom: 12 },
  body: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 21, color: colors.textMuted, marginBottom: 22 },
  stack: { gap: 10 }, card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.surfaceLight, borderRadius: radius.md, padding: 15 },
  title: { fontFamily: fonts.display, fontSize: 16, color: colors.paper, marginBottom: 6 }, description: { fontFamily: fonts.body, fontSize: 12.5, lineHeight: 18, color: colors.textMuted }, sectionTitle: { fontFamily: fonts.display, fontSize: 19, color: colors.paper, marginTop: 28, marginBottom: 4 }, role: { fontFamily: fonts.mono, fontSize: 10, color: colors.sage, textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 9 }, linkRow: { flexDirection: "row", alignItems: "center", marginTop: 12 }, link: { fontFamily: fonts.bodyMedium, fontSize: 12, color: colors.gold }, teamLink: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderWidth: 1, borderColor: colors.gold, borderRadius: radius.sm, padding: 14, marginTop: 18 }, teamText: { fontFamily: fonts.bodySemibold, fontSize: 13, color: colors.gold }, linkRowLarge: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomWidth: 1, borderBottomColor: colors.surfaceLight, paddingVertical: 14 }, listLabel: { fontFamily: fonts.bodyMedium, fontSize: 13, color: colors.paper },
});
