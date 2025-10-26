import Background from "@/components/Background/Background";
import FGTSForm from "@/components/FGTSForm/FGTSForm";
import Header from "@/components/Header/Header";
import Loading from "@/components/Loading/Loading";
import { useFormContextData } from "@/context/FormContext/FormContext";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const { isLoading } = useFormContextData();
  return (
    <>
      <Background>
        <>
          <Loading isLoading={isLoading} />
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Header
              title={`Antecipe seu\nSaque-Aniversário`}
              subtitle="Use uma grana que já é sua e saia do aperto"
            />
            <FGTSForm />
            <View style={styles.bottomSpacer} />
          </ScrollView>
        </>
      </Background>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 32,
  },
  bottomSpacer: {
    height: 80,
  },
});
