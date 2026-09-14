import Svg, { Circle } from "react-native-svg";
import { colors } from "@/constants/theme";

export function GrowthRings({ size = 220 }: { size?: number }) {
  const rings = [1, 0.78, 0.58, 0.4, 0.24];
  return (
    <Svg width={size} height={size} viewBox="0 0 220 220">
      {rings.map((r, i) => (
        <Circle
          key={i}
          cx={110}
          cy={110}
          r={100 * r}
          fill="none"
          stroke={colors.gold}
          strokeWidth={i === 0 ? 1.5 : 1}
          opacity={0.16 + i * 0.03}
        />
      ))}
    </Svg>
  );
}
