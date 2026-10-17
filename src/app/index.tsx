import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PastelIcon } from "../components/PastelIcon";
import { colors } from "../theme";

type HomeLink = {
  title: string;
  subtitle: string;
  href: "/details" | "/profile" | "/animations";
  color: string;
  icon: "details" | "profile" | "animations";
};

const links: HomeLink[] = [
  {
    title: "Details",
    subtitle: "Scroll through a longer page",
    href: "/details",
    color: colors.pink,
    icon: "details",
  },
  {
    title: "Profile",
    subtitle: "See user stats",
    href: "/profile",
    color: colors.lavender,
    icon: "profile",
  },
  {
    title: "Animations",
    subtitle: "Try a few motion examples",
    href: "/animations",
    color: colors.mint,
    icon: "animations",
  },
];

export default function HomeScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.sheet}>
        <View style={styles.header}>
          <Text style={styles.heading}>Responsive Mobile App</Text>
          <Text style={styles.intro}>Choose a screen to open.</Text>
        </View>

        <View style={styles.cards}>
          {links.map((link) => (
            <TouchableOpacity
              key={link.href}
              style={[styles.card, { backgroundColor: link.color }]}
              activeOpacity={0.85}
              onPress={() => router.push(link.href)}
            >
              <PastelIcon name={link.icon} />
              <View>
                <Text style={styles.cardTitle}>{link.title}</Text>
                <Text style={styles.cardSubtitle}>{link.subtitle}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
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
  header: {
    alignItems: "center",
    paddingTop: 36,
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  heading: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.ink,
    textAlign: "center",
  },
  intro: {
    fontSize: 13,
    color: colors.muted,
    marginTop: 4,
    textAlign: "center",
  },
  cards: {
    paddingHorizontal: 16,
    paddingTop: 14,
    gap: 12,
  },
  card: {
    borderRadius: 22,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.ink,
  },
  cardSubtitle: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 2,
  },
});
