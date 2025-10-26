import { render, waitFor } from "@testing-library/react-native";
import React from "react";

jest.mock("@expo-google-fonts/montserrat", () => ({
  useFonts: jest.fn(() => [true, null]),
  Montserrat_400Regular: "Montserrat_400Regular",
}));

jest.mock("expo-router", () => ({
  Stack: Object.assign(({ children }: any) => <>{children}</>, {
    Screen: ({ children }: any) => <>{children}</>,
  }),
  ErrorBoundary: ({ children }: any) => <>{children}</>,
}));

jest.mock("expo-splash-screen", () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(),
}));

jest.mock("@/context/FormContext/FormContext", () => ({
  FormProvider: ({ children }: any) => <>{children}</>,
}));

import RootLayout from "@/app/_layout";

describe("RootLayout", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders null while fonts are not loaded", () => {
    const { useFonts } = require("@expo-google-fonts/montserrat");
    useFonts.mockReturnValue([false, null]);
    const { toJSON } = render(<RootLayout />);
    expect(toJSON()).toBeNull();
  });

  it("renders layout when fonts are loaded", async () => {
    const { useFonts } = require("@expo-google-fonts/montserrat");
    useFonts.mockReturnValue([true, null]);
    const { UNSAFE_root } = render(<RootLayout />);
    await waitFor(() => expect(UNSAFE_root).toBeTruthy());
  });

  it("throws error if font loading fails", () => {
    const { useFonts } = require("@expo-google-fonts/montserrat");
    useFonts.mockReturnValue([false, new Error("Font load failed")]);
    expect(() => render(<RootLayout />)).toThrow("Font load failed");
  });
});
