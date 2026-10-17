import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type HomeLink = {
  title: string;
  subtitle: string;
  href: "/details" | "/profile" | "/animations";
};

const links: HomeLink[] = [
  {
    title: "Details",
    subtitle: "Scroll through a longer page",
    href: "/details",
  },
  {
    title: "Profile",
    subtitle: "See user stats",
    href: "/profile",
  },
  {
    title: "Animations",
    subtitle: "Try a few motion examples",
    href: "/animations",
  },
];

export default function HomeScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.heading}>Responsive Mobile App</Text>
        <Text style={styles.intro}>Choose a screen to open.</Text>

        {links.map((link) => (
          <TouchableOpacity
            key={link.href}
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => router.push(link.href)}
          >
            <Text style={styles.cardTitle}>{link.title}</Text>
            <Text style={styles.cardSubtitle}>{link.subtitle}</Text>
          </TouchableOpacity>
        ))}
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
  },
  heading: {
    fontSize: 32,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  intro: {
    fontSize: 16,
    color: "#4B5563",
    marginBottom: 24,
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
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 15,
    color: "#4B5563",
  },
});
