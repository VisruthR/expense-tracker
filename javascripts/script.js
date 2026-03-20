$(document).ready(function() {
    let transactions = JSON.parse(localStorage.getItem('lorahk_data')) || [];
    
    const colors = {
        Income: '#00e676',
        Expense: '#ff1744',
        General: '#00e5ff',
        Food: '#ffee00',
        Bills: '#ff3864',
        Salary: '#ff9100'
    };

    // Toggle Button Logic (Expense/Income)
    $('.toggle-btn').on('click', function() {
        $('.toggle-btn').removeClass('active');
        $(this).addClass('active');
        
        // Update Submit Button Theme
        const status = $(this).text();
        $('#submit-transaction').css('background-color', colors[status]);
    });

    function render() {
        const filter = $('#filter-stream').val();
        const $list = $('#activity-list');
        $list.empty();
        let balance = 0;

        const filtered = transactions.filter(t => {
            if (filter === 'Income') return t.status === 'Income';
            if (filter === 'Expense') return t.status === 'Expense';
            return true;
        });

        filtered.forEach((t, index) => {
            const isInc = t.status === 'Income';
            balance += isInc ? parseFloat(t.amount) : -parseFloat(t.amount);

            const card = `
                <div class="activity-card" style="border-left: 10px solid ${colors[t.category] || '#000'}">
                    <div>
                        <span class="label-sticker" style="background:${colors[t.category]}">${t.category}</span>
                        <h3 class="m-0">${t.name}</h3>
                    </div>
                    <div class="text-end">
                        <h2 class="m-0 ${isInc ? 'text-success' : 'text-danger'}">${isInc ? '+' : '-'}₹${t.amount}</h2>
                        <button class="delete-btn" onclick="deleteItem(${index})"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                </div>`;
            $list.append(card);
        });

        if (filtered.length === 0) $list.append('<h3 style="text-align:center; opacity:0.3; margin-top:2rem;">No entries found</h3>');
        
        $('#balance-display').text(`₹ ${balance.toFixed(2)}`);
        localStorage.setItem('lorahk_data', JSON.stringify(transactions));
    }

    $('#submit-transaction').on('click', function() {
        const name = $('#entry-name').val();
        const amount = $('#entry-amount').val();
        const category = $('#entry-category').val();
        const status = $('.toggle-btn.active').text();

        if(!name || !amount) return alert("Fill all fields!");

        transactions.unshift({ name, amount, category, status });
        $('#entry-name').val('');
        $('#entry-amount').val('');
        render();
    });

    $('#filter-stream').on('change', render);

    window.deleteItem = (i) => {
        transactions.splice(i, 1);
        render();
    };

    render(); // Initial load
});