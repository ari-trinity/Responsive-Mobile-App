import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { BackLink } from "../components/BackLink";
import { PastelIcon } from "../components/PastelIcon";
import { cardShadow, colors } from "../theme";

type Stat = {
  label: string;
  value: string;
};

type ProfileRow = {
  id: string;
  title: string;
  subtitle: string;
  icon: "clock" | "pin" | "check";
  toggle?: boolean;
};

type Profile = {
  name: string;
  role: string;
  stats: Stat[];
  rows: ProfileRow[];
};

const profile: Profile = {
  name: "Ari Taylor",
  role: "App explorer since 2026",
  stats: [
    { label: "Screens", value: "3" },
    { label: "Visits", value: "12" },
    { label: "Taps", value: "48" },
  ],
  rows: [
    {
      id: "history",
      title: "Activity history",
      subtitle: "See what you've explored",
      icon: "clock",
    },
    {
      id: "notifications",
      title: "Notifications",
      subtitle: "Get gentle nudges",
      icon: "pin",
      toggle: true,
    },
    {
      id: "preferences",
      title: "Preferences",
      subtitle: "Tune the app to you",
      icon: "check",
    },
  ],
};

export default function ProfileScreen() {
  const progress = useSharedValue(0);
  const knob = useSharedValue(1);
  const [notificationsOn, setNotificationsOn] = useState(true);

  useEffect(() => {
    progress.value = withTiming(1, { duration: 700 });
  }, [progress]);

  const avatarStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ scale: interpolate(progress.value, [0, 1], [0.7, 1]) }],
  }));

  const knobStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(knob.value, [0, 1], [0, 19]) }],
  }));

  const trackStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      knob.value,
      [0, 1],
      [colors.lavender, colors.purple],
    ),
  }));

  const onToggle = () => {
    const next = !notificationsOn;
    setNotificationsOn(next);
    knob.value = withTiming(next ? 1 : 0, { duration: 200 });
  };

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.sheet} contentContainerStyle={styles.content}>
        <BackLink />

        <View style={styles.top}>
          <Animated.View style={[styles.avatar, avatarStyle]}>
            <Image
              source={require("../../assets/images/profile-photo.png")}
              style={styles.photo}
              contentFit="cover"
            />
          </Animated.View>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.role}>{profile.role}</Text>
        </View>

        <View style={styles.stats}>
          {profile.stats.map((stat, index) => (
            <View
              key={stat.label}
              style={[styles.stat, index > 0 && styles.statDivider]}
            >
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.rows}>
          {profile.rows.map((row) => (
            <View key={row.id} style={styles.row}>
              <PastelIcon name={row.icon} size={38} />
              <View style={styles.rowText}>
                <Text style={styles.rowTitle}>{row.title}</Text>
                <Text style={styles.rowSubtitle}>{row.subtitle}</Text>
              </View>
              {row.toggle ? (
                <Pressable onPress={onToggle} accessibilityRole="switch">
                  <Animated.View style={[styles.track, trackStyle]}>
                    <Animated.View style={[styles.knob, knobStyle]} />
                  </Animated.View>
                </Pressable>
              ) : null}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.desk,
    alignItems: "center",
  },
  sheet: {
    flex: 1,
    width: "100%",
    maxWidth: 420,
    backgroundColor: colors.profile,
  },
  content: {
    paddingBottom: 28,
  },
  top: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.lavender,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: colors.white,
    overflow: "hidden",
    shadowColor: colors.purple,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 6,
  },
  photo: {
    width: "100%",
    height: "100%",
  },
  name: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.ink,
    marginTop: 10,
  },
  role: {
    fontSize: 13,
    color: colors.muted,
    marginTop: 2,
  },
  stats: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 18,
    backgroundColor: colors.white,
    borderRadius: 20,
    overflow: "hidden",
    ...cardShadow,
  },
  stat: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
  },
  statDivider: {
    borderLeftWidth: 1,
    borderLeftColor: colors.line,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.ink,
  },
  statLabel: {
    fontSize: 11,
    color: colors.muted,
    marginTop: 2,
  },
  rows: {
    marginHorizontal: 20,
    marginTop: 18,
    gap: 10,
  },
  row: {
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    ...cardShadow,
  },
  rowText: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.ink,
  },
  rowSubtitle: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 2,
  },
  track: {
    width: 46,
    height: 27,
    borderRadius: 14,
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  knob: {
    width: 21,
    height: 21,
    borderRadius: 11,
    backgroundColor: colors.white,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
});
