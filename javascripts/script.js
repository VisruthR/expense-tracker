let total = 0;

function getData() {
  // Taking Inserted Values From the Table
  const itemInput = document.querySelector(".item-input");
  const categorySelector = document.querySelector("#category-selector");
  const amountInput = document.querySelector(".amount-input");
  const paidCheckbox = document.querySelector("#paid-check");

  // Storing Values
  const itemValue = itemInput.value;
  const categoryValue = categorySelector.value;
  const amountValue = amountInput.value;
  const isPaid = paidCheckbox.checked;

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
  // Create the row with badge HTML
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
  paidCheckbox.checked = false;
}
