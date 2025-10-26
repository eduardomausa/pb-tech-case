import {
  FormValues,
  useFormContextData,
} from "@/context/FormContext/FormContext";
import * as StorageService from "@/services/storage/storageService";
import { validatePhone } from "@/services/validatePhone/validatePhone";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Alert, StyleSheet, View } from "react-native";
import { createNumberMask, Masks } from "react-native-mask-input";
import { FormInput } from "../FormInput/FormInput";
import { FormPicker } from "../FormPicker/FormPicker";
import SubmitButton from "../SubmitButton/SubmitButton";
import schema from "./schema";

// TO DO: Remover Consultar cache
// const quickDebug = async () => {
//   console.log("=".repeat(50));
//   const cache = await StorageService.getFormCache();
//   const meta = await StorageService.getUserMetadata();
//   console.log("CACHE:", JSON.stringify(cache, null, 2));
//   console.log("META:", JSON.stringify(meta, null, 2));
//   console.log("=".repeat(50));
// };

// quickDebug();

export default function FGTSForm() {
  const [phoneUnmasked, setPhoneUnmasked] = useState("");
  const [hasCheckedCache, setHasCheckedCache] = useState(false);

  const { setFormData, setIsLoading, clearFormCache } = useFormContextData();

  const router = useRouter();

  const months = [
    { label: "Janeiro", value: "jan" },
    { label: "Fevereiro", value: "feb" },
    { label: "Março", value: "mar" },
    { label: "Abril", value: "apr" },
    { label: "Maio", value: "may" },
    { label: "Junho", value: "jun" },
    { label: "Julho", value: "jul" },
    { label: "Agosto", value: "aug" },
    { label: "Setembro", value: "sep" },
    { label: "Outubro", value: "oct" },
    { label: "Novembro", value: "nov" },
    { label: "Dezembro", value: "dec" },
  ];

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      balance: "",
      month: "",
    },
  });

  const currencyMask = createNumberMask({
    prefix: ["R", "$", " "],
    delimiter: ".",
    separator: ",",
    precision: 2,
  });

  const formValues = watch();

  const saveFormToCache = useCallback(async () => {
    const hasContent =
      formValues.name.trim() !== "" ||
      formValues.phone.trim() !== "" ||
      formValues.balance.trim() !== "" ||
      formValues.month.trim() !== "";

    if (hasContent) {
      await StorageService.saveFormCache({
        name: formValues.name,
        phone: formValues.phone,
        balance: formValues.balance,
        month: formValues.month,
      });
    }
  }, [formValues.name, formValues.phone, formValues.balance, formValues.month]);

  useEffect(() => {
    if (!hasCheckedCache) return;

    const timer = setTimeout(() => {
      saveFormToCache();
    }, 1000);

    return () => clearTimeout(timer);
  }, [formValues, hasCheckedCache, saveFormToCache]);

  useEffect(() => {
    let isMounted = true;

    const checkCache = async () => {
      const cachedForm = await StorageService.getFormCache();

      if (!isMounted) return;

      if (cachedForm) {
        Alert.alert(
          "📝 Rascunho encontrado",
          "Deseja continuar de onde parou?",
          [
            {
              text: "Não",
              style: "cancel",
              onPress: async () => {
                await StorageService.clearFormCache();
                setHasCheckedCache(true);
              },
            },
            {
              text: "Sim",
              onPress: () => {
                setValue("name", cachedForm.name);
                setValue("phone", cachedForm.phone);
                setValue("balance", cachedForm.balance);
                setValue("month", cachedForm.month);

                const unmasked = cachedForm.phone.replace(/\D/g, "");
                setPhoneUnmasked(unmasked);
                setHasCheckedCache(true);
              },
            },
          ]
        );
      } else {
        setHasCheckedCache(true);
      }
    };

    const timer = setTimeout(() => {
      checkCache();
    }, 300);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    setIsLoading(true);

    const { isValid, error } = await validatePhone(phoneUnmasked);

    if (error) {
      Alert.alert("Erro", error.message);
      setIsLoading(false);
      return;
    }

    if (!isValid && !error) {
      Alert.alert(
        "Telefone inválido",
        "Digite um telefone válido antes de enviar."
      );
      setIsLoading(false);
      return;
    }

    await StorageService.updateUserName(data.name);
    await StorageService.incrementConsultations();
    await StorageService.clearFormCache();
    await clearFormCache();

    setFormData(data);
    setIsLoading(false);
    router.push("/result");
  };

  return (
    <View style={styles.formCard} accessibilityLabel="form">
      <FormInput
        label="Qual seu nome?"
        name="name"
        control={control}
        placeholder="Guilherme Neves"
        error={errors.name?.message}
      />

      <FormInput
        label="Qual seu telefone?"
        name="phone"
        control={control}
        placeholder="(31) 9 9809-7654"
        mask={Masks.BRL_PHONE}
        keyboardType="phone-pad"
        error={errors.phone?.message}
        onUnmaskedValueChange={setPhoneUnmasked}
      />

      <FormInput
        label="Qual seu saldo?"
        name="balance"
        control={control}
        placeholder="R$ 5.000,00"
        mask={currencyMask}
        keyboardType="numeric"
        error={errors.balance?.message}
      />

      <FormPicker
        label="Qual seu mês de aniversário?"
        name="month"
        control={control}
        placeholder="Julho"
        items={months}
        error={errors.month?.message}
        leftIcon={<EvilIcons name="chevron-down" size={24} color="black" />}
        rightIcon={<FontAwesome name="calendar-o" size={24} color="gray" />}
      />

      <SubmitButton
        onPress={handleSubmit(onSubmit)}
        buttonText="Ver Proposta"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
});
