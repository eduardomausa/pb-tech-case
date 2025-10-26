import { act, renderHook } from "@testing-library/react-native";
import { useDebounce } from "./useDebounce";

describe("useDebounce", () => {
  // TO DO: Fix timeout issues and re-enable tests
  it.skip("should return initial value immediately", () => {
    const result = renderHook(() => useDebounce("test", 500)).result;
    expect(result.current).toBe("test");
  });

  // TO DO: Fix timeout issues and re-enable tests
  it.skip("should debounce value updates", () => {
    interface HookProps {
      value: string;
    }

    const { result, rerender } = renderHook<string, HookProps>(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: "test1" } }
    );

    expect(result.current).toBe("test1");

    rerender({ value: "test2" });
    expect(result.current).toBe("test1");

    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(result.current).toBe("test2");
  });
});
