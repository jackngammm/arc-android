import { ScrollView, Text, View, StyleSheet, Linking } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { colors, fonts, radius } from "@/constants/theme";
import { productHubItems } from "@/data/siteContent";
import { ARC_PRODUCT_HUB_URL } from "@/constants/links";
import { PrimaryButton } from "@/components/Buttons";

export default function ProductHubScreen() {
  const router = useRouter();
  return <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
    <ArrowLeft size={18} color={colors.paper} onPress={() => router.back()} />
    <Text style={styles.eyebrow}>Product hub</Text><Text style={styles.h1}>Member-made goods from across the alliance</Text>
    <Text style={styles.body}>Explore ARC's marketplace and discover products made by the community. Browse the latest listings and product details on the website.</Text>
    <PrimaryButton label="Browse products on ARC" onPress={() => Linking.openURL(ARC_PRODUCT_HUB_URL)} style={{ marginBottom: 22 }} />
    <View style={styles.stack}>{productHubItems.map((item) => <View key={item.title} style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>)}</View>
  </ScrollView>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bgDeep }, content: { padding: 20, paddingTop: 28, paddingBottom: 32 },
  eyebrow: { fontFamily: fonts.mono, fontSize: 10.5, color: colors.gold, letterSpacing: 0.6, textTransform: "uppercase", marginTop: 24, marginBottom: 7 },
  h1: { fontFamily: fonts.display, fontSize: 26, lineHeight: 32, color: colors.paper, marginBottom: 12 }, body: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 21, color: colors.textMuted, marginBottom: 22 }, stack: { gap: 10 },
  card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.surfaceLight, borderRadius: radius.md, padding: 15 }, title: { fontFamily: fonts.display, fontSize: 16, color: colors.paper, marginBottom: 6 }, description: { fontFamily: fonts.body, fontSize: 12.5, lineHeight: 18, color: colors.textMuted },
});
