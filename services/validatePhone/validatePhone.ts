import { handleApiError } from "../errorHandler/errorHandler";

export const validatePhone = async (phoneNumber: string) => {
  try {
    const response = await fetch(
      `https://phoneintelligence.abstractapi.com/v1/?api_key=${process.env.EXPO_PUBLIC_PHONE_VALIDATION_API_KEY}&phone=${phoneNumber}&country=BR`
    );

    const error = handleApiError(response);
    if (error) {
      return { isValid: false, error };
    }

    const data = await response.json();

    if (!data?.phone_validation) {
      throw new Error("Unexpected API response format.");
    }

    return { isValid: data.phone_validation.is_valid, error: null };
  } catch (err: any) {
    console.error("Erro ao validar telefone:", err);
    return { isValid: false, error: { message: err.message } };
  }
};
