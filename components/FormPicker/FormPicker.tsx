import React, { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import {
  AccessibilityInfo,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage";

type PickerItem = { label: string; value: string };

type PickerFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  items: PickerItem[];
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
};

export function FormPicker<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  items,
  leftIcon,
  rightIcon,
  error,
}: PickerFieldProps<T>) {
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={styles.pickerContainer}>
      {label && <Text style={styles.label}>{label}</Text>}

      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <>
            <TouchableOpacity
              style={styles.dropdownButtonContainer}
              onPress={() => setShowModal(true)}
              activeOpacity={0.7}
            >
              <View style={styles.dropdownButton}>
                {leftIcon}
                <Text
                  style={[
                    styles.dropdownText,
                    !value && styles.placeholderText,
                  ]}
                >
                  {value
                    ? items.find((item) => item.value === value)?.label
                    : placeholder || "Selecione uma opção"}
                </Text>
              </View>
              {rightIcon}
            </TouchableOpacity>

            <Modal
              visible={showModal}
              transparent
              animationType="fade"
              onRequestClose={() => setShowModal(false)}
              accessible
              accessibilityViewIsModal
            >
              <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                accessible={false}
                onPress={() => setShowModal(false)}
              >
                <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <TouchableOpacity
                      onPress={() => setShowModal(false)}
                      style={styles.closeButton}
                      accessibilityRole="button"
                      accessibilityLabel="Fechar seleção"
                    >
                      <Text style={styles.closeButtonText}>✕</Text>
                    </TouchableOpacity>
                  </View>

                  <FlatList
                    data={items}
                    keyExtractor={(item) => item.value}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={[
                          styles.option,
                          value === item.value && styles.optionSelected,
                        ]}
                        onPress={() => {
                          onChange(item.value);
                          AccessibilityInfo.announceForAccessibility(
                            `${item.label} selecionado`
                          );
                          setShowModal(false);
                        }}
                        accessibilityRole="button"
                        accessibilityState={{ selected: value === item.value }}
                        accessibilityLabel={item.label}
                      >
                        <Text
                          style={[
                            styles.optionText,
                            value === item.value && styles.optionTextSelected,
                          ]}
                        >
                          {item.label}
                        </Text>
                        {value === item.value && (
                          <Text style={styles.checkmark}>✓</Text>
                        )}
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </TouchableOpacity>
            </Modal>
          </>
        )}
      />

      {error && <FormErrorMessage message={error} />}
    </View>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    marginBottom: 16,
  },
  label: {
    color: "#6B7280",
    fontSize: 14,
    marginBottom: 6,
  },
  dropdownButtonContainer: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  dropdownText: {
    fontSize: 16,
    marginLeft: 8,
    color: "#696a6cff",
  },
  placeholderText: {
    color: "#9ca3af",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    width: "100%",
    maxWidth: 400,
    maxHeight: "70%",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  closeButton: {
    padding: 4,
  },
  closeButtonText: {
    fontSize: 24,
    color: "#6B7280",
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  optionSelected: {
    backgroundColor: "#EFF6FF",
  },
  optionText: {
    fontSize: 16,
    color: "#696a6cff",
  },
  optionTextSelected: {
    color: "#0053F0",
    fontWeight: "600",
  },
  checkmark: {
    fontSize: 18,
    color: "#0053F0",
    fontWeight: "bold",
  },
});
