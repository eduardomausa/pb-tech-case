import { StyleSheet, Text, View } from "react-native";

type HeaderProps = {
  title: string;
  subtitle: string;
};

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <View
      style={styles.header}
      accessible
      accessibilityRole="header"
      accessibilityLabel={`${title}${subtitle ? ". " + subtitle : ""}`}
    >
      <View style={styles.iconCircle} testID="icon-circle"></View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    marginBottom: 32,
    paddingTop: 40,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 28,
    borderWidth: 3,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 8,
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 12,
    color: "#f4f4f4",
    textAlign: "center",
  },
});
