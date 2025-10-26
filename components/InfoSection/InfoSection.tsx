import { StyleSheet, Text, View } from "react-native";

type InfoSectionProps = {
  title: string;
  subtitle: string;
  info: string;
  formattedResult: string;
};

export default function InfoSection({
  title,
  subtitle,
  info,
  formattedResult,
}: InfoSectionProps) {
  return (
    <View style={styles.infoSection}>
      <Text
        accessible
        accessibilityRole="text"
        accessibilityLabel={`Olá, ${title}!`}
        style={styles.title}
      >
        {title}
      </Text>
      <Text
        style={styles.subtitle}
        accessible
        accessibilityRole="text"
        accessibilityLabel={subtitle}
      >
        {subtitle}
      </Text>
      <Text
        style={styles.balance}
        accessible
        accessibilityRole="text"
        accessibilityLabel={formattedResult}
      >
        {formattedResult}
      </Text>
      <Text
        style={styles.info}
        accessible
        accessibilityRole="text"
        accessibilityLabel={info}
      >
        {info}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  infoSection: {
    flex: 2,
    paddingTop: 48,
    alignItems: "flex-start",
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 22,
    color: "#7e8388",
    marginBottom: 16,
  },
  balance: {
    fontSize: 32,
    color: "#004bd4",
    fontWeight: "800",
    marginBottom: 60,
  },
  info: {
    fontSize: 14,
    alignItems: "flex-end",
    color: "#7e8388",
  },
});
