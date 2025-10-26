import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { useForm } from "react-hook-form";
import { FormInput } from "./FormInput";

type TestFormValues = {
  testField: string;
};

describe("FormInput", () => {
  it("renders label and input correctly", () => {
    const TestComponent = () => {
      const { control } = useForm<TestFormValues>({
        defaultValues: { testField: "" },
      });
      return (
        <FormInput<TestFormValues>
          name="testField"
          label="Test Label"
          placeholder="Type here"
          control={control}
        />
      );
    };

    const { getByText, getByLabelText } = render(<TestComponent />);
    expect(getByText("Test Label")).toBeTruthy();
    expect(getByLabelText("Test Label")).toBeTruthy();
  });

  it("updates value when typing in TextInput", () => {
    const TestComponent = () => {
      const { control } = useForm<TestFormValues>({
        defaultValues: { testField: "" },
      });
      return (
        <FormInput<TestFormValues>
          name="testField"
          label="Test Input"
          control={control}
        />
      );
    };

    const { getByLabelText } = render(<TestComponent />);
    const input = getByLabelText("Test Input");
    fireEvent.changeText(input, "Hello");
    expect(input.props.value).toBe("Hello");
  });

  it("calls onUnmaskedValueChange when typing in MaskInput", () => {
    const mockUnmaskedChange = jest.fn();
    const mask = [/\d/, /\d/, "/", /\d/, /\d/]; // e.g., 12/34

    const TestComponent = () => {
      const { control } = useForm<TestFormValues>({
        defaultValues: { testField: "" },
      });
      return (
        <FormInput<TestFormValues>
          name="testField"
          label="Masked"
          mask={mask}
          onUnmaskedValueChange={mockUnmaskedChange}
          control={control}
        />
      );
    };

    const { getByLabelText } = render(<TestComponent />);
    const input = getByLabelText("Masked");
    fireEvent.changeText(input, "12/34", "1234");
    expect(mockUnmaskedChange).toHaveBeenCalledWith("1234");
  });

  it("displays error message if error prop is passed", () => {
    const errorMessage = "This field is required";

    const TestComponent = () => {
      const { control } = useForm<TestFormValues>({
        defaultValues: { testField: "" },
      });
      return (
        <FormInput<TestFormValues>
          name="testField"
          error={errorMessage}
          control={control}
        />
      );
    };

    const { getByText } = render(<TestComponent />);
    expect(getByText(errorMessage)).toBeTruthy();
  });
});
