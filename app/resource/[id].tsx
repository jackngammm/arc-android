import { ScrollView, View, Text, StyleSheet, Linking, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Bookmark, BookmarkCheck } from "lucide-react-native";
import { colors, fonts } from "@/constants/theme";
import { Chip } from "@/components/Chip";
import { GhostButton } from "@/components/Buttons";
import { useApp } from "@/context/AppContext";
import { resources } from "@/data/resources";
import { ARC_CONTACT_EMAIL } from "@/constants/links";

export default function ResourceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { savedResourceIds, toggleSavedResource } = useApp();
  const resource = resources.find((r) => r.id === id);

  if (!resource) {
    return (
      <View style={styles.screen}>
        <Text style={styles.notFound}>Resource not found.</Text>
      </View>
    );
  }

  const saved = savedResourceIds.includes(resource.id);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: 20, paddingBottom: 32 }}>
      <View style={styles.topRow}>
        <ArrowLeft size={18} color={colors.paper} onPress={() => router.back()} />
        <TouchableOpacity onPress={() => toggleSavedResource(resource.id)} hitSlop={8}>
          {saved ? <BookmarkCheck size={18} color={colors.gold} /> : <Bookmark size={18} color={colors.textMuted} />}
        </TouchableOpacity>
      </View>

      {resource.placeholder && (
        <View style={styles.placeholderBanner}>
          <Text style={styles.placeholderText}>
            Placeholder listing — swap in the real directory entry from ARC.
          </Text>
        </View>
      )}

      <Chip>{resource.category}</Chip>
      <Text style={styles.title}>{resource.name}</Text>
      <Text style={styles.remote}>Remote resource</Text>
      <Text style={styles.description}>{resource.description}</Text>
      {resource.skills && (
        <View style={styles.skills}>
          {resource.skills.map((skill) => <Chip key={skill}>{skill}</Chip>)}
        </View>
      )}

      <GhostButton label="Contact for this resource" style={{ width: "100%" }} onPress={() => Linking.openURL(`mailto:${ARC_CONTACT_EMAIL}?subject=${encodeURIComponent(`Resource inquiry: ${resource.name}`)}`)} />
      {resource.externalUrl && <GhostButton label="Visit website" style={{ width: "100%", marginTop: 10 }} onPress={() => Linking.openURL(resource.externalUrl!)} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bgDeep },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 18 },
  placeholderBanner: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.surfaceLight,
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
  },
  placeholderText: { fontFamily: fonts.body, fontSize: 12, color: colors.textMuted, lineHeight: 17 },
  title: { fontFamily: fonts.display, fontSize: 22, color: colors.paper, marginTop: 12, marginBottom: 12 },
  remote: { fontFamily: fonts.mono, fontSize: 10.5, color: colors.sage, textTransform: "uppercase", marginBottom: 14 },
  description: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 21, color: colors.textMuted, marginBottom: 22 },
  skills: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 22 },
  notFound: { fontFamily: fonts.body, fontSize: 14, color: colors.textMuted, padding: 20 },
});
