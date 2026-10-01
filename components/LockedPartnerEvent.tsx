import { View, Text, StyleSheet } from "react-native";
import { LockKeyhole } from "lucide-react-native";
import { colors, fonts, radius } from "@/constants/theme";

export function LockedPartnerEvent({ title }: { title: string }) {
  return (
    <View style={styles.card} accessible accessibilityLabel={`${title}. Partner event. Registered users only. Member access is coming soon.`}>
      <View style={styles.preview} pointerEvents="none" accessibilityElementsHidden importantForAccessibility="no-hide-descendants" aria-hidden>
        <Text style={styles.blurredText}>Partner community gathering</Text>
        <Text style={styles.blurredText}>Event date and location</Text>
        <Text style={styles.blurredText}>Discover more together</Text>
      </View>
      <View style={styles.message}>
        <LockKeyhole size={22} color={colors.gold} />
        <Text style={styles.eyebrow}>Partner event</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.title}>Registered users only</Text>
        <Text style={styles.body}>Member access is coming soon.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { overflow: "hidden", borderRadius: radius.lg, borderWidth: 1, borderColor: colors.surfaceLight, backgroundColor: colors.surface },
  preview: { position: "absolute", top: 0, right: 0, bottom: 0, left: 0, padding: 18, justifyContent: "space-around", opacity: 0.5 },
  blurredText: { fontFamily: fonts.display, fontSize: 20, color: "transparent", textShadowColor: colors.textMuted, textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 9 },
  message: { minHeight: 180, padding: 20, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(22, 36, 27, 0.78)" },
  eyebrow: { fontFamily: fonts.mono, fontSize: 10, color: colors.gold, textTransform: "uppercase", letterSpacing: 0.6, marginTop: 10 },
  title: { fontFamily: fonts.display, fontSize: 18, color: colors.paper, textAlign: "center", marginTop: 6 },
  body: { fontFamily: fonts.body, fontSize: 12, lineHeight: 18, color: colors.textMuted, textAlign: "center", marginTop: 6 },
});
