import * as StorageService from "@/services/storage/storageService";
import { act, renderHook } from "@testing-library/react-hooks";
import React from "react";
import { FormProvider, FormValues, useFormContextData } from "./FormContext";

jest.mock("@/services/storage/storageService", () => ({
  getUserMetadata: jest.fn(() => Promise.resolve({})),
  clearFormCache: jest.fn(() => Promise.resolve()),
}));

describe("FormContext", () => {
  it("should initialize with default values", () => {
    const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <FormProvider>{children}</FormProvider>
    );

    const { result } = renderHook(() => useFormContextData(), { wrapper });

    expect(result.current.formData).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(typeof result.current.setFormData).toBe("function");
    expect(typeof result.current.setIsLoading).toBe("function");
    expect(typeof result.current.clearFormCache).toBe("function");
  });

  it("should update formData and isLoading", () => {
    const wrapper: React.FC<React.PropsWithChildren<unknown>> = ({
      children,
    }) => <FormProvider>{children}</FormProvider>;

    const { result } = renderHook(() => useFormContextData(), { wrapper });

    const newFormData: FormValues = {
      name: "Eduardo",
      phone: "123456789",
      balance: "1000",
      month: "October",
    };

    act(() => {
      result.current.setFormData(newFormData);
      result.current.setIsLoading(true);
    });

    expect(result.current.formData).toEqual(newFormData);
    expect(result.current.isLoading).toBe(true);
  });

  it("should call clearFormCache from storage service", async () => {
    const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <FormProvider>{children}</FormProvider>
    );

    const { result } = renderHook(() => useFormContextData(), { wrapper });

    await act(async () => {
      await result.current.clearFormCache();
    });

    expect(StorageService.clearFormCache).toHaveBeenCalled();
  });

  it("should throw error if used outside FormProvider", () => {
    const { result } = renderHook(() => useFormContextData());
    expect(result.error).toEqual(
      new Error("useFormContextData must be used within FormProvider")
    );
  });

  it("should call getUserMetadata on mount", async () => {
    renderHook(() => useFormContextData(), {
      wrapper: ({ children }: React.PropsWithChildren<unknown>) => (
        <FormProvider>{children}</FormProvider>
      ),
    });

    expect(StorageService.getUserMetadata).toHaveBeenCalled();
  });
});
