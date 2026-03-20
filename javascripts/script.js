// ... [Keep your loadTransactions and calculateTotals functions from before] ...

function renderTransactions() {
  const filterValue = $('#filter-type').val();
  const $activityList = $('#activity-list');
  $activityList.empty();

  const filtered = transactions.filter(t => {
    if (filterValue === 'expense') return !t.isIncome;
    if (filterValue === 'income') return t.isIncome;
    return true;
  });

  if (filtered.length === 0) {
    $activityList.append('<div class="text-center p-5 opacity-50">No activity yet. Time to spend?</div>');
    return;
  }

  filtered.forEach(t => {
    const amountDisplay = t.isIncome ? `+₹${t.amount}` : `-₹${t.amount}`;
    const colorClass = t.isIncome ? 'text-success' : 'text-danger';
    const icon = t.isIncome ? 'bi-plus-circle' : 'bi-dash-circle';

    const card = `
            <div class="activity-card">
                <div class="d-flex align-items-center">
                    <div class="me-3 fs-3 ${colorClass}"><i class="bi ${icon}"></i></div>
                    <div>
                        <h6 class="m-0 fw-bold">${t.name}</h6>
                        <span class="badge bg-dark border border-secondary" style="font-size: 0.6rem;">${t.category}</span>
                    </div>
                </div>
                <div class="text-end">
                    <h5 class="m-0 fw-bold ${colorClass}">${amountDisplay}</h5>
                    <div class="mt-2">
                        <i class="bi bi-pencil-square me-2 opacity-50 edit-icon" data-id="${t.id}" role="button"></i>
                        <i class="bi bi-trash3 text-danger opacity-50 delete-icon" data-id="${t.id}" role="button"></i>
                    </div>
                </div>
            </div>
        `;
    $activityList.append(card);
  });
}


let myChart;

// Initialize Chart.js
function updateChart() {
  const ctx = document.getElementById('expenseChart').getContext('2d');

  // Group totals by category
  const categories = [...new Set(transactions.map(t => t.category))];
  const data = categories.map(cat => {
    return transactions
      .filter(t => t.category === cat && !t.isIncome)
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
  });

  if (myChart) myChart.destroy();

  myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: categories,
      datasets: [{
        data: data,
        backgroundColor: ['#38bdf8', '#818cf8', '#c084fc', '#fb7185', '#34d399'],
        borderWidth: 0,
        hoverOffset: 10
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      cutout: '80%'
    }
  });
}

// Search Logic
$('#main-search').on('input', function () {
  const query = $(this).val().toLowerCase();
  renderTransactions(query);
});

// Update render function to accept search
function renderTransactions(searchQuery = "") {
  const filterValue = $('#filter-type').val();
  const $activityList = $('#activity-list');
  $activityList.empty();

  const filtered = transactions.filter(t => {
    const matchesFilter = (filterValue === 'all' || (filterValue === 'expense' ? !t.isIncome : t.isIncome));
    const matchesSearch = t.name.toLowerCase().includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  // ... loop through filtered and append activity cards (from previous design) ...

  updateChart(); // Update visual insights whenever list changes
}