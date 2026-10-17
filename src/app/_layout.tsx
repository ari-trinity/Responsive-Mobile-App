import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#111827" },
        headerTintColor: "#ffffff",
        headerTitleStyle: { fontWeight: "600" },
        contentStyle: { backgroundColor: "#F3F4F6" },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="details" options={{ title: "Details" }} />
      <Stack.Screen name="profile" options={{ title: "Profile" }} />
      <Stack.Screen name="animations" options={{ title: "Animations" }} />
    </Stack>
  );
}