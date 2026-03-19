let total = 0;

// DOM Elements
const btnYes = document.getElementById("btn-yes");
const btnNo = document.getElementById("btn-no");
const hiddenInput = document.getElementById("paid-status-hidden");
const trackerPage = document.querySelector(".input-card");
const indexPage = document.querySelector(".input-card-switched");
const balanceEl = document.querySelector("#switched-balence");
const initialSwitchBtn = document.querySelector(".switch-btn");
const finalSwitchBtn = document.querySelector(".switch-btn-switched");
const budget = document.querySelector("#budget-input");
const submitInfo = document.querySelector("#submit-info-btn");
const headerLabel = document.querySelector(".header-label");
const totalDisplay = document.querySelector("#total-amount");

// --- 1. Toggle Logic ---
function setStatus(isPaid) {
  if (isPaid) {
    btnYes.classList.add("active");
    btnNo.classList.remove("active");
    hiddenInput.value = "true";
  } else {
    btnNo.classList.add("active");
    btnYes.classList.remove("active");
    hiddenInput.value = "false";
  }
}

btnYes.addEventListener("click", () => setStatus(true));
btnNo.addEventListener("click", () => setStatus(false));

// --- 2. Data Entry Logic ---
function getData() {
  const itemInput = document.querySelector(".item-input");
  const categorySelector = document.querySelector("#category-selector");
  const amountInput = document.querySelector(".amount-input");

  const itemValue = itemInput.value.trim();
  const amountValue = parseFloat(amountInput.value);
  const isPaid = hiddenInput.value === "true";

  if (!itemValue || isNaN(amountValue) || amountValue <= 0) {
    alert("Please provide a valid item name and amount.");
    return;
  }

  // Update Total if Paid
  if (isPaid) {
    total += amountValue;
    totalDisplay.textContent = "₹" + total.toFixed(2);
  }

  // Add Row to Table
  const tableBody = document.querySelector("#viewInsertedData");
  const newRow = `
        <tr>
            <td>${itemValue}</td>
            <td><span class="category-badge">${categorySelector.value}</span></td>
            <td class="amount-text">₹${amountValue.toLocaleString("en-IN")}</td>
            <td><span class="paid-status ${isPaid ? "status-yes" : "status-no"}">${isPaid ? "YES" : "NO"}</span></td>
            <td>${new Date().toLocaleDateString("en-GB")}</td>
        </tr>
    `;
  tableBody.innerHTML += newRow;

  // Reset
  itemInput.value = "";
  amountInput.value = "";
  setStatus(true);
}

// --- 3. Switching & Balance Logic ---
function switchPage(pageToShow) {
  trackerPage.style.display = "none";
  indexPage.style.display = "none";
  pageToShow.style.display = "block";
}

function updateBalanceColors(balance) {
  if (!budget.value || balance >= 0) {
    balanceEl.style.color = "var(--success)";
  } else {
    balanceEl.style.color = "var(--danger)";
  }
}

initialSwitchBtn.addEventListener("click", () => {
  switchPage(indexPage);
  headerLabel.textContent = "Balance";
  document.querySelector("#switched-total").textContent = "₹" + total.toFixed(2);

  const currentBalance = parseFloat(budget.value || 0) - total;
  balanceEl.textContent = budget.value ? "₹" + currentBalance.toFixed(2) : "Set Budget First";
  updateBalanceColors(currentBalance);
});

finalSwitchBtn.addEventListener("click", () => {
  switchPage(trackerPage);
  headerLabel.textContent = "Total Spendings";
  totalDisplay.textContent = "₹" + total.toFixed(2);
});

submitInfo.addEventListener("click", () => {
  const currentBalance = parseFloat(budget.value || 0) - total;
  balanceEl.textContent = "₹" + currentBalance.toFixed(2);
  updateBalanceColors(currentBalance);
});