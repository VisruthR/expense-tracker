// --- 1. Toggle Button Selection Logic ---
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


// --- 2. Main Logic to Add Transactions ---
function getData() {
    const itemInput = document.querySelector(".item-input");
    const categorySelector = document.querySelector("#category-selector");
    const amountInput = document.querySelector(".amount-input");
    const statusHiddenValue = document.getElementById("paid-status-hidden").value;

    const itemValue = itemInput.value.trim();
    const categoryValue = categorySelector.value;
    const amountValue = amountInput.value;
    const isPaid = statusHiddenValue === "true";

    // Validation
    if (!itemValue || !amountValue || amountValue <= 0) {
        alert("Please provide a valid item name and amount.");
        return;
    }

    const tableBody = document.querySelector("#viewInsertedData");

    // Formatting amount to look professional (e.g., ₹2,000)
    const formattedAmount = parseFloat(amountValue).toLocaleString('en-IN');

    const newRow = `
        <tr>
            <td>${itemValue}</td>
            <td><span class="category-badge">${categoryValue}</span></td>
            <td class="amount-text">₹${formattedAmount}</td>
            <td>
                <span class="paid-status ${isPaid ? 'status-yes' : 'status-no'}">
                    ${isPaid ? 'YES' : 'NO'}
                </span>
            </td>
            <td>${new Date().toLocaleDateString('en-GB')}</td>
        </tr>
    `;

    // Add to table
    tableBody.innerHTML += newRow;

    // --- Reset Form Fields ---
    itemInput.value = "";
    amountInput.value = "";
    // Reset toggle to 'Yes' as default
    setStatus(true);
}