import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { BackLink } from "../components/BackLink";
import { cardShadow, colors } from "../theme";

export default function AnimationsScreen() {
  const bounce = useSharedValue(0);
  const pulse = useSharedValue(0);
  const slide = useSharedValue(0);
  const travel = useSharedValue(0);

  useEffect(() => {
    bounce.value = withRepeat(
      withSequence(
        withSpring(44, { damping: 12, stiffness: 90 }),
        withSpring(0, { damping: 12, stiffness: 90 }),
      ),
      -1,
      false,
    );
    pulse.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      false,
    );
    slide.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      false,
    );
  }, [bounce, pulse, slide]);

  const ballStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bounce.value }],
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: 0.6 + pulse.value * 0.4,
    transform: [{ scale: 0.7 + pulse.value * 0.55 }],
  }));

  const fillStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: slide.value * travel.value }],
  }));

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.sheet} contentContainerStyle={styles.content}>
        <BackLink />
        <View style={styles.header}>
          <Text style={styles.heading}>Animations</Text>
          <Text style={styles.intro}>Real motion, running live below.</Text>
        </View>

        <View style={styles.demo}>
          <Text style={styles.demoTitle}>Bouncing ball</Text>
          <Text style={styles.demoText}>A spring that keeps going.</Text>
          <View style={styles.stage}>
            <Animated.View style={[styles.ball, ballStyle]} />
          </View>
        </View>

        <View style={styles.demo}>
          <Text style={styles.demoTitle}>Breathing dot</Text>
          <Text style={styles.demoText}>Slow pulse, like it's alive.</Text>
          <View style={[styles.stage, styles.stageCenter]}>
            <Animated.View style={[styles.dot, pulseStyle]} />
          </View>
        </View>

        <View style={styles.demo}>
          <Text style={styles.demoTitle}>Sliding bar</Text>
          <Text style={styles.demoText}>Progress that never quite finishes.</Text>
          <View style={[styles.stage, styles.stageCenter]}>
            <View
              style={styles.track}
              onLayout={(event) => {
                travel.value = event.nativeEvent.layout.width * 0.6;
              }}
            >
              <Animated.View style={[styles.fill, fillStyle]} />
            </View>
          </View>
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
    backgroundColor: colors.mintScreen,
  },
  content: {
    paddingBottom: 28,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 4,
  },
  heading: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.ink,
  },
  intro: {
    fontSize: 13,
    color: colors.muted,
    marginTop: 4,
  },
  demo: {
    marginHorizontal: 20,
    marginTop: 16,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 18,
    ...cardShadow,
  },
  demoTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.ink,
    marginBottom: 4,
  },
  demoText: {
    fontSize: 12,
    color: colors.muted,
    marginBottom: 14,
  },
  stage: {
    height: 110,
    backgroundColor: colors.mint,
    borderRadius: 14,
    overflow: "hidden",
  },
  stageCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  ball: {
    position: "absolute",
    left: 20,
    top: 20,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.green,
  },
  dot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.green,
  },
  track: {
    width: "88%",
    height: 14,
    borderRadius: 8,
    backgroundColor: colors.white,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    width: "40%",
    borderRadius: 8,
    backgroundColor: colors.green,
  },
});
