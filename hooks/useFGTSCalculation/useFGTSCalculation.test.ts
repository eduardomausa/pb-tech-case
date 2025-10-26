import { renderHook } from "@testing-library/react-hooks";
import { useFGTSCalculation } from "./useFGTSCalculation";

describe("useFGTSCalculation", () => {
  it("should return 0 for empty balance", () => {
    const { result } = renderHook(() => useFGTSCalculation(""));
    expect(result.current.balance).toBe(0);
    expect(result.current.result).toBe(0);
  });

  it("should handle string with currency symbol and separators", () => {
    const { result } = renderHook(() => useFGTSCalculation("R$ 1.234,56"));
    expect(result.current.balance).toBe(1234.56);
  });

  it("should calculate result for balance <= 500", () => {
    const { result } = renderHook(() => useFGTSCalculation("400"));
    expect(result.current.result).toBe(200);
  });

  it("should calculate result for 500 < balance <= 1000", () => {
    const { result } = renderHook(() => useFGTSCalculation("800"));
    expect(result.current.result).toBe(370);
  });

  it("should calculate result for 1000 < balance <= 5000", () => {
    const { result } = renderHook(() => useFGTSCalculation("3000"));
    expect(result.current.result).toBe(1050);
  });

  it("should calculate result for 5000 < balance <= 10000", () => {
    const { result } = renderHook(() => useFGTSCalculation("7500"));
    expect(result.current.result).toBe(2150);
  });

  it("should calculate result for 10000 < balance <= 15000", () => {
    const { result } = renderHook(() => useFGTSCalculation("12000"));
    expect(result.current.result).toBe(2950);
  });

  it("should calculate result for 15000 < balance <= 20000", () => {
    const { result } = renderHook(() => useFGTSCalculation("17500"));
    expect(result.current.result).toBe(3650);
  });

  it("should calculate result for balance > 20000", () => {
    const { result } = renderHook(() => useFGTSCalculation("25000"));
    expect(result.current.result).toBe(4150);
  });
});
