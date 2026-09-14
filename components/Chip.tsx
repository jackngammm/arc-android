import { Text, View, StyleSheet } from "react-native";
import { colors, fonts, radius } from "@/constants/theme";

export function Chip({ children }: { children: string }) {
  return (
    <View style={styles.chip}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderWidth: 1,
    borderColor: colors.gold + "55",
    borderRadius: radius.pill,
    paddingVertical: 3,
    paddingHorizontal: 9,
    alignSelf: "flex-start",
  },
  text: {
    fontFamily: fonts.mono,
    fontSize: 10.5,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: colors.gold,
  },
});
