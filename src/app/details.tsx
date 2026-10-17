import { StyleSheet, Text, View } from "react-native";
import Animated, {
	Extrapolation,
	interpolate,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
} from "react-native-reanimated";

type DetailItem = {
  id: string;
  title: string;
  body: string;
};

const items: DetailItem[] = [
  {
    id: "1",
    title: "Navigation",
    body: "Each file in src/app is a screen. The buttons on Home open those screens.",
  },
  {
    id: "2",
    title: "Scrolling",
    body: "This page is a list. Drag it up and the banner above reacts to how far you have scrolled.",
  },
  {
    id: "3",
    title: "Dynamic content",
    body: "These cards are drawn from a list of data. Add another object to the list and a new card appears.",
  },
  {
    id: "4",
    title: "Type safety",
    body: "DetailItem says every entry needs an id, a title, and a body. TypeScript flags you if one is missing.",
  },
  {
    id: "5",
    title: "Layout",
    body: "The column stays phone-sized on a wide browser because the content has a maximum width.",
  },
  {
    id: "6",
    title: "Next screens",
    body: "Profile will show user stats. Animations will show motion you can trigger with a tap.",
  },
];

export default function DetailsScreen() {
  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const bannerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollY.value,
      [0, 120],
      [1, 0.35],
      Extrapolation.CLAMP,
    ),
    transform: [
      {
        translateY: interpolate(
          scrollY.value,
          [0, 120],
          [0, -16],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  return (
    <View style={styles.screen}>
      <Animated.View style={[styles.banner, bannerStyle]}>
        <Text style={styles.bannerTitle}>Project notes</Text>
        <Text style={styles.bannerText}>
          Scroll the list. This banner fades as you go.
        </Text>
      </Animated.View>

      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.list}
      >
        {items.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardBody}>{item.body}</Text>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  banner: {
    width: "100%",
    maxWidth: 480,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 8,
  },
  bannerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  bannerText: {
    fontSize: 15,
    color: "#4B5563",
  },
  list: {
    width: "100%",
    maxWidth: 480,
    padding: 24,
    paddingTop: 12,
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
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },
  cardBody: {
    fontSize: 15,
    lineHeight: 22,
    color: "#4B5563",
  },
});
