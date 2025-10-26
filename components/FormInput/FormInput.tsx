import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import MaskInput, { Mask } from "react-native-mask-input";
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage";

interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  mask?: Mask;
  keyboardType?: TextInputProps["keyboardType"];
  secureTextEntry?: boolean;
  error?: string;
  onUnmaskedValueChange?: (unmasked: string) => void;
}

export function FormInput<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  mask,
  keyboardType = "default",
  secureTextEntry = false,
  error,
  onUnmaskedValueChange,
}: FormInputProps<T>) {
  return (
    <View style={{ marginBottom: 16 }}>
      {label && <Text style={styles.label}>{label}</Text>}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) =>
          mask ? (
            <MaskInput
              accessible
              accessibilityLabel={label ?? name}
              accessibilityHint={`Campo de texto. ${placeholder ?? ""}`}
              value={value || ""}
              onChangeText={(masked, unmasked) => {
                onChange(masked);
                if (onUnmaskedValueChange)
                  onUnmaskedValueChange(unmasked ?? "");
              }}
              mask={mask}
              style={styles.input}
              keyboardType={keyboardType}
              placeholder={placeholder}
              placeholderTextColor="#9ca3af"
            />
          ) : (
            <TextInput
              accessible
              accessibilityLabel={label ?? name}
              accessibilityHint={`Campo de texto. ${placeholder ?? ""}`}
              style={styles.input}
              placeholder={placeholder}
              placeholderTextColor="#9ca3af"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType={keyboardType}
              secureTextEntry={secureTextEntry}
            />
          )
        }
      />

      {error && <FormErrorMessage message={error} />}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: "#6B7280",
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    fontSize: 16,
    color: "#000",
  },
});
