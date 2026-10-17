import { StyleSheet, View } from "react-native";
import { colors } from "../theme";

type IconName =
  | "details"
  | "profile"
  | "animations"
  | "avatar"
  | "clock"
  | "pin"
  | "check";

type PastelIconProps = {
  name: IconName;
  size?: number;
};

export function PastelIcon({ name, size = 46 }: PastelIconProps) {
  if (name === "details") {
    return (
      <View style={[styles.slot, { width: size, height: size }]}>
        <View style={styles.page}>
          <View style={styles.line} />
          <View style={styles.line} />
        </View>
      </View>
    );
  }

  if (name === "profile") {
    return (
      <View style={[styles.slot, { width: size, height: size }]}>
        <View style={styles.personBadge}>
          <View style={styles.head} />
          <View style={styles.shoulders} />
        </View>
      </View>
    );
  }

  if (name === "avatar") {
    return (
      <View style={[styles.slot, { width: size, height: size }]}>
        <View style={styles.avatarHead} />
        <View style={styles.avatarBody} />
      </View>
    );
  }

  if (name === "animations") {
    return (
      <View style={[styles.slot, { width: size, height: size }]}>
        <View style={styles.playRing}>
          <View style={styles.play} />
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.mini, { width: size, height: size }]}>
      {name === "clock" ? <View style={styles.hand} /> : null}
      {name === "pin" ? <View style={styles.pin} /> : null}
      {name === "check" ? <View style={styles.check} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  slot: {
    alignItems: "center",
    justifyContent: "center",
  },
  page: {
    width: 22,
    height: 30,
    borderRadius: 7,
    backgroundColor: colors.white,
    justifyContent: "center",
    gap: 5,
    paddingHorizontal: 4,
  },
  line: {
    height: 2.5,
    borderRadius: 2,
    backgroundColor: colors.pinkDeep,
  },
  personBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.white,
    alignItems: "center",
    overflow: "hidden",
  },
  head: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: colors.purple,
    marginTop: 6,
  },
  shoulders: {
    width: 18,
    height: 10,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    backgroundColor: colors.purple,
    marginTop: 3,
  },
  avatarHead: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.purple,
    marginTop: 8,
  },
  avatarBody: {
    width: 48,
    height: 28,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: colors.purple,
    marginTop: 6,
  },
  playRing: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 3,
    borderColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  play: {
    width: 0,
    height: 0,
    marginLeft: 3,
    borderTopWidth: 6,
    borderBottomWidth: 6,
    borderLeftWidth: 10,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: colors.green,
  },
  mini: {
    borderRadius: 19,
    backgroundColor: colors.lavender,
    alignItems: "center",
    justifyContent: "center",
  },
  hand: {
    width: 10,
    height: 10,
    borderLeftWidth: 2.5,
    borderBottomWidth: 2.5,
    borderColor: colors.purple,
    transform: [{ rotate: "-45deg" }],
  },
  pin: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.purple,
  },
  check: {
    width: 12,
    height: 7,
    borderLeftWidth: 2.5,
    borderBottomWidth: 2.5,
    borderColor: colors.purple,
    transform: [{ rotate: "-45deg" }],
    marginTop: -2,
  },
});
