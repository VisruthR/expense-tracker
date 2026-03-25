import { state, updateGlobalDisplay } from "./state.js";

const incomeInput = document.querySelector(".income-input");
const totalExpenseDisplay = document.querySelector(".total-switched");
const balanceDisplay = document.querySelector(".total-balence");
const submitIncomeBtn = document.querySelector(".switched-submit-button");

export function refreshIncomeUI() {
  state.income = parseFloat(incomeInput.value) || 0;
  totalExpenseDisplay.textContent = `₹${state.totalExpense.toFixed(2)}`;
  balanceDisplay.textContent = `₹${state.balance.toFixed(2)}`;
  updateGlobalDisplay();
}

submitIncomeBtn.addEventListener("click", () => {
  if (!incomeInput.value) {
    alert("Enter your income first");
    return;
  }
  refreshIncomeUI();
});
