import { useState } from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from "react-native-reanimated";

export default function AnimationsScreen() {
  const scale = useSharedValue(1);
  const offset = useSharedValue(0);
  const turns = useSharedValue(0);

  const [big, setBig] = useState(false);
  const [shifted, setShifted] = useState(false);

  const bounceStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const slideStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  const spinStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${turns.value * 360}deg` }],
  }));

  const onBounce = () => {
    const next = !big;
    setBig(next);
    scale.value = withSpring(next ? 1.3 : 1);
  };

  const onSlide = () => {
    const next = !shifted;
    setShifted(next);
    offset.value = withTiming(next ? 48 : 0, { duration: 400 });
  };

  const onSpin = () => {
    turns.value = withTiming(turns.value + 1, { duration: 600 });
  };

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>Spring</Text>
          <Text style={styles.body}>
            The square grows and settles with a little bounce.
          </Text>
          <Animated.View style={[styles.box, bounceStyle]} />
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={onBounce}
          >
            <Text style={styles.buttonText}>{big ? "Shrink" : "Grow"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Timing</Text>
          <Text style={styles.body}>
            The square slides over a fixed amount of time.
          </Text>
          <Animated.View style={[styles.box, slideStyle]} />
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={onSlide}
          >
            <Text style={styles.buttonText}>
              {shifted ? "Slide back" : "Slide right"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Rotation</Text>
          <Text style={styles.body}>
            Each press turns the square one full circle.
          </Text>
          <Animated.View style={[styles.box, spinStyle]} />
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={onSpin}
          >
            <Text style={styles.buttonText}>Spin</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    alignItems: "center",
  },
  content: {
    width: "100%",
    maxWidth: 480,
    padding: 24,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  body: {
    fontSize: 15,
    color: "#4B5563",
    marginBottom: 16,
  },
  box: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: "#111827",
    marginBottom: 16,
  },
  button: {
    alignSelf: "flex-start",
    backgroundColor: "#111827",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },
});
