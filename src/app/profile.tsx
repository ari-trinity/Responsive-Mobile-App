import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

type Stat = {
  label: string;
  value: string;
};

type Profile = {
  name: string;
  role: string;
  initials: string;
  stats: Stat[];
};

const profile: Profile = {
  name: "Ari Taylor",
  role: "Mobile app student",
  initials: "AT",
  stats: [
    { label: "Screens", value: "4" },
    { label: "Projects", value: "1" },
    { label: "Skills", value: "3" },
  ],
};

export default function ProfileScreen() {
  const progress = useSharedValue(0);

  const playIntro = () => {
    progress.value = 0;
    progress.value = withTiming(1, { duration: 800 });
  };

  useEffect(() => {
    playIntro();
  }, []);

  const avatarStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ scale: interpolate(progress.value, [0, 1], [0.7, 1]) }],
  }));

  const fillStyle = useAnimatedStyle(() => ({
    width: `${interpolate(progress.value, [0, 1], [0, 72])}%`,
  }));

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <Animated.View style={[styles.avatar, avatarStyle]}>
          <Text style={styles.initials}>{profile.initials}</Text>
        </Animated.View>

        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.role}>{profile.role}</Text>

        <View style={styles.statsRow}>
          {profile.stats.map((stat) => (
            <View key={stat.label} style={styles.statCard}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.skillCard}>
          <Text style={styles.skillTitle}>Profile setup</Text>
          <View style={styles.track}>
            <Animated.View style={[styles.fill, fillStyle]} />
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={playIntro}
        >
          <Text style={styles.buttonText}>Play animation again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  content: {
    width: "100%",
    maxWidth: 480,
    padding: 24,
    alignItems: "center",
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  initials: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "700",
  },
  name: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
  },
  role: {
    fontSize: 16,
    color: "#4B5563",
    marginTop: 4,
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: "row",
    width: "100%",
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
  statLabel: {
    fontSize: 13,
    color: "#4B5563",
    marginTop: 4,
  },
  skillCard: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  skillTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  track: {
    height: 12,
    width: "100%",
    backgroundColor: "#E5E7EB",
    borderRadius: 6,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    backgroundColor: "#111827",
    borderRadius: 6,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#111827",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
