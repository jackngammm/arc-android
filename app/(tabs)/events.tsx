import { useMemo, useState } from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Search } from "lucide-react-native";
import { colors, fonts, radius } from "@/constants/theme";
import { EventCard } from "@/components/EventCard";
import { events } from "@/data/events";

export default function EventsScreen() {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const base = events.filter((e) => e.status === tab);
    const q = query.trim().toLowerCase();
    if (!q) return base;
    return base.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.place.toLowerCase().includes(q) ||
        e.tag.toLowerCase().includes(q)
    );
  }, [tab, query]);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: 20, paddingBottom: 24 }}>
      <Text style={styles.eyebrow}>Community Calendar</Text>
      <Text style={styles.h1}>{tab === "upcoming" ? "Upcoming Events" : "Past Events"}</Text>
      <Text style={styles.description}>
        Discover workshops, roundtables, and networking opportunities with the Alliance for Regenerative Communities
      </Text>

      <View style={styles.segment}>
        {(["upcoming", "past"] as const).map((key) => (
          <TouchableOpacity
            key={key}
            style={[styles.segmentItem, tab === key && styles.segmentItemActive]}
            onPress={() => setTab(key)}
          >
            <Text style={[styles.segmentText, tab === key && styles.segmentTextActive]}>
              {key === "upcoming" ? "Upcoming" : "Past"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.searchBar}>
        <Search size={15} color={colors.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search events..."
          placeholderTextColor={colors.textMuted}
          value={query}
          onChangeText={setQuery}
        />
      </View>

      {filtered.length === 0 ? (
        <Text style={styles.emptyText}>No {tab} events to show.</Text>
      ) : (
        <View style={{ gap: 12 }}>
          {filtered.map((e) => (
            <EventCard key={e.id} event={e} />
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
  segment: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    padding: 4,
    marginBottom: 14,
  },
  segmentItem: { flex: 1, paddingVertical: 9, borderRadius: radius.sm - 2, alignItems: "center" },
  segmentItemActive: { backgroundColor: colors.surfaceLight },
  segmentText: { fontFamily: fonts.bodyMedium, fontSize: 12.5, color: colors.textMuted },
  segmentTextActive: { color: colors.paper },
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
  emptyText: { fontFamily: fonts.body, fontSize: 13, color: colors.textMuted },
});
