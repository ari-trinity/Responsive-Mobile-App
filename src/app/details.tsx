import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { BackLink } from "../components/BackLink";
import { cardShadow, colors } from "../theme";

type DetailBlock =
  | { id: string; kind: "section"; title: string; body: string }
  | { id: string; kind: "quote"; body: string }
  | { id: string; kind: "image"; source: "design" | "poster" };

const images = {
  design: require("../../assets/images/responsive-design.png"),
  poster: require("../../assets/images/responsive-poster.jpg"),
};

const blocks: DetailBlock[] = [
  {
    id: "about",
    kind: "section",
    title: "About",
    body: "this is the page where the app actually explains itself. the home screen gave you the highlights — this is the full story. take your time, scroll slow, actually read the thing.",
  },
  { id: "photo", kind: "image", source: "design" },
  {
    id: "more",
    kind: "section",
    title: "Fun Fact",
    body: "Visual communication dates back to 17,000 BCE with Lascaux cave paintings and 3500–3200 BCE with Sumerian pictographs and Egyptian hieroglyphs",
  },
  {
    id: "quote",
    kind: "quote",
    body: "https://phddesign.co.uk/facts-about-graphic-design/",
  },
  {
    id: "even",
    kind: "section",
    title: "Even more",
    body: "made to fit wherever it lands. that's the whole trick — one page that rearranges itself for whatever screen it's on. big, small, tall, wide, it figures it out so you don't have to think about it.",
  },
  { id: "poster", kind: "image", source: "poster" },
];

export default function DetailsScreen() {
  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const heroStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 140], [1, 0.45], Extrapolation.CLAMP),
    transform: [
      {
        translateY: interpolate(
          scrollY.value,
          [0, 140],
          [0, -12],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  return (
    <View style={styles.screen}>
      <Animated.ScrollView
        style={styles.sheet}
        contentContainerStyle={styles.content}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        <BackLink />
        <Animated.View style={[styles.hero, heroStyle]}>
          <Text style={styles.heroTitle}>Details</Text>
          <Text style={styles.heroText}>All the details, in one calm place.</Text>
        </Animated.View>

        {blocks.map((block) => {
          if (block.kind === "section") {
            return (
              <View key={block.id} style={styles.section}>
                <Text style={styles.sectionTitle}>{block.title}</Text>
                <Text style={styles.sectionBody}>{block.body}</Text>
              </View>
            );
          }

          if (block.kind === "quote") {
            return (
              <View key={block.id} style={styles.quote}>
                <Text style={styles.quoteText}>{block.body}</Text>
              </View>
            );
          }

          return (
            <View key={block.id} style={styles.imageWrap}>
              <Image
                source={images[block.source]}
                style={block.source === "poster" ? styles.poster : styles.image}
                contentFit="contain"
              />
            </View>
          );
        })}
      </Animated.ScrollView>
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
    backgroundColor: colors.cream,
  },
  content: {
    paddingBottom: 28,
  },
  hero: {
    marginHorizontal: 20,
    marginTop: 14,
    backgroundColor: colors.pink,
    borderRadius: 22,
    padding: 22,
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.ink,
  },
  heroText: {
    fontSize: 13,
    color: colors.muted,
    marginTop: 6,
    textAlign: "center",
  },
  section: {
    marginHorizontal: 20,
    marginTop: 18,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: colors.pinkDeep,
    marginBottom: 8,
  },
  sectionBody: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.body,
  },
  quote: {
    marginHorizontal: 20,
    marginTop: 18,
    backgroundColor: colors.white,
    borderLeftWidth: 6,
    borderLeftColor: colors.pinkDeep,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    padding: 16,
    ...cardShadow,
  },
  quoteText: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.body,
  },
  imageWrap: {
    marginHorizontal: 20,
    marginTop: 18,
    borderRadius: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 220,
    backgroundColor: "#000000",
  },
  poster: {
    width: "100%",
    aspectRatio: 768 / 1024,
  },
});
