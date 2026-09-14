import { Text, TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { ArrowRight, ArrowUpRight, Lock } from "lucide-react-native";
import { colors, fonts, radius } from "@/constants/theme";

export function PrimaryButton({
  label,
  onPress,
  style,
  icon = "arrow",
  disabled,
}: {
  label: string;
  onPress?: () => void;
  style?: ViewStyle;
  icon?: "arrow" | "none";
  disabled?: boolean;
}) {
  return (
    <TouchableOpacity
      style={[styles.primary, disabled && styles.disabled, style]}
      onPress={disabled ? undefined : onPress}
      activeOpacity={0.85}
    >
      <Text style={styles.primaryText}>{label}</Text>
      {icon === "arrow" && <ArrowRight size={16} color={colors.bgDeep} />}
    </TouchableOpacity>
  );
}

export function GhostButton({
  label,
  onPress,
  style,
  locked,
}: {
  label: string;
  onPress?: () => void;
  style?: ViewStyle;
  locked?: boolean;
}) {
  return (
    <TouchableOpacity style={[styles.ghost, style]} onPress={onPress} activeOpacity={0.85}>
      <Text style={styles.ghostText}>{label}</Text>
      {locked ? <Lock size={13} color={colors.paper} /> : <ArrowUpRight size={14} color={colors.paper} />}
    </TouchableOpacity>
  );
}

export function SecondaryButton({
  label,
  onPress,
  style,
}: {
  label: string;
  onPress?: () => void;
  style?: ViewStyle;
}) {
  return (
    <TouchableOpacity style={[styles.secondary, style]} onPress={onPress} activeOpacity={0.85}>
      <Text style={styles.secondaryText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  primary: {
    backgroundColor: colors.gold,
    borderRadius: radius.sm,
    paddingVertical: 13,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  disabled: {
    opacity: 0.5,
  },
  primaryText: {
    fontFamily: fonts.bodySemibold,
    fontSize: 14.5,
    color: colors.bgDeep,
  },
  ghost: {
    borderWidth: 1,
    borderColor: colors.paper + "44",
    borderRadius: radius.sm,
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  ghostText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13.5,
    color: colors.paper,
  },
  secondary: {
    borderWidth: 1,
    borderColor: colors.surfaceLight,
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13.5,
    color: colors.paper,
  },
});
