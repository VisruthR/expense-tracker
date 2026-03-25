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
    totalAbove.textContent = "TOTAL";
    totalDisplay.textContent = "₹ " + total.toFixed(2);
  });
});

import { totalDisplay } from "./expense.js";
import { total } from "./expense.js";

const totalExpense = document.querySelector(".total-switched");
const submitBtn = document.querySelector(".switched-submit-button");
const balence = document.querySelector(".total-balence");
const income = document.querySelector(".income-input");
const totalAbove = document.querySelector("#total-id");

incomeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    switchView(incomeView);
    totalExpense.textContent = "₹ " + total.toFixed(2);
    if (income.value) {
      balence.textContent = parseFloat(income.value) - total;
      totalDisplay.textContent =
        "₹" + (parseFloat(income.value) - total).toFixed(2);
    }else{
      totalDisplay.textContent = "₹ " + "0.00"
    }
    totalAbove.textContent = "BALENCE";
  });
});

submitBtn.addEventListener("click", () => {
  if (!income.value) alert("Enter your income first")
  balence.textContent = parseFloat(income.value) - total;
  totalDisplay.textContent =
    "₹" + (parseFloat(income.value) - total).toFixed(2);
});
