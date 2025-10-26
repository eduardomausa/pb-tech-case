import { ApiError, handleApiError } from "./errorHandler";

describe("handleApiError", () => {
  const createResponse = (ok: boolean, status: number): Response =>
    ({
      ok,
      status,
    } as Response);

  it("should return null when response is ok", () => {
    const response = createResponse(true, 200);
    const result = handleApiError(response);
    expect(result).toBeNull();
  });

  it("should return correct message for 400", () => {
    const response = createResponse(false, 400);
    const result = handleApiError(response) as ApiError;
    expect(result).toEqual({
      message: "Verifique os dados e tente novamente.",
      status: 400,
    });
  });

  it("should return correct message for 401", () => {
    const response = createResponse(false, 401);
    const result = handleApiError(response) as ApiError;
    expect(result).toEqual({
      message: "Não autorizado.",
      status: 401,
    });
  });

  it("should return correct message for 422", () => {
    const response = createResponse(false, 422);
    const result = handleApiError(response) as ApiError;
    expect(result).toEqual({
      message: "Limite de uso atingido. Tente mais tarde.",
      status: 422,
    });
  });

  it("should return correct message for 429", () => {
    const response = createResponse(false, 429);
    const result = handleApiError(response) as ApiError;
    expect(result).toEqual({
      message: "Muitas requisições. Aguarde um momento e tente novamente.",
      status: 429,
    });
  });

  it("should return correct message for 500", () => {
    const response = createResponse(false, 500);
    const result = handleApiError(response) as ApiError;
    expect(result).toEqual({
      message: "Erro no servidor. Tente novamente mais tarde.",
      status: 500,
    });
  });

  it("should return correct message for 503", () => {
    const response = createResponse(false, 503);
    const result = handleApiError(response) as ApiError;
    expect(result).toEqual({
      message: "Serviço temporariamente indisponível.",
      status: 503,
    });
  });

  it("should return default message for unexpected status", () => {
    const response = createResponse(false, 418); // I'm a teapot 🍵
    const result = handleApiError(response) as ApiError;
    expect(result).toEqual({
      message: "Erro inesperado (418).",
      status: 418,
    });
  });
});
