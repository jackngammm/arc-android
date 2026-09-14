import { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors, fonts, radius } from "@/constants/theme";
import { EventCard } from "@/components/EventCard";
import { events } from "@/data/events";

export default function EventsScreen() {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const filtered = events.filter((e) => e.status === tab);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: 20, paddingBottom: 24 }}>
      <Text style={styles.eyebrow}>Calendar</Text>
      <Text style={styles.h1}>Events</Text>

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
  h1: { fontFamily: fonts.display, fontSize: 24, color: colors.paper, marginBottom: 16 },
  segment: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    padding: 4,
    marginBottom: 18,
  },
  segmentItem: { flex: 1, paddingVertical: 9, borderRadius: radius.sm - 2, alignItems: "center" },
  segmentItemActive: { backgroundColor: colors.surfaceLight },
  segmentText: { fontFamily: fonts.bodyMedium, fontSize: 12.5, color: colors.textMuted },
  segmentTextActive: { color: colors.paper },
  emptyText: { fontFamily: fonts.body, fontSize: 13, color: colors.textMuted },
});
