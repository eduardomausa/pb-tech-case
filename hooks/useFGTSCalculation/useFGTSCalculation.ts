import { useMemo } from "react";

export function useFGTSCalculation(balance: string) {
  const numericBalance = useMemo(() => {
    if (!balance) return 0;
    const clean = balance.replace(/[^\d,]/g, "").replace(",", ".");
    return parseFloat(clean);
  }, [balance]);

  const result = useMemo(() => {
    const b = numericBalance;

    if (b <= 500) return b * 0.5;
    if (b <= 1000) return b * 0.4 + 50;
    if (b <= 5000) return b * 0.3 + 150;
    if (b <= 10000) return b * 0.2 + 650;
    if (b <= 15000) return b * 0.15 + 1150;
    if (b <= 20000) return b * 0.1 + 1900;
    return b * 0.05 + 2900;
  }, [numericBalance]);

  return {
    result,
    balance: numericBalance,
  };
}
