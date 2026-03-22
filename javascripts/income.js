const expenseView = document.querySelector(".input-card-expense");
const incomeView = document.querySelector(".input-card-income");

const expenseBtns = document.querySelectorAll(".expense-btn");
const incomeBtns = document.querySelectorAll(".income-btn");

function switchView(currentView) {
  expenseView.style.display = "none";
  incomeView.style.display = "none";

  currentView.style.display = "block";
}

expenseBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    switchView(expenseView);
  });
});

import { totalDisplay } from "./expense.js";
import { total } from "./expense.js";

const totalExpense = document.querySelector(".total-switched");
const submitBtn = document.querySelector(".switched-submit-button");
const balence = document.querySelector(".total-balence");
const income = document.querySelector(".income-input");

incomeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    switchView(incomeView);
    totalExpense.textContent = totalDisplay.textContent;
    if (income.value) {
      balence.textContent = parseFloat(income.value) - total;
    }
  });
});

submitBtn.addEventListener("click", () => {
  balence.textContent = parseFloat(income.value) - total;
});
