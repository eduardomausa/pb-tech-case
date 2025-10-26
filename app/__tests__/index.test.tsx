import HomeScreen from "@/app/index";
import { useFormContextData } from "@/context/FormContext/FormContext";
import { render, screen } from "@testing-library/react-native";
import React from "react";

jest.mock("@/context/FormContext/FormContext", () => ({
  useFormContextData: jest.fn(),
}));

describe("HomeScreen", () => {
  it("renders all components correctly", () => {
    (useFormContextData as jest.Mock).mockReturnValue({
      formData: { name: "Eduardo Mausa", balance: "5000" },
    });
    render(<HomeScreen />);

    expect(screen.getByText("Antecipe seu\nSaque-Aniversário")).toBeTruthy();
    expect(screen.getByText("Ver Proposta")).toBeTruthy();
  });
});
