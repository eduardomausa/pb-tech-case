import { render } from "@testing-library/react-native";
import React from "react";
import InfoSection from "./InfoSection";

describe("InfoSection", () => {
  const props = {
    title: "Eduardo",
    subtitle: "Seu saldo disponível",
    info: "Valor liberado para saque",
    formattedResult: "R$ 1.000,00",
  };

  it("renders all texts correctly", () => {
    const { getByText } = render(<InfoSection {...props} />);

    expect(getByText(props.title)).toBeTruthy();
    expect(getByText(props.subtitle)).toBeTruthy();
    expect(getByText(props.formattedResult)).toBeTruthy();
    expect(getByText(props.info)).toBeTruthy();
  });

  it("has correct accessibility labels", () => {
    const { getByLabelText } = render(<InfoSection {...props} />);

    expect(getByLabelText(`Olá, ${props.title}!`)).toBeTruthy();
    expect(getByLabelText(props.subtitle)).toBeTruthy();
    expect(getByLabelText(props.formattedResult)).toBeTruthy();
    expect(getByLabelText(props.info)).toBeTruthy();
  });

  it("has correct accessibility roles", () => {
    const { getByLabelText } = render(<InfoSection {...props} />);

    expect(getByLabelText(`Olá, ${props.title}!`).props.accessibilityRole).toBe(
      "text"
    );
    expect(getByLabelText(props.subtitle).props.accessibilityRole).toBe("text");
    expect(getByLabelText(props.formattedResult).props.accessibilityRole).toBe(
      "text"
    );
    expect(getByLabelText(props.info).props.accessibilityRole).toBe("text");
  });
});
