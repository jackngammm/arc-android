import { ScrollView, View, Text, Image, Linking, Share, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { CalendarDays, MapPin, User, ArrowLeft, Bookmark, BookmarkCheck } from "lucide-react-native";
import { colors, fonts } from "@/constants/theme";
import { Chip } from "@/components/Chip";
import { PrimaryButton, GhostButton } from "@/components/Buttons";
import { useApp } from "@/context/AppContext";
import { events, type ArcEvent } from "@/data/events";

function buildShareMessage(event: ArcEvent): string {
  const lines = [event.title, event.dates, event.place];
  if (event.link) lines.push(event.link);
  return lines.join("\n");
}

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { savedEventIds, toggleSavedEvent } = useApp();
  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <View style={styles.screen}>
        <Text style={styles.notFound}>Event not found.</Text>
      </View>
    );
  }

  const saved = savedEventIds.includes(event.id);

  const handleShare = async () => {
    try {
      await Share.share({ message: buildShareMessage(event) });
    } catch (err) {
      console.warn("Share failed", err);
    }
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: 20, paddingBottom: 32 }}>
      <View style={styles.topRow}>
        <ArrowLeft size={18} color={colors.paper} onPress={() => router.back()} />
        <View onTouchEnd={() => toggleSavedEvent(event.id)}>
          {saved ? <BookmarkCheck size={18} color={colors.gold} /> : <Bookmark size={18} color={colors.textMuted} />}
        </View>
      </View>

      {event.image && <Image source={{ uri: event.image }} style={styles.banner} />}

      {event.placeholder && (
        <View style={styles.placeholderBanner}>
          <Text style={styles.placeholderText}>
            Placeholder listing — swap in the real event details from ARC.
          </Text>
        </View>
      )}

      <Chip>{event.tag}</Chip>
      <Text style={styles.title}>{event.title}</Text>

      <View style={styles.metaGroup}>
        <View style={styles.metaRow}>
          <CalendarDays size={14} color={colors.sage} />
          <Text style={styles.metaText}>{event.dates}</Text>
        </View>
        <View style={styles.metaRow}>
          <MapPin size={14} color={colors.sage} />
          <Text style={styles.metaText}>{event.place}</Text>
        </View>
        <View style={styles.metaRow}>
          <User size={14} color={colors.sage} />
          <Text style={styles.metaText}>{event.organizer}</Text>
        </View>
      </View>

      <Text style={styles.description}>{event.description}</Text>

      {event.status === "upcoming" && event.link && (
        <PrimaryButton
          label="View Details"
          icon="none"
          style={{ marginTop: 8 }}
          onPress={() => Linking.openURL(event.link!)}
        />
      )}
      <GhostButton label="Share event" style={{ width: "100%", marginTop: 10 }} onPress={handleShare} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bgDeep },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 18 },
  banner: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: colors.surfaceLight,
  },
  placeholderBanner: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.surfaceLight,
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
  },
  placeholderText: { fontFamily: fonts.body, fontSize: 12, color: colors.textMuted, lineHeight: 17 },
  title: { fontFamily: fonts.display, fontSize: 24, color: colors.paper, marginTop: 12, marginBottom: 14 },
  metaGroup: { gap: 8, marginBottom: 18 },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  metaText: { fontFamily: fonts.body, fontSize: 13, color: colors.textMuted },
  description: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 21, color: colors.textMuted, marginBottom: 22 },
  notFound: { fontFamily: fonts.body, fontSize: 14, color: colors.textMuted, padding: 20 },
});
