import { ScrollView, Text, View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft, Lock } from "lucide-react-native";
import { colors, fonts, radius } from "@/constants/theme";
import { productHubItems } from "@/data/siteContent";

export default function ProductHubScreen() {
  const router = useRouter();
  return <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
    <ArrowLeft size={18} color={colors.paper} onPress={() => router.back()} />
    <Text style={styles.eyebrow}>Product hub</Text><Text style={styles.h1}>Tools for collective action</Text>
    <Text style={styles.body}>Explore the digital spaces and services that support ARC members, initiatives, and regenerative projects.</Text>
    <View style={styles.stack}>{productHubItems.map((item) => <View key={item.title} style={styles.card}>
      <View style={styles.row}><Text style={styles.title}>{item.title}</Text><Lock size={14} color={colors.textMuted} /></View>
      <Text style={styles.description}>{item.description}</Text><Text style={styles.access}>MEMBER FEATURE</Text>
    </View>)}</View>
  </ScrollView>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bgDeep }, content: { padding: 20, paddingTop: 28, paddingBottom: 32 },
  eyebrow: { fontFamily: fonts.mono, fontSize: 10.5, color: colors.gold, letterSpacing: 0.6, textTransform: "uppercase", marginTop: 24, marginBottom: 7 },
  h1: { fontFamily: fonts.display, fontSize: 26, lineHeight: 32, color: colors.paper, marginBottom: 12 }, body: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 21, color: colors.textMuted, marginBottom: 22 }, stack: { gap: 10 },
  card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.surfaceLight, borderRadius: radius.md, padding: 15 }, row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" }, title: { fontFamily: fonts.display, fontSize: 16, color: colors.paper, marginBottom: 6 }, description: { fontFamily: fonts.body, fontSize: 12.5, lineHeight: 18, color: colors.textMuted }, access: { fontFamily: fonts.mono, fontSize: 9.5, color: colors.sage, letterSpacing: 0.5, marginTop: 12 },
});
