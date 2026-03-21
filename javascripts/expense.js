let total = 0
const totalDisplay = document.querySelector("#total-value")

function getData() {
  const itemInput = document.querySelector(".item-input");
  const categorySelector = document.querySelector("#category-selector");
  const amountInput = document.querySelector(".amount-input");

  const itemValue = itemInput.value.trim();
  const amountValue = parseFloat(amountInput.value);

  if (!itemValue || isNaN(amountValue) || amountValue <= 0) {
    alert("Please provide a valid item name and amount.");
    return;
  }

  // Update Total if Paid

  total += amountValue;
  totalDisplay.textContent = "₹" + total.toFixed(2);

  // Add Row to Table
  const tableBody = document.querySelector(".output-table");
  const newRow = `
        <tr>
            <td>${itemValue}</td>
            <td><span class="category-badge">${categorySelector.value}</span></td>
            <td class="amount-text">₹${amountValue.toLocaleString("en-IN")}</td>
            <td>${new Date().toLocaleDateString("en-GB")}</td>
            <td>
                <button class="table-edit-btn fa-solid fa-edit "></button>
                <button class="table-delete-btn fa-solid fa-trash-can "></button>
            </td>
        </tr>
    `;
  tableBody.innerHTML += newRow;

  // Reset
  itemInput.value = "";
  amountInput.value = "";

	document.querySelector(".empty-state").style.display = "none"

}
