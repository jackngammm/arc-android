import { useMemo, useState } from "react";
import { ScrollView, View, Text, TextInput, StyleSheet } from "react-native";
import { Search } from "lucide-react-native";
import { colors, fonts, radius } from "@/constants/theme";
import { InitiativeCard } from "@/components/InitiativeCard";
import { initiatives } from "@/data/initiatives";
import { useApp } from "@/context/AppContext";

export default function InitiativesScreen() {
  const { isSignedIn } = useApp();
  const [query, setQuery] = useState("");

  const visibleInitiatives = useMemo(() => {
    const base = isSignedIn ? initiatives : initiatives.filter((i) => i.featured === true);
    const q = query.trim().toLowerCase();
    if (!q) return base;
    // Local substring match only — not a reproduction of the website's real search.
    return base.filter(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q) ||
        i.summary.toLowerCase().includes(q)
    );
  }, [isSignedIn, query]);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: 20, paddingBottom: 24 }}>
      <Text style={styles.eyebrow}>Community Initiatives</Text>
      <Text style={styles.h1}>Join the Regenerative Movement</Text>
      <Text style={styles.description}>
        Discover initiatives driving real change, volunteer your skills, or start your own project.
      </Text>

      <View style={styles.searchBar}>
        <Search size={15} color={colors.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search initiatives..."
          placeholderTextColor={colors.textMuted}
          value={query}
          onChangeText={setQuery}
        />
      </View>

      {!isSignedIn && (
        <Text style={styles.note}>
          You're currently viewing featured initiatives only. Sign up or log in to access all public
          community initiatives.
        </Text>
      )}

      {visibleInitiatives.length === 0 ? (
        <Text style={styles.emptyText}>No initiatives match your search.</Text>
      ) : (
        <View style={{ gap: 12 }}>
          {visibleInitiatives.map((i) => (
            <InitiativeCard key={i.id} initiative={i} />
          ))}
        </View>
      )}
    </ScrollView>
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
  h1: { fontFamily: fonts.display, fontSize: 24, color: colors.paper, marginBottom: 10 },
  description: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 20, color: colors.textMuted, marginBottom: 18 },
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
  note: { fontFamily: fonts.body, fontSize: 12, color: colors.textMuted, marginBottom: 16 },
  emptyText: { fontFamily: fonts.body, fontSize: 13, color: colors.textMuted },
});
