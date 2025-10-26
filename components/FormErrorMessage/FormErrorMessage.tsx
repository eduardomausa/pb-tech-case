import { StyleSheet, Text } from "react-native";

interface FormErrorMessageProps {
  message: string;
}

export default function FormErrorMessage({ message }: FormErrorMessageProps) {
  return (
    <Text style={styles.errorText} accessibilityLiveRegion="polite">
      {message}
    </Text>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 4,
  },
});
