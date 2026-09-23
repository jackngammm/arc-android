import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ChevronRight, LogOut, ShoppingBag } from "lucide-react-native";
import { colors, fonts, radius } from "@/constants/theme";
import { PrimaryButton, SecondaryButton } from "@/components/Buttons";
import { useApp } from "@/context/AppContext";
import { events } from "@/data/events";
import { resources } from "@/data/resources";
import { membershipTiers } from "@/data/membershipTiers";

const LEGAL_DOCS = ["Terms of use", "Privacy policy", "MOU", "NDA / NCC", "Referral policy"];
const LEGAL_ROUTES: Record<string, string> = {
  "Terms of use": "terms",
  "Privacy policy": "privacy",
  MOU: "mou",
  "NDA / NCC": "nda",
  "Referral policy": "referral",
};

export default function ProfileScreen() {
  const router = useRouter();
  const { isSignedIn, name, userType, signOut, cart, savedEventIds, savedResourceIds } = useApp();

  const currentTier = membershipTiers.find((t) => t.id === userType);
  const savedEvents = events.filter((e) => savedEventIds.includes(e.id));
  const savedResources = resources.filter((r) => savedResourceIds.includes(r.id));

  if (!isSignedIn) {
    return (
      <ScrollView style={styles.screen} contentContainerStyle={{ padding: 20, paddingBottom: 24 }}>
        <Text style={styles.eyebrow}>Account</Text>
        <Text style={styles.h1}>You're browsing as a guest</Text>
        <Text style={styles.body}>
          Sign in to track your membership status, saved events and resources, and referrals.
        </Text>
        <PrimaryButton label="Sign in" icon="none" onPress={() => router.push("/platform")} />
        <SecondaryButton label="Become a member" style={{ marginTop: 10 }} onPress={() => router.push("/membership")} />
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: 20, paddingBottom: 24 }}>
      <Text style={styles.eyebrow}>Account</Text>
      <Text style={styles.h1}>{name}</Text>

      <View style={styles.statusCard}>
        <Text style={styles.statusLabel}>Membership status</Text>
        <Text style={styles.statusValue}>{currentTier?.name ?? "Free account"}</Text>
        <TouchableOpacity style={styles.row} onPress={() => router.push("/membership")}>
          <Text style={styles.rowLabel}>Manage membership</Text>
          <ChevronRight size={16} color={colors.textMuted} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.listRow} onPress={() => router.push("/cart")}>
        <View style={styles.listRowLeft}>
          <ShoppingBag size={16} color={colors.sage} />
          <Text style={styles.listRowLabel}>Cart</Text>
        </View>
        <View style={styles.listRowRight}>
          <Text style={styles.listRowMeta}>{cart.length} item{cart.length === 1 ? "" : "s"}</Text>
          <ChevronRight size={16} color={colors.textMuted} />
        </View>
      </TouchableOpacity>

      <Text style={styles.h2}>Saved events ({savedEvents.length})</Text>
      {savedEvents.length === 0 ? (
        <Text style={styles.emptyText}>No saved events yet.</Text>
      ) : (
        savedEvents.map((e) => (
          <TouchableOpacity key={e.id} style={styles.listRow} onPress={() => router.push(`/event/${e.id}`)}>
            <Text style={styles.listRowLabel}>{e.title}</Text>
            <ChevronRight size={16} color={colors.textMuted} />
          </TouchableOpacity>
        ))
      )}

      <Text style={styles.h2}>Saved resources ({savedResources.length})</Text>
      {savedResources.length === 0 ? (
        <Text style={styles.emptyText}>No saved resources yet.</Text>
      ) : (
        savedResources.map((r) => (
          <TouchableOpacity key={r.id} style={styles.listRow} onPress={() => router.push(`/resource/${r.id}`)}>
            <Text style={styles.listRowLabel}>{r.name}</Text>
            <ChevronRight size={16} color={colors.textMuted} />
          </TouchableOpacity>
        ))
      )}

      <Text style={styles.h2}>Referrals</Text>
      <View style={styles.referralCard}>
        <Text style={styles.referralText}>
          Co-refer clients and opportunities with other members once you're on a paid plan.
        </Text>
      </View>

      <Text style={styles.h2}>Legal & agreements</Text>
      <View style={{ marginBottom: 22 }}>
        {LEGAL_DOCS.map((doc) => (
          <TouchableOpacity key={doc} style={styles.listRow} onPress={() => router.push(`/legal/${LEGAL_ROUTES[doc]}`)}>
            <Text style={styles.listRowLabel}>{doc}</Text>
            <ChevronRight size={16} color={colors.textMuted} />
          </TouchableOpacity>
        ))}
      </View>

      <SecondaryButton
        label="Sign out"
        onPress={signOut}
        style={{ flexDirection: "row" }}
      />
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
  h1: { fontFamily: fonts.display, fontSize: 24, color: colors.paper, marginBottom: 14 },
  h2: { fontFamily: fonts.display, fontSize: 15, color: colors.paper, marginTop: 20, marginBottom: 10 },
  body: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 21, color: colors.textMuted, marginBottom: 20 },
  statusCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.surfaceLight,
    borderRadius: radius.lg,
    padding: 16,
    marginBottom: 14,
  },
  statusLabel: { fontFamily: fonts.mono, fontSize: 10, color: colors.sage, textTransform: "uppercase", letterSpacing: 0.5 },
  statusValue: { fontFamily: fonts.display, fontSize: 17, color: colors.paper, marginTop: 4, marginBottom: 12 },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  rowLabel: { fontFamily: fonts.bodyMedium, fontSize: 12.5, color: colors.gold },
  listRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceLight,
    paddingVertical: 12,
  },
  listRowLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
  listRowRight: { flexDirection: "row", alignItems: "center", gap: 8 },
  listRowLabel: { fontFamily: fonts.body, fontSize: 13, color: colors.paper },
  listRowMeta: { fontFamily: fonts.body, fontSize: 12, color: colors.textMuted },
  emptyText: { fontFamily: fonts.body, fontSize: 12.5, color: colors.textMuted, marginBottom: 6 },
  referralCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.surfaceLight,
    borderRadius: radius.md,
    padding: 14,
  },
  referralText: { fontFamily: fonts.body, fontSize: 12.5, lineHeight: 18, color: colors.textMuted },
});
