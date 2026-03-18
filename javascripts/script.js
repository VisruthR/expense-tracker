let total = 0;
const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
const hiddenInput = document.getElementById('paid-status-hidden');

function setStatus(isPaid) {
  if (isPaid) {
    btnYes.classList.add('active');
    btnNo.classList.remove('active');
    hiddenInput.value = "true";
  } else {
    btnNo.classList.add('active');
    btnYes.classList.remove('active');
    hiddenInput.value = "false";
  }
}

btnYes.addEventListener('click', () => setStatus(true));
btnNo.addEventListener('click', () => setStatus(false));


function getData() {
  // Fetching Inserted Value
  const itemInput = document.querySelector(".item-input");
  const categorySelector = document.querySelector("#category-selector");
  const amountInput = document.querySelector(".amount-input");
  const statusHiddenValue = document.getElementById("paid-status-hidden").value;

  // Storing Values
  const itemValue = itemInput.value.trim();
  const categoryValue = categorySelector.value;
  const amountValue = amountInput.value;
  const isPaid = statusHiddenValue === "true";

  // Validation
  if (!itemValue || !amountValue || amountValue <= 0) {
    alert("Please provide a valid item name and amount.");
    return;
  }

  //getting output table
  const tableBody = document.querySelector("#viewInsertedData");
  const formattedAmount = parseFloat(amountValue).toLocaleString('en-IN');
  const newRow = `
      <tr>
          <td>${itemValue}</td>
          <td><span class="category-badge">${categoryValue}</span></td>
          <td class="amount-text">₹${amountValue}</td>
          <td>
              <span class="paid-status ${isPaid ? "status-yes" : "status-no"}">
                  ${isPaid ? "YES" : "NO"}
              </span>
          </td>
          <td>${new Date().toLocaleDateString("en-GB")}</td>
      </tr>
  `;

  //displaying the total expenditure
  if (paidCheckbox.checked == true) {
    total += Number(amountInput.value);
    document.querySelector("#total-amount").textContent = "₹" + total;
  }

  //clearing the input boxes
  tableBody.innerHTML += newRow;
  itemInput.value = "";
  amountInput.value = "";
  setStatus(true);
}