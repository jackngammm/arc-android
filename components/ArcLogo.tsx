import { Image, StyleSheet } from "react-native";

export function ArcLogo() {
  return (
    <Image
      source={require("@/assets/arc-logo.jpg")}
      style={styles.logo}
      resizeMode="contain"
      accessibilityLabel="ARC — Alliance for Regenerative Communities"
      accessible
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 130,
    flexShrink: 0,
    aspectRatio: 1282 / 1103,
    borderRadius: 12,
    backgroundColor: "#000000",
  },
});
