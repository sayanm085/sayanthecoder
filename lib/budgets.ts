export type BudgetCurrency = "INR" | "USD";

export function isBudgetCurrency(value: unknown): value is BudgetCurrency {
  return value === "INR" || value === "USD";
}

export function currencyForCountry(country: string | null): BudgetCurrency {
  return country?.trim().toUpperCase() === "IN" ? "INR" : "USD";
}

// Independent enquiry bands approved by the owner; these are not exchange rates.
export const budgetBands: Record<BudgetCurrency, string[]> = {
  INR: [
    "Under ₹50,000",
    "₹50,000 – ₹1,50,000",
    "₹1,50,000 – ₹5,00,000",
    "₹5,00,000+",
  ],
  USD: ["Under $1,000", "$1,000 – $3,000", "$3,000 – $10,000", "$10,000+"],
};

export function enquiryBudget(currency: BudgetCurrency, value: string): string {
  return budgetBands[currency].includes(value)
    ? `${value} (${currency})`
    : "Let’s discuss";
}
