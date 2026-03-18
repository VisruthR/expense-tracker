let total = 0;

// --- 1. Toggle Button Selection Logic ---
const btnYes = document.getElementById("btn-yes");
const btnNo = document.getElementById("btn-no");
const hiddenInput = document.getElementById("paid-status-hidden");
const trackerPage = document.querySelector(".input-card");
const indexPage = document.querySelector(".input-card-switched");

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

// --- 2. Main Logic to Add Transactions ---
function getData() {
  const itemInput = document.querySelector("#item-input");
  const categorySelector = document.querySelector("#category-selector");
  const amountInput = document.querySelector("#amount-input");
  const statusHiddenValue = document.getElementById("paid-status-hidden").value;

  const itemValue = itemInput.value.trim();
  const categoryValue = categorySelector.value;
  const amountValue = amountInput.value;
  const isPaid = statusHiddenValue === "true";

  if (itemValue === "" || amountValue === "") {
    alert("Please fill the fields below to enter");
    return;
  }

  if (amountValue < 0) {
    alert("Enter a valid amount and continue");
    amountInput.value = "";
    return;
  }

  //getting output table
  const tableBody = document.querySelector("#viewInsertedData");

  // Formatting amount to look professional (e.g., ₹2,000)
  const formattedAmount = parseFloat(amountValue).toLocaleString("en-IN");

  const newRow = `
        <tr>
            <td>${itemValue}</td>
            <td><span class="category-badge">${categoryValue}</span></td>
            <td class="amount-text">₹${formattedAmount}</td>
            <td>
                <span class="paid-status ${isPaid ? "status-yes" : "status-no"}">
                    ${isPaid ? "YES" : "NO"}
                </span>
            </td>
            <td>${new Date().toLocaleDateString("en-GB")}</td>
        </tr>
    `;

  //set total spendings
  if (isPaid) {
    total += Number(amountInput.value);
    document.querySelector("#total-amount").textContent = "₹" + total;
  }

  // Add to table
  tableBody.innerHTML += newRow;

  // --- Reset Form Fields ---
  itemInput.value = "";
  amountInput.value = "";
  // Reset toggle to 'Yes' as default
  setStatus(true);
}

//page switching logic
function switchPage(currentPage) {
  trackerPage.style.display = "none";
  indexPage.style.display = "none";

  currentPage.style.display = "block";
}


const balanceEl = document.querySelector("#switched-balence");
const initialSwitchBtn = document.querySelector(".switch-btn");
const finalSwitchBtn = document.querySelector(".switch-btn-switched");
const budget = document.querySelector("#budget-input");
const submitInfo = document.querySelector("#submit-info-btn");
const headerLabel = document.querySelector(".header-label");

function updateBalanceColors(balance) {
  if (!budget.value || balance >= 0) {
    balanceEl.style.backgroundColor = "rgba(16, 185, 129, 0.05)";
    balanceEl.style.border = "1px solid rgba(16, 185, 129, 0.2)";
    balanceEl.style.color = "var(--success)";
  } else {
    balanceEl.style.backgroundColor = "rgba(239, 68, 68, 0.05)";
    balanceEl.style.border = "1px solid rgba(239, 68, 68, 0.2)";
    balanceEl.style.color = "var(--danger)";
  }
}

initialSwitchBtn.addEventListener("click", () => {
  switchPage(indexPage);

  const currentBalance = parseFloat(budget.value || 0) - total;

  document.querySelector("#switched-total").textContent = "₹" + total;
  headerLabel.textContent = "Balence";

  if (budget.value) {
    balanceEl.textContent = "₹" + currentBalance;
    document.querySelector("#total-amount").textContent = "₹" + currentBalance;
  } else {
    document.querySelector("#total-amount").textContent = "₹" + "0.00";
    balanceEl.textContent = "";
  }

  updateBalanceColors(currentBalance)

});

finalSwitchBtn.addEventListener("click", () => {
  switchPage(trackerPage);
  headerLabel.textContent = "Total Spendings";
  if (!total) {
    document.querySelector("#total-amount").textContent = "₹" + "0.00";
  } else {
    document.querySelector("#total-amount").textContent = "₹" + total;
  }
});

submitInfo.addEventListener("click", () => {
  const currentBalance = parseFloat(budget.value || 0) - total;

  balanceEl.textContent = "₹" + currentBalance;
  document.querySelector("#total-amount").textContent = "₹" + currentBalance;

  updateBalanceColors(currentBalance)
});