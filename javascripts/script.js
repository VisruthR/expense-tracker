const date = new Date().toLocaleDateString("en-GB");

function getData() {
  //taking values
  let item = document.querySelector(".item-input");
  let category = document.querySelector("#category-selector");
  let amount = document.querySelector(".amount-input");

  // storing values
  let itemValue = item.value;
  let categoryValue = category.value;
  let amountValue = amount.value;

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

  //updating output table
  tableBody.innerHTML += `<tr>
    <td>${itemValue}</td>
    <td>${categoryValue}</td>
    <td>$${amountValue}</td>
    <td>${date}</td>
    </tr>`;

  //clearing the input box
  item.value = "";
  category.value = "default";
  amount.value = "";
}