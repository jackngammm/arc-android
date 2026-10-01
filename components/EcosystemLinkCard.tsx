import { View, Text, TouchableOpacity, StyleSheet, Linking } from "react-native";
import { ArrowRight, ArrowUpRight } from "lucide-react-native";
import { useRouter } from "expo-router";
import { colors, fonts, radius } from "@/constants/theme";
import type { EcosystemLink } from "@/data/ecosystem";

export function EcosystemLinkCard({ link }: { link: EcosystemLink }) {
  const router = useRouter();
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={() => link.route ? router.push(link.route) : Linking.openURL(link.url)}>
      <View style={{ flex: 1 }}>
        <Text style={styles.label}>{link.label}</Text>
        <Text style={styles.description}>{link.description}</Text>
      </View>
      {link.route ? <ArrowRight size={16} color={colors.sage} /> : <ArrowUpRight size={16} color={colors.sage} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.surfaceLight,
    borderRadius: radius.md,
    padding: 14,
  },
  label: { fontFamily: fonts.bodySemibold, fontSize: 13, color: colors.paper, marginBottom: 3 },
  description: { fontFamily: fonts.body, fontSize: 11.5, color: colors.textMuted, lineHeight: 16 },
});
