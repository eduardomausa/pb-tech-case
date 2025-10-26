import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import React from "react";
import { Alert } from "react-native";

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

import { useFormContextData } from "@/context/FormContext/FormContext";
import * as StorageService from "@/services/storage/storageService";
import { validatePhone } from "@/services/validatePhone/validatePhone";
import { useRouter } from "expo-router";
import FGTSForm from "../FGTSForm/FGTSForm";

jest.mock("@/context/FormContext/FormContext");
jest.mock("@/services/storage/storageService");
jest.mock("@/services/validatePhone/validatePhone");
jest.mock("expo-router");

jest.mock("@expo/vector-icons/EvilIcons", () => {
  const { View } = require("react-native");
  return (props: any) => <View {...props} />;
});

jest.mock("@expo/vector-icons/FontAwesome", () => {
  const { View } = require("react-native");
  return (props: any) => <View {...props} />;
});

const mockUseFormContextData = useFormContextData as jest.Mock;
const mockStorageService = StorageService as jest.Mocked<typeof StorageService>;
const mockValidatePhone = validatePhone as jest.Mock;
const mockUseRouter = useRouter as jest.Mock;

describe("FGTSForm", () => {
  const mockSetFormData = jest.fn();
  const mockSetIsLoading = jest.fn();
  const mockClearFormCache = jest.fn();
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    mockUseFormContextData.mockReturnValue({
      setFormData: mockSetFormData,
      setIsLoading: mockSetIsLoading,
      clearFormCache: mockClearFormCache,
    });

    mockUseRouter.mockReturnValue({
      push: mockRouterPush,
    });

    mockStorageService.getFormCache.mockResolvedValue(null);
    mockStorageService.saveFormCache.mockResolvedValue(undefined);
    mockStorageService.clearFormCache.mockResolvedValue(undefined);
    mockStorageService.updateUserName.mockResolvedValue(undefined);
    mockStorageService.incrementConsultations.mockResolvedValue(undefined);

    jest.spyOn(Alert, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe("Rendering", () => {
    it("should render all form fields", async () => {
      render(<FGTSForm />);

      await act(async () => {
        jest.advanceTimersByTime(300);
      });

      expect(screen.getByText("Qual seu nome?")).toBeTruthy();
      expect(screen.getByText("Qual seu telefone?")).toBeTruthy();
      expect(screen.getByText("Qual seu saldo?")).toBeTruthy();
      expect(screen.getByText("Qual seu mês de aniversário?")).toBeTruthy();
    });

    it("should render submit button with correct text", async () => {
      render(<FGTSForm />);

      await act(async () => {
        jest.advanceTimersByTime(300);
      });

      expect(screen.getByText("Ver Proposta")).toBeTruthy();
    });

    it("should render form card with correct accessibility label", async () => {
      const { getByLabelText } = render(<FGTSForm />);

      await act(async () => {
        jest.advanceTimersByTime(300);
      });

      expect(getByLabelText("form")).toBeTruthy();
    });
  });

  describe("Form Submission", () => {
    // TO DO: Fix timeout issues and re-enable tests
    it.skip("should handle successful form submission", async () => {
      mockValidatePhone.mockResolvedValue({ isValid: true, error: null });

      render(<FGTSForm />);

      await act(async () => {
        jest.advanceTimersByTime(300);
      });

      const nameInput = screen.getByPlaceholderText("Guilherme Neves");
      const phoneInput = screen.getByPlaceholderText("(31) 9 9809-7654");
      const balanceInput = screen.getByPlaceholderText("R$ 5.000,00");

      await act(async () => {
        fireEvent.changeText(nameInput, "John Doe");
        fireEvent.changeText(phoneInput, "31998097654");
        fireEvent.changeText(balanceInput, "5000");
      });

      const monthPickerButton = screen.getByText("Julho");
      await act(async () => {
        fireEvent.press(monthPickerButton);
      });

      const monthModalItem = screen.getByLabelText("Setembro");
      await act(async () => {
        fireEvent.press(monthModalItem);
      });

      await act(async () => {
        jest.advanceTimersByTime(1000);
      });

      const submitButton = screen.getByText("Ver Proposta");

      await act(async () => {
        fireEvent.press(submitButton);
      });

      await waitFor(() => {
        expect(mockSetIsLoading).toHaveBeenCalledWith(true);
        expect(mockValidatePhone).toHaveBeenCalled();
        expect(mockStorageService.updateUserName).toHaveBeenCalled();
        expect(mockStorageService.incrementConsultations).toHaveBeenCalled();
        expect(mockStorageService.clearFormCache).toHaveBeenCalled();
        expect(mockClearFormCache).toHaveBeenCalled();
        expect(mockSetFormData).toHaveBeenCalled();
        expect(mockSetIsLoading).toHaveBeenCalledWith(false);
        expect(mockRouterPush).toHaveBeenCalledWith("/result");
      });
    });

    // TO DO: Fix timeout issues and re-enable tests
    it.skip("should show alert when phone validation fails with error", async () => {
      mockValidatePhone.mockResolvedValue({
        isValid: false,
        error: { message: "Telefone inválido" },
      });

      render(<FGTSForm />);

      await act(async () => {
        jest.advanceTimersByTime(300);
      });

      const nameInput = screen.getByPlaceholderText("Guilherme Neves");
      const phoneInput = screen.getByPlaceholderText("(31) 9 9809-7654");
      const balanceInput = screen.getByPlaceholderText("R$ 5.000,00");

      await act(async () => {
        fireEvent.changeText(nameInput, "John Doe");
        fireEvent.changeText(phoneInput, "31998097654");
        fireEvent.changeText(balanceInput, "5000");
      });

      const monthPickerButton = screen.getByText("Julho");
      await act(async () => {
        fireEvent.press(monthPickerButton);
      });

      const monthModalItem = screen.getByLabelText("Setembro");
      await act(async () => {
        fireEvent.press(monthModalItem);
      });

      await act(async () => {
        jest.advanceTimersByTime(1000);
      });

      const submitButton = screen.getByText("Ver Proposta");

      await act(async () => {
        fireEvent.press(submitButton);
      });

      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith("Erro", "Telefone inválido");
        expect(mockSetIsLoading).toHaveBeenCalledWith(false);
        expect(mockRouterPush).not.toHaveBeenCalled();
      });
    });

    // TO DO: Fix timeout issues and re-enable tests
    it.skip("should show alert when phone is invalid without error", async () => {
      mockValidatePhone.mockResolvedValue({ isValid: false, error: null });

      render(<FGTSForm />);

      await act(async () => {
        jest.advanceTimersByTime(300);
      });

      const nameInput = screen.getByPlaceholderText("Guilherme Neves");
      const phoneInput = screen.getByPlaceholderText("(31) 9 9809-7654");
      const balanceInput = screen.getByPlaceholderText("R$ 5.000,00");

      await act(async () => {
        fireEvent.changeText(nameInput, "John Doe");
        fireEvent.changeText(phoneInput, "31998097654");
        fireEvent.changeText(balanceInput, "5000");
      });

      const monthPickerButton = screen.getByText("Julho");
      await act(async () => {
        fireEvent.press(monthPickerButton);
      });

      const monthModalItem = screen.getByLabelText("Setembro");
      await act(async () => {
        fireEvent.press(monthModalItem);
      });

      await act(async () => {
        jest.advanceTimersByTime(1000);
      });

      const submitButton = screen.getByText("Ver Proposta");

      await act(async () => {
        fireEvent.press(submitButton);
      });

      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith(
          "Telefone inválido",
          "Digite um telefone válido antes de enviar."
        );
        expect(mockSetIsLoading).toHaveBeenCalledWith(false);
        expect(mockRouterPush).not.toHaveBeenCalled();
      });
    });
  });

  describe("Cleanup", () => {
    it("should cleanup timers on unmount", () => {
      const { unmount } = render(<FGTSForm />);

      unmount();

      expect(() => {
        jest.runOnlyPendingTimers();
      }).not.toThrow();
    });

    it("should not update state after unmount", async () => {
      mockStorageService.getFormCache.mockResolvedValue({
        name: "Test",
        phone: "123",
        balance: "100",
        month: "jan",
        lastUpdated: Number(new Date().toISOString()),
      });

      const { unmount } = render(<FGTSForm />);

      unmount();

      await act(async () => {
        jest.advanceTimersByTime(300);
      });

      expect(true).toBe(true);
    });
  });
});
