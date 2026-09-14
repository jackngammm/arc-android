import { useMemo, useState } from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Search } from "lucide-react-native";
import { colors, fonts, radius } from "@/constants/theme";
import { ResourceCard } from "@/components/ResourceCard";
import { resources, resourceCategories } from "@/data/resources";

export default function ResourcesScreen() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      const matchesQuery = r.name.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = !category || r.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: 20, paddingBottom: 24 }}>
      <Text style={styles.eyebrow}>Directory</Text>
      <Text style={styles.h1}>Resources</Text>
      <Text style={styles.count}>{filtered.length} resources available</Text>

      <View style={styles.searchBar}>
        <Search size={15} color={colors.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search resources"
          placeholderTextColor={colors.textMuted}
          value={query}
          onChangeText={setQuery}
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
        <FilterChip label="All" active={category === null} onPress={() => setCategory(null)} />
        {resourceCategories.map((c) => (
          <FilterChip key={c} label={c} active={category === c} onPress={() => setCategory(c)} />
        ))}
      </ScrollView>

      {filtered.length === 0 ? (
        <Text style={styles.emptyText}>No resources match your search.</Text>
      ) : (
        <View style={{ gap: 12 }}>
          {filtered.map((r) => (
            <ResourceCard key={r.id} resource={r} />
          ))}
        </View>
      )}
    </ScrollView>
  );
}

function FilterChip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.filterChip, active && styles.filterChipActive]}>
      <Text style={[styles.filterChipText, active && styles.filterChipTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bgDeep },
  eyebrow: {
    fontFamily: fonts.mono,
    fontSize: 10.5,
    color: colors.gold,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  h1: { fontFamily: fonts.display, fontSize: 24, color: colors.paper, marginBottom: 16 },
  count: { fontFamily: fonts.mono, fontSize: 10.5, color: colors.sage, textTransform: "uppercase", letterSpacing: 0.4, marginTop: -8, marginBottom: 12 },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.surfaceLight,
    borderRadius: radius.sm,
    paddingHorizontal: 12,
    marginBottom: 14,
  },
  searchInput: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 13.5,
    color: colors.paper,
    paddingVertical: 11,
  },
  filterChip: {
    borderWidth: 1,
    borderColor: colors.surfaceLight,
    borderRadius: radius.pill,
    paddingVertical: 7,
    paddingHorizontal: 13,
    marginRight: 8,
  },
  filterChipActive: { backgroundColor: colors.gold, borderColor: colors.gold },
  filterChipText: { fontFamily: fonts.bodyMedium, fontSize: 12, color: colors.textMuted },
  filterChipTextActive: { color: colors.bgDeep },
  emptyText: { fontFamily: fonts.body, fontSize: 13, color: colors.textMuted },
});
