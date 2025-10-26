import { handleApiError } from "../errorHandler/errorHandler";
import { validatePhone } from "./validatePhone";

jest.mock("../errorHandler/errorHandler");

describe("validatePhone", () => {
  const mockFetch = jest.fn();
  global.fetch = mockFetch;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return isValid true when phone is valid", async () => {
    const mockResponse = {
      phone_validation: {
        is_valid: true,
      },
    };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });
    (handleApiError as jest.Mock).mockReturnValue(null);

    const result = await validatePhone("5511999999999");

    expect(result).toEqual({
      isValid: true,
      error: null,
    });
  });

  it("should return isValid false when phone is invalid", async () => {
    const mockResponse = {
      phone_validation: {
        is_valid: false,
      },
    };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });
    (handleApiError as jest.Mock).mockReturnValue(null);

    const result = await validatePhone("invalid");

    expect(result).toEqual({
      isValid: false,
      error: null,
    });
  });

  it("should handle API errors", async () => {
    const mockError = { message: "API Error" };
    (handleApiError as jest.Mock).mockReturnValue(mockError);

    const result = await validatePhone("5511999999999");

    expect(result).toEqual({
      isValid: false,
      error: mockError,
    });
  });

  it("should handle unexpected API response format", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}),
    });
    (handleApiError as jest.Mock).mockReturnValue(null);

    const result = await validatePhone("5511999999999");

    expect(result).toEqual({
      isValid: false,
      error: { message: "Unexpected API response format." },
    });
  });

  it("should handle fetch errors", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    const result = await validatePhone("5511999999999");

    expect(result).toEqual({
      isValid: false,
      error: { message: "Network error" },
    });
  });
});
