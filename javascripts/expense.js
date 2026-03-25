import { state, updateGlobalDisplay } from "./state.js";

const tableBody = document.querySelector(".output-table");
const emptyState = document.querySelector(".empty-state");

export function addExpense() {
  const itemInput = document.querySelector(".item-input");
  const categorySelector = document.querySelector("#category-selector");
  const amountInput = document.querySelector(".amount-input");

  const name = itemInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (!name || isNaN(amount) || amount <= 0) {
    alert("Please enter valid details.");
    return;
  }

  // Update State
  state.totalExpense += amount;
  updateGlobalDisplay();

  // Add to Table
  const row = document.createElement("tr");
  row.innerHTML = `
    <td class="name-input">${name}</td>
    <td><span class="category-badge">${categorySelector.value}</span></td>
    <td class="amount-text">₹${amount.toLocaleString("en-IN")}</td>
    <td>${new Date().toLocaleDateString("en-GB")}</td>
    <td>
        <button class="table-edit-btn fa-solid fa-edit"></button>
        <button class="table-delete-btn fa-solid fa-trash-can"></button>
    </td>
  `;
  tableBody.appendChild(row);

  // Reset UI
  itemInput.value = "";
  amountInput.value = "";
  emptyState.style.display = "none";
}

// Handle Delete and Edit via Event Delegation
tableBody.addEventListener("click", (e) => {
  const row = e.target.closest("tr");
  if (!row) return;

  const amount = parseFloat(
    row.querySelector(".amount-text").textContent.replace(/[₹,]/g, ""),
  );

  if (e.target.classList.contains("table-delete-btn")) {
    state.totalExpense -= amount;
    row.remove();
    updateGlobalDisplay();
    if (tableBody.children.length === 0) emptyState.style.display = "block";
  }

  if (e.target.classList.contains("table-edit-btn")) {
    document.querySelector(".item-input").value =
      row.querySelector(".name-input").textContent;
    document.querySelector(".amount-input").value = amount;
    // Remove the row so it can be "re-added" after editing
    state.totalExpense -= amount;
    row.remove();
    updateGlobalDisplay();
  }
});

// Expose to window because of your HTML onclick="getData()"
window.getData = addExpense;
