import { refreshIncomeUI } from "./income.js";
import { totalLabel, updateGlobalDisplay } from "./state.js";

const expenseView = document.querySelector(".input-card-expense");
const incomeView = document.querySelector(".input-card-income");
const expenseBtns = document.querySelectorAll(".expense-btn");
const incomeBtns = document.querySelectorAll(".income-btn");

function showView(viewName) {
  if (viewName === "expense") {
    expenseView.style.display = "block";
    incomeView.style.display = "none";
    totalLabel.textContent = "TOTAL";
  } else {
    expenseView.style.display = "none";
    incomeView.style.display = "block";
    totalLabel.textContent = "TOTAL";
    refreshIncomeUI();
  }
  updateGlobalDisplay();
}

expenseBtns.forEach((btn) =>
  btn.addEventListener("click", () => showView("expense")),
);
incomeBtns.forEach((btn) =>
  btn.addEventListener("click", () => showView("income")),
);
