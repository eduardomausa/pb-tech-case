import InfoSection from "@/components/InfoSection/InfoSection";
import { useFormContextData } from "@/context/FormContext/FormContext";
import { useFGTSCalculation } from "@/hooks/useFGTSCalculation/useFGTSCalculation";
import { ImageBackground, StyleSheet, View } from "react-native";

export default function ResultScreen() {
  const { formData } = useFormContextData();
  const firstName = formData?.name.split(" ")[0];
  const { result } = useFGTSCalculation(formData?.balance || "0");
  const formattedResult = result.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        accessible={false}
        source={require("@/assets/images/background-img.png")}
        resizeMode="cover"
        style={styles.imageSection}
      />
      <InfoSection
        title={`Olá, ${firstName}!`}
        subtitle="Você pode receber até"
        info="*Esta simulação traz valores aproximados. Para calcular o valor exato, entre em contato com o Smile Co. ou consulte seu saldo no app do FGTS."
        formattedResult={formattedResult}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageSection: {
    flex: 3,
    width: "100%",
  },
});
