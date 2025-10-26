import { StyleSheet, Text, TouchableOpacity } from "react-native";

type ButtonProps = {
  buttonText: string;
  onPress: () => void;
};

export default function SubmitButton({ onPress, buttonText }: ButtonProps) {
  return (
    <>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={onPress}
        activeOpacity={0.8}
        accessible
        accessibilityRole="button"
        accessibilityLabel={buttonText}
        accessibilityHint="Enviar formulário e ver proposta"
      >
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: "#0053F0",
    borderRadius: 8,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
