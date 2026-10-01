import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Check } from "lucide-react-native";
import { colors, fonts, radius } from "@/constants/theme";
import { PrimaryButton, SecondaryButton } from "@/components/Buttons";
import type { MembershipTier } from "@/data/membershipTiers";

export function TierCard({
  tier,
  isCurrent,
  onSelect,
}: {
  tier: MembershipTier;
  isCurrent: boolean;
  onSelect: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <View style={[styles.card, isCurrent && styles.currentCard]}>
      {isCurrent && <Text style={styles.currentBadge}>Current plan</Text>}
      <Text style={styles.name}>{tier.name}</Text>
      <Text style={styles.price}>{tier.price}</Text>
      <Text style={styles.tagline}>{tier.tagline}</Text>
      <View style={styles.benefits}>
        {(expanded ? tier.benefits : tier.benefits.slice(0, 4)).map((b) => (
          <View key={b} style={styles.benefitRow}>
            <Check size={13} color={colors.sage} />
            <Text style={styles.benefitText}>{b}</Text>
          </View>
        ))}
      </View>
      {tier.benefits.length > 4 && (
        <Pressable accessibilityRole="button" accessibilityState={{ expanded }} onPress={() => setExpanded(!expanded)} style={{ paddingVertical: 12, minHeight: 44 }}>
          <Text style={styles.details}>{expanded ? "Show fewer benefits" : `View all ${tier.benefits.length} benefits`}</Text>
        </Pressable>
      )}
      {isCurrent ? (
        <SecondaryButton label="You're on this plan" style={{ marginTop: 4 }} />
      ) : (
        <PrimaryButton label="Select this plan" icon="none" onPress={onSelect} style={{ marginTop: 4 }} />
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
    padding: 18,
  },
  currentCard: { borderColor: colors.gold },
  currentBadge: {
    fontFamily: fonts.mono,
    fontSize: 10,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    color: colors.gold,
    marginBottom: 8,
  },
  name: { fontFamily: fonts.display, fontSize: 18, color: colors.paper },
  details: { fontFamily: fonts.bodyMedium, fontSize: 13, color: colors.gold },
  price: { fontFamily: fonts.bodySemibold, fontSize: 14, color: colors.gold, marginTop: 4 },
  tagline: { fontFamily: fonts.body, fontSize: 12.5, color: colors.textMuted, marginTop: 6, marginBottom: 12 },
  benefits: { gap: 7, marginBottom: 16 },
  benefitRow: { flexDirection: "row", alignItems: "flex-start", gap: 8 },
  benefitText: { fontFamily: fonts.body, fontSize: 12.5, color: colors.textMuted, flex: 1, lineHeight: 18 },
});
