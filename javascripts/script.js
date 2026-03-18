function getData(){
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

    if (itemValue == null || categoryValue === "default" || amountValue === "$") 
    {
      alert("Please fill the fields below to enter");
      return;
    }

  const tableBody = document.querySelector("#viewInsertedData");
  // Create the row with badge HTML
  const newRow = `
      <tr>
          <td>${itemValue}</td>
          <td><span class="category-badge">${categoryValue}</span></td>
          <td class="amount-text">₹${amountValue}</td>
          <td>
              <span class="paid-status ${isPaid ? 'status-yes' : 'status-no'}">
                  ${isPaid ? 'YES' : 'NO'}
              </span>
          </td>
          <td>${new Date().toLocaleDateString('en-GB')}</td>
      </tr>
  `;

  tableBody.innerHTML += newRow;
  itemInput.value = "";
  amountInput.value = "";
  paidCheckbox.checked = false;
}
