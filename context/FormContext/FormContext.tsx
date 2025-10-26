import * as StorageService from "@/services/storage/storageService";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface FormValues {
  name: string;
  phone: string;
  balance: string;
  month: string;
}

interface FormContextData {
  formData: FormValues | null;
  setFormData: (data: FormValues) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  clearFormCache: () => Promise<void>;
}

const FormContext = createContext<FormContextData | null>(null);

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<FormValues | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initializeUserMetadata = async () => {
      const metadata = await StorageService.getUserMetadata();
    };

    initializeUserMetadata();
  }, []);

  const clearFormCache = async (): Promise<void> => {
    await StorageService.clearFormCache();
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        setFormData,
        isLoading,
        setIsLoading,
        clearFormCache,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormContextData() {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error("useFormContextData must be used within FormProvider");
  }

  return context;
}
