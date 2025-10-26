import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import { Control, useForm } from "react-hook-form";
import * as RN from "react-native";
import { FormPicker } from "./FormPicker";

jest
  .spyOn(RN.AccessibilityInfo, "announceForAccessibility")
  .mockImplementation(jest.fn());

type FormValues = {
  testField: string;
};

const items = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
];

function renderWithFormPicker(error?: string) {
  const Wrapper = () => {
    const { control } = useForm<FormValues>({
      defaultValues: { testField: "" },
    });
    return (
      <FormPicker
        name="testField"
        control={control as unknown as Control<FormValues>}
        label="Test Label"
        placeholder="Select..."
        items={items}
        error={error}
      />
    );
  };

  return render(<Wrapper />);
}

describe("FormPicker", () => {
  it("renders label and placeholder correctly", () => {
    const { getByText } = renderWithFormPicker();
    expect(getByText("Test Label")).toBeTruthy();
    expect(getByText("Select...")).toBeTruthy();
  });

  it("opens modal when pressing dropdown button", () => {
    const { getByText, getByLabelText } = renderWithFormPicker();
    fireEvent.press(getByText("Select..."));
    expect(getByLabelText("Fechar seleção")).toBeTruthy();
    expect(getByText("Option 1")).toBeTruthy();
    expect(getByText("Option 2")).toBeTruthy();
  });

  it("closes modal when pressing close button", async () => {
    const { getByText, queryByText, getByLabelText } = renderWithFormPicker();
    fireEvent.press(getByText("Select..."));
    fireEvent.press(getByLabelText("Fechar seleção"));
    await waitFor(() => {
      expect(queryByText("Option 1")).toBeNull();
    });
  });

  it("selects an option and announces accessibility", async () => {
    const { getByText } = renderWithFormPicker();
    fireEvent.press(getByText("Select..."));
    fireEvent.press(getByText("Option 2"));

    await waitFor(() => {
      expect(getByText("Option 2")).toBeTruthy();
      expect(
        RN.AccessibilityInfo.announceForAccessibility
      ).toHaveBeenCalledWith("Option 2 selecionado");
    });
  });

  it("displays error message if provided", () => {
    const { getByText } = renderWithFormPicker("This is an error");
    expect(getByText("This is an error")).toBeTruthy();
  });
});
