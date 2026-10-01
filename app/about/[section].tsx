import { ScrollView, Text, StyleSheet, Linking } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { colors, fonts } from "@/constants/theme";
import { founders } from "@/data/siteContent";
import { ARC_VIRTUAL_WORLD_URL } from "@/constants/links";
import { PrimaryButton } from "@/components/Buttons";

const sections: Record<string, { title: string; body: string; cta?: string }> = {
  "what-is-regenerative": { title: "What is regenerative?", body: "Regeneration is the practice of restoring the health of people, communities, and ecosystems while creating the conditions for life to thrive for generations. It asks us to move beyond reducing harm and actively renew the systems we depend on." },
  benefits: { title: "Benefits", body: "ARC creates a place for people and organizations to find trusted collaborators, participate in initiatives, access member opportunities, co-refer work, and put collective skills behind practical regenerative projects." },
  "virtual-world": { title: "Virtual world", body: "ARC's virtual world creates another place for the network to meet, learn, and collaborate across distance. Open the official ARC ecosystem to visit the current experience.", cta: "Open virtual world" },
  "investment-portal": { title: "Investment portal", body: "The capital portal is designed to connect regenerative projects with aligned investors and support responsible capital pathways. Access and platform fees are governed by ARC's current membership agreements." },
  "sponsors-partners": { title: "Sponsors & partners", body: "ARC works across sustainability, health, finance, media, technology, and community networks. Partners help turn shared values into visible projects, events, and resources." },
  mascots: { title: "Mascots", body: "ARC's mascots represent the playful, living identity of a community that believes regeneration can be practical, collaborative, and joyful." },
};

export default function AboutSectionScreen() {
  const router = useRouter();
  const { section } = useLocalSearchParams<{ section: string }>();
  const founder = founders.find((item) => item.id === section);
  const content = founder ? { title: founder.name, body: founder.bio, cta: undefined } : sections[section ?? ""] ?? { title: "About ARC", body: "This About section is not available in the prototype." };
  return <ScrollView style={styles.screen} contentContainerStyle={styles.content}><ArrowLeft size={18} color={colors.paper} onPress={() => router.back()} /><Text style={styles.eyebrow}>About ARC</Text><Text style={styles.h1}>{content.title}</Text><Text style={styles.role}>{founder?.role}</Text><Text style={styles.body}>{content.body}</Text>{founder && <Text style={styles.skills}>{founder.skills.join("  ·  ")}</Text>}{content.cta && <PrimaryButton label={content.cta} onPress={() => Linking.openURL(ARC_VIRTUAL_WORLD_URL)} />}</ScrollView>;
}
const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: colors.bgDeep }, content: { padding: 20, paddingTop: 28, paddingBottom: 32 }, eyebrow: { fontFamily: fonts.mono, fontSize: 10.5, color: colors.gold, letterSpacing: 0.6, textTransform: "uppercase", marginTop: 28, marginBottom: 7 }, h1: { fontFamily: fonts.display, fontSize: 28, lineHeight: 34, color: colors.paper, marginBottom: 8 }, role: { fontFamily: fonts.mono, fontSize: 10, color: colors.sage, textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 18 }, body: { fontFamily: fonts.body, fontSize: 14, lineHeight: 22, color: colors.textMuted, marginBottom: 20 }, skills: { fontFamily: fonts.bodyMedium, fontSize: 11.5, lineHeight: 18, color: colors.gold, marginBottom: 22 } });
