function getData() {
  //taking values
  let item = document.querySelector(".item-input");
  let category = document.querySelector("#category-selector");
  let amount = document.querySelector(".amount-input");

  // storing values
  let itemValue = item.value;
  let categoryValue = category.value;
  let amountValue = amount.value;

  if (itemValue == null || categoryValue === "default" || amountValue === "$") {
    alert("Please fill the fields below to enter");
    return;
  }

  const tableBody = document.querySelector("#viewInsertedData");

  tableBody.innerHTML += `<tr>
    <td>${itemValue}</td>
    <td>${categoryValue}</td>
    <td>$${amountValue}</td>
    </tr>`;
}
