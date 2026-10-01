import { View, Text, StyleSheet, Linking } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft, Check } from "lucide-react-native";
import { colors, fonts } from "@/constants/theme";
import { ARC_MAGAZINE_URL } from "@/constants/links";
import { PrimaryButton, SecondaryButton } from "@/components/Buttons";

const MAGAZINE_HIGHLIGHTS = [
  "In-depth features on regenerative initiatives from around the world",
  "Practical tips and expert insights for sustainable living",
  "Community stories and member spotlights",
];

export default function MagazineScreen() {
  const router = useRouter();
  return (
    <View style={styles.screen}>
      <ArrowLeft size={18} color={colors.paper} onPress={() => router.back()} />
      <Text style={styles.eyebrow}>Free magazine</Text>
      <Text style={styles.h1}>Stories for a regenerative future</Text>
      <Text style={styles.body}>
        Receive stories, ideas, and practical inspiration from the ARC community. The free magazine is available
        through the ARC website.
      </Text>
      <Text style={styles.sectionTitle}>What's inside</Text>
      <View style={styles.bullets}>
        {MAGAZINE_HIGHLIGHTS.map((item) => (
          <View key={item} style={styles.bulletRow}>
            <Check size={13} color={colors.sage} />
            <Text style={styles.bulletText}>{item}</Text>
          </View>
        ))}
      </View>
      <PrimaryButton label="Get the free magazine" onPress={() => Linking.openURL(ARC_MAGAZINE_URL)} style={{ marginTop: 22 }} />
      <SecondaryButton label="Back to home" onPress={() => router.back()} style={{ marginTop: 10 }} />
    </View>
  );
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bgDeep, padding: 20, paddingTop: 28 },
  eyebrow: { fontFamily: fonts.mono, fontSize: 10.5, color: colors.gold, letterSpacing: 0.6, textTransform: "uppercase", marginTop: 28, marginBottom: 7 },
  h1: { fontFamily: fonts.display, fontSize: 28, lineHeight: 34, color: colors.paper, marginBottom: 12 },
  body: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 21, color: colors.textMuted, marginBottom: 22 },
  sectionTitle: { fontFamily: fonts.display, fontSize: 15, color: colors.paper, marginBottom: 10 },
  bullets: { gap: 8 },
  bulletRow: { flexDirection: "row", alignItems: "flex-start", gap: 8 },
  bulletText: { fontFamily: fonts.body, fontSize: 12.5, color: colors.textMuted, flex: 1, lineHeight: 18 },
});
