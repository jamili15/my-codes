export const formatCurrency = (
  amount: number | undefined,
  showCurrencySymbol: boolean = true,
  decimalPlaces: number = 2
) => {
  if (amount === undefined || amount === null) return "";

  return new Intl.NumberFormat("en-US", {
    style: showCurrencySymbol ? "currency" : "decimal",
    currency: "PHP",
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(amount);
};
