import { state, updateGlobalDisplay } from "./state.js";

const incomeInput = document.querySelector(".income-input");
const totalExpenseDisplay = document.querySelector(".total-switched");
const balanceDisplay = document.querySelector(".total-balence");
const submitIncomeBtn = document.querySelector(".switched-submit-button");


const tableBody = document.querySelector(".output-table");
const emptyState = document.querySelector(".empty-state");

// add income to the table 

function addIncome() {
  const incomeAmountInput = document.querySelector('.income-input');
  const incomeAccSelector = document.querySelector('#income-account-selector');
  const incomeCategorySelector = document.querySelector('#income-category-selector');

  // Convert to number immediately
  const incomeAmount = parseFloat(incomeAmountInput.value);
  const account = incomeAccSelector.value;
  const incomeCategory = incomeCategorySelector.value;

  // Validation
  if (!incomeCategory || isNaN(incomeAmount) || incomeAmount <= 0) {
    alert("Please Enter Valid Details");
    return;
  }

  // Update state (Ensure math works correctly)
  state.totalIncome += incomeAmount;
  updateGlobalDisplay();

  // Add to table
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td class="amount-input">${incomeAmount}</td>
    <td><span class="account-badge">${account}</span></td>
    <td><span class="category-badge">${incomeCategory}</span></td>
    <td class="amount-text">₹${incomeAmount.toLocaleString("en-IN")}</td>
    <td>${new Date().toLocaleDateString("en-GB")}</td>
    <td>
      <button class="table-action-btn table-edit-btn" title="Edit">
        <i class="fa-solid fa-pen"></i>
      </button>
      <button class="table-action-btn table-delete-btn" title="Delete">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </td>
  `;
  tableBody.appendChild(newRow);

  // Reset UI
  incomeAmount = "";
  account = "";
  emptyState.style.display = "none";
}

tableBody.addEventListener("click", (e) => {
  const row = e.target.closest("tr");
  if (!row) return;

  // Find the button even if they click the icon inside it
  const deleteBtn = e.target.closest(".table-delete-btn");
  const editBtn = e.target.closest(".table-edit-btn");

  const amount = parseFloat(
    row.querySelector(".amount-text").textContent.replace(/[₹,]/g, "")
  );

  if (deleteBtn) {
    state.totalIncome -= amount; // Fix: use totalIncome
    row.remove();
    updateGlobalDisplay();
    if (tableBody.querySelectorAll("tr").length === 0) {
        emptyState.style.display = "block";
    }
  }

  if (editBtn) {
    // Corrected selectors to match your addIncome logic
    const categoryValue = row.querySelector(".category-badge").textContent;
    
    document.querySelector(".income-input").value = amount;
    document.querySelector("#income-category-selector").value = categoryValue;

    state.totalIncome -= amount; // Fix: use totalIncome
    row.remove();
    updateGlobalDisplay();
  }
});

// Expose to window because of your HTML onclick="getData()"
window.getIncome = addIncome;

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
