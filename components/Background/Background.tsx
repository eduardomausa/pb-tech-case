import { StyleSheet, View } from "react-native";

export default function Background({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <View style={styles.blueBackground} testID="blue-background" />
        <View style={styles.lightBackground} testID="light-background" />
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eff6ff",
  },
  backgroundContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  blueBackground: {
    flex: 1,
    backgroundColor: "#0053F0",
  },
  lightBackground: {
    flex: 1,
    backgroundColor: "#eff6ff",
  },
});
