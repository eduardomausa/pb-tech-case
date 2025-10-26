import ResultScreen from "@/app/result";
import { useFormContextData } from "@/context/FormContext/FormContext";
import { useFGTSCalculation } from "@/hooks/useFGTSCalculation/useFGTSCalculation";
import { render } from "@testing-library/react-native";
import React from "react";

jest.mock("@/context/FormContext/FormContext", () => ({
  useFormContextData: jest.fn(),
}));

jest.mock("@/hooks/useFGTSCalculation/useFGTSCalculation", () => ({
  useFGTSCalculation: jest.fn(),
}));

jest.mock("@/assets/images/background-img.png", () => 1);

describe("ResultScreen", () => {
  it("renders correctly with given formData and calculation", () => {
    (useFormContextData as jest.Mock).mockReturnValue({
      formData: { name: "Eduardo Mausa", balance: "5000" },
    });

    (useFGTSCalculation as jest.Mock).mockReturnValue({
      result: 2500,
    });

    const { getByText } = render(<ResultScreen />);

    expect(getByText("Olá, Eduardo!")).toBeTruthy();
    expect(getByText("Você pode receber até")).toBeTruthy();
    expect(getByText("R$ 2.500,00")).toBeTruthy();
    expect(
      getByText(
        "*Esta simulação traz valores aproximados. Para calcular o valor exato, entre em contato com o Smile Co. ou consulte seu saldo no app do FGTS."
      )
    ).toBeTruthy();
  });

  it("handles missing formData gracefully", () => {
    (useFormContextData as jest.Mock).mockReturnValue({ formData: undefined });
    (useFGTSCalculation as jest.Mock).mockReturnValue({ result: 0 });

    const { getByText } = render(<ResultScreen />);

    expect(getByText("Olá, undefined!")).toBeTruthy();
    expect(getByText("R$ 0,00")).toBeTruthy();
  });

  it("formats result correctly for different values", () => {
    (useFormContextData as jest.Mock).mockReturnValue({
      formData: { name: "Maria Silva", balance: "10000" },
    });
    (useFGTSCalculation as jest.Mock).mockReturnValue({ result: 5000.5 });

    const { getByText } = render(<ResultScreen />);
    expect(getByText("Olá, Maria!")).toBeTruthy();
    expect(getByText("R$ 5.000,50")).toBeTruthy();
  });
});
