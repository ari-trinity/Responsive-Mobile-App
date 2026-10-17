import { router } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../theme";

export function BackLink() {
  return (
    <Pressable onPress={() => router.back()} style={styles.back}>
      <Text style={styles.text}>‹ Home</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  back: {
    alignSelf: "flex-start",
    paddingTop: 16,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.muted,
  },
});
