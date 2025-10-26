export type ApiError = {
  message: string;
  status?: number;
};

export const handleApiError = (response: Response): ApiError | null => {
  if (response.ok) return null;

  let message: string;

  switch (response.status) {
    case 400:
      message = "Verifique os dados e tente novamente.";
      break;
    case 401:
      message = "Não autorizado.";
      break;
    case 422:
      message = "Limite de uso atingido. Tente mais tarde.";
      break;
    case 429:
      message = "Muitas requisições. Aguarde um momento e tente novamente.";
      break;
    case 500:
      message = "Erro no servidor. Tente novamente mais tarde.";
      break;
    case 503:
      message = "Serviço temporariamente indisponível.";
      break;
    default:
      message = `Erro inesperado (${response.status}).`;
  }

  return { message, status: response.status };
};
