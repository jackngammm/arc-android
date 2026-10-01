import { ScrollView, Text, StyleSheet, Linking } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { colors, fonts } from "@/constants/theme";
import { ARC_LEGAL_URLS } from "@/constants/links";
import { PrimaryButton } from "@/components/Buttons";

const documents: Record<string, { title: string; body: string }> = {
  terms: { title: "Terms of use", body: "The ARC website manages the current terms, account requirements, payment methods, membership duration, expiration, and marketplace rules. Open the official ARC website for the current agreement." },
  privacy: { title: "Privacy policy", body: "The current ARC privacy policy is maintained on the official website. This app does not collect or transmit account data; its sign-in flow remains a local prototype." },
  mou: { title: "Memorandum of Understanding", body: "The MOU describes ARC membership commitments, community standards, platform usage, intellectual property, capital portal fees, duration, and termination. Members should review the official agreement before joining." },
  nda: { title: "NDA / NCC", body: "Confidentiality agreements apply to protected information shared within ARC member relationships. Please use the official ARC website for the current NDA / NCC document." },
  referral: { title: "Referral policy", body: "The referral policy describes prerequisites, monthly credits, connection requests, marketplace activity, and transaction fees. Please use the official ARC website for the current policy." },
};

export default function LegalDocumentScreen() {
  const router = useRouter();
  const { doc } = useLocalSearchParams<{ doc: string }>();
  const document = documents[doc ?? ""] ?? { title: "Document", body: "This document is not available in the prototype." };
  return <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
    <ArrowLeft size={18} color={colors.paper} onPress={() => router.back()} />
    <Text style={styles.eyebrow}>Legal & agreements</Text><Text style={styles.title}>{document.title}</Text><Text style={styles.body}>{document.body}</Text>
    {ARC_LEGAL_URLS[doc ?? ""] && <PrimaryButton label="Read official document" onPress={() => Linking.openURL(ARC_LEGAL_URLS[doc!])} style={{ marginTop: 24 }} />}
  </ScrollView>;
}
const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: colors.bgDeep }, content: { padding: 20, paddingTop: 28, paddingBottom: 32 }, eyebrow: { fontFamily: fonts.mono, fontSize: 10.5, color: colors.gold, letterSpacing: 0.6, textTransform: "uppercase", marginTop: 28, marginBottom: 8 }, title: { fontFamily: fonts.display, fontSize: 26, lineHeight: 32, color: colors.paper, marginBottom: 14 }, body: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 21, color: colors.textMuted } });
