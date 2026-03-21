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
incomeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    switchView(incomeView);
  });
});
