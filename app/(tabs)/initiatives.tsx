import { ScrollView, View, Text, StyleSheet } from "react-native";
import { colors, fonts, radius } from "@/constants/theme";
import { InitiativeCard } from "@/components/InitiativeCard";
import { initiatives, volunteerTasks } from "@/data/initiatives";
import { useApp } from "@/context/AppContext";

export default function InitiativesScreen() {
  const { userType } = useApp();
  const publicInitiatives = initiatives.filter((i) => i.access === "public");
  const memberInitiatives = initiatives.filter((i) => i.access === "member");
  const canVolunteer = userType !== "guest";

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: 20, paddingBottom: 24 }}>
      <Text style={styles.eyebrow}>Collective action</Text>
      <Text style={styles.h1}>Initiatives</Text>

      <Text style={styles.h2}>Public initiatives</Text>
      <View style={{ gap: 12, marginTop: 10, marginBottom: 22 }}>
        {publicInitiatives.map((i) => (
          <InitiativeCard key={i.id} initiative={i} />
        ))}
      </View>

      <Text style={styles.h2}>Open volunteer tasks</Text>
      {!canVolunteer && (
        <Text style={styles.note}>Create a free account to take on a volunteer task.</Text>
      )}
      <View style={{ gap: 10, marginTop: 10, marginBottom: 22 }}>
        {volunteerTasks.map((t) => (
          <View key={t.id} style={styles.taskCard}>
            <Text style={styles.taskTitle}>{t.title}</Text>
            <Text style={styles.taskSummary}>{t.summary}</Text>
            <Text style={styles.taskTime}>{t.timeCommitment}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.h2}>Member-only initiatives</Text>
      <View style={{ gap: 12, marginTop: 10 }}>
        {memberInitiatives.map((i) => (
          <InitiativeCard key={i.id} initiative={i} />
        ))}
      </View>
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
  h1: { fontFamily: fonts.display, fontSize: 24, color: colors.paper, marginBottom: 20 },
  h2: { fontFamily: fonts.display, fontSize: 16, color: colors.paper },
  note: { fontFamily: fonts.body, fontSize: 12, color: colors.textMuted, marginTop: 6 },
  taskCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.surfaceLight,
    borderRadius: radius.md,
    padding: 14,
  },
  taskTitle: { fontFamily: fonts.bodySemibold, fontSize: 13, color: colors.paper, marginBottom: 4 },
  taskSummary: { fontFamily: fonts.body, fontSize: 12, color: colors.textMuted, lineHeight: 17, marginBottom: 6 },
  taskTime: { fontFamily: fonts.mono, fontSize: 10.5, color: colors.sage },
});
