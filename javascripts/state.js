// This holds the data shared across the whole app
export const state = {
  totalExpense: 0,
  income: 0,
  get balance() {
    return this.income - this.totalExpense;
  },
};

export const totalDisplay = document.querySelector("#total-value");
export const totalLabel = document.querySelector("#total-id");

export function updateGlobalDisplay() {
  if (totalLabel.textContent === "TOTAL") {
    totalDisplay.textContent = `₹${state.totalExpense.toFixed(2)}`;
  } else {
    totalDisplay.textContent = `₹${state.balance.toFixed(2)}`;
  }
}
