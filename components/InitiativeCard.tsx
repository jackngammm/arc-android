import { View, Text, Image, StyleSheet } from "react-native";
import { colors, fonts, radius } from "@/constants/theme";
import { Chip } from "@/components/Chip";
import type { Initiative } from "@/data/initiatives";

export function InitiativeCard({ initiative }: { initiative: Initiative }) {
  return (
    <View style={styles.card}>
      {initiative.image && <Image source={{ uri: initiative.image }} style={styles.thumb} />}
      <View style={styles.topRow}>
        <Chip>{initiative.category}</Chip>
        <View style={styles.badgeGroup}>
          {initiative.featured && <Text style={styles.featuredBadge}>Featured</Text>}
          {initiative.inviteOnly && <Text style={styles.inviteBadge}>Invite Only</Text>}
        </View>
      </View>
      <Text style={styles.title}>{initiative.title}</Text>
      <Text style={styles.summary}>{initiative.summary}</Text>
      {initiative.volunteerOpportunityCount != null && (
        <Text style={styles.volunteerLine}>{initiative.volunteerOpportunityCount} volunteer opportunities</Text>
      )}
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
  thumb: {
    width: "100%",
    height: 120,
    borderRadius: radius.sm,
    marginBottom: 12,
    backgroundColor: colors.surfaceLight,
  },
  topRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  badgeGroup: { flexDirection: "row", alignItems: "center", gap: 8 },
  featuredBadge: {
    fontFamily: fonts.mono,
    fontSize: 10,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    color: colors.sage,
  },
  inviteBadge: {
    fontFamily: fonts.mono,
    fontSize: 10,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    color: colors.clay,
  },
  title: { fontFamily: fonts.display, fontSize: 15.5, color: colors.paper, marginTop: 10, marginBottom: 6 },
  summary: { fontFamily: fonts.body, fontSize: 12.5, lineHeight: 18, color: colors.textMuted },
  volunteerLine: {
    fontFamily: fonts.bodyMedium,
    fontSize: 11.5,
    color: colors.gold,
    marginTop: 10,
  },
});
