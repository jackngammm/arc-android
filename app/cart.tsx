import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft, X } from "lucide-react-native";
import { colors, fonts, radius } from "@/constants/theme";
import { PrimaryButton } from "@/components/Buttons";
import { useApp } from "@/context/AppContext";

export default function CartScreen() {
  const router = useRouter();
  const { cart, removeFromCart, signIn, isSignedIn, name } = useApp();

  function handleCheckout() {
    // Mock checkout: no real payment. Marks the user as on the tier they picked.
    const tierItem = cart.find((c) => c.id.startsWith("tier-"));
    if (tierItem) {
      const tierId = tierItem.id.replace("tier-", "") as "paid" | "scholarship" | "team";
      signIn(tierId, isSignedIn ? name : "New member");
    }
    router.dismissAll();
  }

  return (
    <View style={styles.screen}>
      <ArrowLeft size={18} color={colors.paper} onPress={() => router.back()} style={{ marginBottom: 20 }} />
      <Text style={styles.eyebrow}>Checkout</Text>
      <Text style={styles.h1}>Cart</Text>

      {cart.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty.</Text>
      ) : (
        <ScrollView style={{ marginBottom: 20 }}>
          {cart.map((item) => (
            <View key={item.id} style={styles.item}>
              <View>
                <Text style={styles.itemLabel}>{item.label}</Text>
                <Text style={styles.itemPrice}>{item.price}</Text>
              </View>
              <TouchableOpacity onPress={() => removeFromCart(item.id)} hitSlop={8}>
                <X size={16} color={colors.textMuted} />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}

      {cart.length > 0 && (
        <PrimaryButton label="Complete checkout (mock)" icon="none" onPress={handleCheckout} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bgDeep, padding: 20, paddingTop: 60 },
  eyebrow: {
    fontFamily: fonts.mono,
    fontSize: 10.5,
    color: colors.gold,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  h1: { fontFamily: fonts.display, fontSize: 24, color: colors.paper, marginBottom: 18 },
  emptyText: { fontFamily: fonts.body, fontSize: 13, color: colors.textMuted },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.surfaceLight,
    borderRadius: radius.md,
    padding: 14,
    marginBottom: 10,
  },
  itemLabel: { fontFamily: fonts.bodySemibold, fontSize: 13.5, color: colors.paper, marginBottom: 3 },
  itemPrice: { fontFamily: fonts.body, fontSize: 12, color: colors.textMuted },
});
