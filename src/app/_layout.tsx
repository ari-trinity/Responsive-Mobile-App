import { Stack } from "expo-router";
import { colors } from "../theme";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        contentStyle: { backgroundColor: colors.desk },
      }}
    />
  );
}
