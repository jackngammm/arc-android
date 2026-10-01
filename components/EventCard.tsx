import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { CalendarDays, MapPin, Bookmark, BookmarkCheck } from "lucide-react-native";
import { colors, fonts, radius } from "@/constants/theme";
import { Chip } from "@/components/Chip";
import { useApp } from "@/context/AppContext";
import { isPartnerEventLocked, type ArcEvent } from "@/data/events";
import { LockedPartnerEvent } from "@/components/LockedPartnerEvent";

export function EventCard({ event }: { event: ArcEvent }) {
  const router = useRouter();
  const { savedEventIds, toggleSavedEvent } = useApp();
  const saved = savedEventIds.includes(event.id);

  if (isPartnerEventLocked(event)) return <LockedPartnerEvent title={event.title} />;

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => router.push(`/event/${event.id}`)}
    >
      {event.image && <Image source={{ uri: event.image }} style={styles.thumb} />}
      <View style={styles.topRow}>
        <Chip>{event.tag}</Chip>
        <TouchableOpacity onPress={() => toggleSavedEvent(event.id)} hitSlop={8}>
          {saved ? <BookmarkCheck size={16} color={colors.gold} /> : <Bookmark size={16} color={colors.textMuted} />}
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{event.title}</Text>
      <View style={styles.metaGroup}>
        <View style={styles.metaRow}>
          <CalendarDays size={13.5} color={colors.sage} />
          <Text style={styles.metaText}>{event.dates}</Text>
        </View>
        <View style={styles.metaRow}>
          <MapPin size={13.5} color={colors.sage} />
          <Text style={styles.metaText}>{event.place}</Text>
        </View>
      </View>
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
  thumb: {
    width: "100%",
    height: 120,
    borderRadius: radius.sm,
    marginBottom: 12,
    backgroundColor: colors.surfaceLight,
  },
  topRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  title: {
    fontFamily: fonts.display,
    fontSize: 16.5,
    color: colors.paper,
    marginTop: 10,
    marginBottom: 8,
  },
  metaGroup: { gap: 4 },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 7 },
  metaText: { fontFamily: fonts.body, fontSize: 12.5, color: colors.textMuted },
});
