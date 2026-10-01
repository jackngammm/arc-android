import { View, Text, StyleSheet, Linking } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft, Clock, Video, CalendarClock } from "lucide-react-native";
import { colors, fonts } from "@/constants/theme";
import { ARC_DEMO_URL } from "@/constants/links";
import { PrimaryButton } from "@/components/Buttons";

const DEMO_HIGHLIGHTS = [
  { Icon: Clock, label: "30 minutes", detail: "Quick and comprehensive" },
  { Icon: Video, label: "Virtual meeting", detail: "Via Zoom or Google Meet" },
  { Icon: CalendarClock, label: "Flexible scheduling", detail: "Choose a time that works for you" },
];

export default function DemoScreen() {
  const router = useRouter();
  return (
    <View style={styles.screen}>
      <ArrowLeft size={18} color={colors.paper} onPress={() => router.back()} />
      <Text style={styles.eyebrow}>Platform demo</Text>
      <Text style={styles.h1}>See how ARC works</Text>
      <Text style={styles.body}>
        Schedule a conversation with the ARC team to explore the platform, membership paths, and tools for
        regenerative collaboration.
      </Text>
      <Text style={styles.sectionTitle}>What to expect</Text>
      <View style={styles.highlights}>
        {DEMO_HIGHLIGHTS.map(({ Icon, label, detail }) => (
          <View key={label} style={styles.highlightRow}>
            <Icon size={16} color={colors.sage} />
            <View style={{ flex: 1 }}>
              <Text style={styles.highlightLabel}>{label}</Text>
              <Text style={styles.highlightDetail}>{detail}</Text>
            </View>
          </View>
        ))}
      </View>
      <PrimaryButton label="Schedule a demo" onPress={() => Linking.openURL(ARC_DEMO_URL)} style={{ marginTop: 22 }} />
    </View>
  );
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bgDeep, padding: 20, paddingTop: 28 },
  eyebrow: { fontFamily: fonts.mono, fontSize: 10.5, color: colors.gold, letterSpacing: 0.6, textTransform: "uppercase", marginTop: 28, marginBottom: 7 },
  h1: { fontFamily: fonts.display, fontSize: 28, lineHeight: 34, color: colors.paper, marginBottom: 12 },
  body: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 21, color: colors.textMuted, marginBottom: 22 },
  sectionTitle: { fontFamily: fonts.display, fontSize: 15, color: colors.paper, marginBottom: 10 },
  highlights: { gap: 12 },
  highlightRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  highlightLabel: { fontFamily: fonts.bodySemibold, fontSize: 13, color: colors.paper },
  highlightDetail: { fontFamily: fonts.body, fontSize: 12, color: colors.textMuted },
});
