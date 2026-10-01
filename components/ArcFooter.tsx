import { View, Text, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import Svg, { Circle, Path, Rect } from "react-native-svg";
import { ARC_SOCIAL_LINKS } from "@/constants/links";
import { colors, fonts } from "@/constants/theme";

function SocialIcon({ name }: { name: (typeof ARC_SOCIAL_LINKS)[number]["name"] }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" accessible={false}>
      {name === "Facebook" ? (
        <Path fill={colors.gold} d="M14 22v-9h3l.5-4H14V7c0-1.2.4-2 2-2h2V1.4C17.3 1.2 16.3 1 15 1c-3 0-5 1.8-5 5v3H7v4h3v9z" />
      ) : name === "YouTube" ? (
        <>
          <Rect x={2} y={5} width={20} height={14} rx={4} fill={colors.gold} />
          <Path d="m10 9 6 3-6 3z" fill={colors.bgDeep} />
        </>
      ) : (
        <>
          <Rect x={3} y={3} width={18} height={18} rx={5} stroke={colors.gold} strokeWidth={2} />
          <Circle cx={12} cy={12} r={4} stroke={colors.gold} strokeWidth={2} />
          <Circle cx={17.5} cy={6.5} r={1.2} fill={colors.gold} />
        </>
      )}
    </Svg>
  );
}

export function ArcFooter() {
  return (
    <View style={styles.footer}>
      <Text style={styles.title}>Connect with ARC</Text>
      <View style={styles.links}>
        {ARC_SOCIAL_LINKS.map(({ name, url }) => (
          <Link key={name} href={url} target="_blank" rel="noopener noreferrer" asChild>
            <Pressable
              accessibilityRole="link"
              accessibilityLabel={`ARC on ${name}`}
              accessibilityHint="Opens an external social media page"
              style={({ pressed }) => [styles.link, pressed && styles.pressed]}
            >
              <SocialIcon name={name} />
              <Text style={styles.label}>{name}</Text>
            </Pressable>
          </Link>
        ))}
      </View>
      <View style={styles.agreements}>
        <Link href="/legal/mou" style={styles.agreementLink}>MOU</Link>
        <Link href="/legal/nda" style={styles.agreementLink}>NDA / NCC</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: { marginHorizontal: 20, marginTop: 12, paddingTop: 24, borderTopWidth: 1, borderTopColor: colors.surfaceLight, alignItems: "center" },
  title: { fontFamily: fonts.display, fontSize: 18, color: colors.paper, marginBottom: 16 },
  agreements: { flexDirection: "row", justifyContent: "center", gap: 20, marginTop: 16 },
  agreementLink: { fontFamily: fonts.bodyMedium, fontSize: 12, color: colors.sage, paddingVertical: 14 },
  links: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 12 },
  link: { minWidth: 80, minHeight: 64, padding: 10, alignItems: "center", justifyContent: "center", gap: 8, borderRadius: 10, backgroundColor: colors.surface },
  pressed: { opacity: 0.65 },
  label: { fontFamily: fonts.bodyMedium, fontSize: 12, color: colors.paper },
});
