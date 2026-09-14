import { Tabs } from "expo-router";
import { Text } from "react-native";
import { Home, CalendarDays, BookOpen, Sprout, User, Leaf } from "lucide-react-native";
import { colors, fonts } from "@/constants/theme";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.bgDeep },
        headerShadowVisible: false,
        headerTitle: () => (
          <Text style={{ fontFamily: fonts.display, fontSize: 15, color: colors.paper }}>
            ARC
          </Text>
        ),
        headerLeft: () => <Leaf size={16} color={colors.gold} style={{ marginLeft: 16 }} />,
        tabBarStyle: {
          backgroundColor: colors.bgDeep,
          borderTopColor: colors.surfaceLight,
        },
        tabBarActiveTintColor: colors.gold,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: { fontFamily: fonts.body, fontSize: 9.5 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: "Home", tabBarIcon: ({ color, size }) => <Home color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="events"
        options={{ title: "Events", tabBarIcon: ({ color, size }) => <CalendarDays color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="resources"
        options={{ title: "Resources", tabBarIcon: ({ color, size }) => <BookOpen color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="initiatives"
        options={{ title: "Initiatives", tabBarIcon: ({ color, size }) => <Sprout color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: "Profile", tabBarIcon: ({ color, size }) => <User color={color} size={size} /> }}
      />
    </Tabs>
  );
}
