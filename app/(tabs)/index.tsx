import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { colors, fonts } from "@/constants/theme";
import { Chip } from "@/components/Chip";
import { PrimaryButton } from "@/components/Buttons";
import { GrowthRings } from "@/components/GrowthRings";
import { EventCard } from "@/components/EventCard";
import { EcosystemLinkCard } from "@/components/EcosystemLinkCard";
import { events } from "@/data/events";
import { ecosystemLinks } from "@/data/ecosystem";
import { identityPillars } from "@/data/siteContent";
import { useApp } from "@/context/AppContext";

export default function HomeScreen() {
  const router = useRouter();
  const { userType } = useApp();
  const upcoming = events.filter((e) => e.status === "upcoming");

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 32 }}>
      <View style={styles.hero}>
        <View style={styles.ringsWrap}>
          <GrowthRings />
        </View>
        <Chip>Regenerative network</Chip>
        <Text style={styles.h1}>Join the regenerative movement</Text>
        <Text style={styles.heroBody}>
          A non-hierarchical, internationally committed group of individuals, organizations, and
          businesses dedicated to sustainable practices, health, and regenerative solutions.
        </Text>
        {userType === "guest" && (
          <PrimaryButton label="Become a member" onPress={() => router.push("/membership")} />
        )}
        {userType === "free" && (
          <PrimaryButton label="Upgrade your membership" onPress={() => router.push("/membership")} />
        )}
        {(userType === "paid" || userType === "scholarship" || userType === "team") && (
          <PrimaryButton label="View initiatives" onPress={() => router.push("/(tabs)/initiatives")} />
        )}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.h2}>About ARC</Text>
          <Text style={styles.seeAll} onPress={() => router.push("/about")}>Explore</Text>
        </View>
        <Text style={styles.sectionBody}>More than a membership, ARC is a movement bringing together people, organizations, and businesses committed to regenerative solutions.</Text>
        <View style={styles.pillarGrid}>
          {identityPillars.map((pillar) => <View key={pillar.title} style={styles.pillarCard}><Text style={styles.pillarTitle}>{pillar.title}</Text><Text style={styles.pillarDescription}>{pillar.description}</Text></View>)}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.h2}>What is regenerative?</Text>
        <Text style={styles.sectionBody}>Regeneration means restoring the health of people, communities, and ecosystems while building the conditions for life to thrive.</Text>
        <PrimaryButton label="Explore bio-regions" icon="none" onPress={() => router.push("/bio-regions")} />
        <PrimaryButton label="Explore Product Hub" icon="none" style={{ marginTop: 10 }} onPress={() => router.push("/product-hub")} />
      </View>

      <View style={styles.section}>
        <Text style={styles.h2}>Get involved</Text>
        <Text style={styles.sectionBody}>Discover the magazine, see the platform in action, or connect directly with ARC.</Text>
        <PrimaryButton label="Open membership" onPress={() => router.push("/membership")} />
        <PrimaryButton label="Free magazine" icon="none" style={{ marginTop: 10 }} onPress={() => router.push("/magazine")} />
        <PrimaryButton label="Schedule a demo" icon="none" style={{ marginTop: 10 }} onPress={() => router.push("/demo")} />
        <PrimaryButton label="Contact ARC" icon="none" style={{ marginTop: 10 }} onPress={() => router.push("/contact")} />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.h2}>Upcoming events</Text>
          <Text style={styles.seeAll} onPress={() => router.push("/(tabs)/events")}>
            See all
          </Text>
        </View>
        {upcoming.length === 0 ? (
          <Text style={styles.emptyText}>No upcoming events listed right now. Check back soon.</Text>
        ) : (
          <View style={{ gap: 10, marginTop: 12 }}>
            {upcoming.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </View>
        )}
      </View>

      <View style={[styles.section, { paddingTop: 4 }]}>
        <Text style={styles.h2}>Ecosystem</Text>
        <View style={{ gap: 10, marginTop: 12 }}>
          {ecosystemLinks.map((link) => (
            <EcosystemLinkCard key={link.id} link={link} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bgDeep },
  hero: { padding: 20, paddingTop: 24, backgroundColor: colors.surface, overflow: "hidden" },
  ringsWrap: { position: "absolute", top: -40, right: -50 },
  h1: {
    fontFamily: fonts.display,
    fontSize: 30,
    lineHeight: 36,
    color: colors.paper,
    marginTop: 14,
    marginBottom: 10,
    maxWidth: 290,
  },
  heroBody: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textMuted,
    marginBottom: 20,
    maxWidth: 300,
  },
  section: { padding: 20 },
  sectionHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  h2: { fontFamily: fonts.display, fontSize: 18, color: colors.paper },
  seeAll: {
    fontFamily: fonts.mono,
    fontSize: 10.5,
    letterSpacing: 0.4,
    textTransform: "uppercase",
    color: colors.sage,
  },
  emptyText: { fontFamily: fonts.body, fontSize: 13, color: colors.textMuted, marginTop: 10 },
  sectionBody: { fontFamily: fonts.body, fontSize: 13, lineHeight: 20, color: colors.textMuted, marginTop: 10, marginBottom: 12 },
  pillarGrid: { gap: 8 },
  pillarCard: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.surfaceLight, borderRadius: 10, padding: 12 },
  pillarTitle: { fontFamily: fonts.display, fontSize: 15, color: colors.paper, marginBottom: 4 },
  pillarDescription: { fontFamily: fonts.body, fontSize: 12, lineHeight: 17, color: colors.textMuted },
});
