import { ScrollView, Text, View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { colors, fonts, radius } from "@/constants/theme";
import { identityPillars } from "@/data/siteContent";

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
  </ScrollView>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bgDeep }, content: { padding: 20, paddingTop: 28, paddingBottom: 32 },
  eyebrow: { fontFamily: fonts.mono, fontSize: 10.5, color: colors.gold, letterSpacing: 0.6, textTransform: "uppercase", marginTop: 24, marginBottom: 7 },
  h1: { fontFamily: fonts.display, fontSize: 26, lineHeight: 32, color: colors.paper, marginBottom: 12 },
  body: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 21, color: colors.textMuted, marginBottom: 22 },
  stack: { gap: 10 }, card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.surfaceLight, borderRadius: radius.md, padding: 15 },
  title: { fontFamily: fonts.display, fontSize: 16, color: colors.paper, marginBottom: 6 }, description: { fontFamily: fonts.body, fontSize: 12.5, lineHeight: 18, color: colors.textMuted },
});
