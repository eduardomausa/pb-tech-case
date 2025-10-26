import { ActivityIndicator, StyleSheet, View } from "react-native";

type LoadingProps = {
  isLoading: boolean;
};

export default function Loading({ isLoading }: LoadingProps) {
  return (
    isLoading && (
      <View
        accessible
        accessibilityLiveRegion="polite"
        accessibilityRole="alert"
        style={styles.loadingContainer}
      >
        <ActivityIndicator size="large" color="#fff" />
      </View>
    )
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.45)",
    zIndex: 9999,
    elevation: 9999,
  },
});
