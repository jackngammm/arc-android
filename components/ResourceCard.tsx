import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Bookmark, BookmarkCheck } from "lucide-react-native";
import { colors, fonts, radius } from "@/constants/theme";
import { Chip } from "@/components/Chip";
import { useApp } from "@/context/AppContext";
import type { Resource } from "@/data/resources";

export function ResourceCard({ resource }: { resource: Resource }) {
  const router = useRouter();
  const { savedResourceIds, toggleSavedResource } = useApp();
  const saved = savedResourceIds.includes(resource.id);

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => router.push(`/resource/${resource.id}`)}
    >
      <View style={styles.topRow}>
        <Chip>{resource.category}</Chip>
        <TouchableOpacity onPress={() => toggleSavedResource(resource.id)} hitSlop={8}>
          {saved ? <BookmarkCheck size={16} color={colors.gold} /> : <Bookmark size={16} color={colors.textMuted} />}
        </TouchableOpacity>
      </View>
      <Text style={styles.name}>{resource.name}</Text>
      <Text style={styles.remote}>Remote</Text>
      <Text style={styles.summary}>{resource.summary}</Text>
      {resource.skills && <Text style={styles.skills}>{resource.skills.slice(0, 3).join("  ·  ")}</Text>}
    </TouchableOpacity>
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
  topRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  name: { fontFamily: fonts.display, fontSize: 15.5, color: colors.paper, marginTop: 10, marginBottom: 6 },
  summary: { fontFamily: fonts.body, fontSize: 12.5, lineHeight: 18, color: colors.textMuted },
  remote: { fontFamily: fonts.mono, fontSize: 10, color: colors.sage, marginBottom: 5 },
  skills: { fontFamily: fonts.bodyMedium, fontSize: 10.5, lineHeight: 16, color: colors.gold, marginTop: 9 },
});
