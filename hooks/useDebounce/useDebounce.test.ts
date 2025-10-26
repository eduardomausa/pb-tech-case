import { act, renderHook } from "@testing-library/react-native";
import { useDebounce } from "./useDebounce";

describe("useDebounce", () => {
  jest.useFakeTimers();

  it("should return initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("test", 500));
    expect(result.current).toBe("test");
  });

  it("should debounce value updates", () => {
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
