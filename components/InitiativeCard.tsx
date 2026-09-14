import { View, Text, StyleSheet, Linking } from "react-native";
import { Lock } from "lucide-react-native";
import { colors, fonts, radius } from "@/constants/theme";
import { GhostButton } from "@/components/Buttons";
import { useApp } from "@/context/AppContext";
import type { Initiative } from "@/data/initiatives";
import { ARC_MEMBERSHIP_URL } from "@/constants/links";

export function InitiativeCard({ initiative }: { initiative: Initiative }) {
  const { userType } = useApp();
  const hasAccess = initiative.access === "public" || userType === "paid" || userType === "scholarship" || userType === "team";
  const locked = !hasAccess;

  return (
    <View style={[styles.card, locked && styles.lockedCard]}>
      <View style={styles.topRow}>
        <Text style={styles.badge}>{initiative.access === "member" ? "Member only" : "Public"}</Text>
        {locked && <Lock size={14} color={colors.textMuted} />}
      </View>
      <Text style={styles.title}>{initiative.title}</Text>
      <Text style={styles.summary}>{initiative.summary}</Text>
      <GhostButton
        label={locked ? "Unlock with membership" : "View initiative"}
        locked={locked}
        style={{ width: "100%", marginTop: 12 }}
        onPress={() => (locked ? Linking.openURL(ARC_MEMBERSHIP_URL) : undefined)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.surfaceLight,
    borderRadius: radius.lg,
    padding: 16,
  },
  lockedCard: { opacity: 0.9 },
  topRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  badge: {
    fontFamily: fonts.mono,
    fontSize: 10,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    color: colors.sage,
  },
  title: { fontFamily: fonts.display, fontSize: 15.5, color: colors.paper, marginTop: 10, marginBottom: 6 },
  summary: { fontFamily: fonts.body, fontSize: 12.5, lineHeight: 18, color: colors.textMuted },
});
