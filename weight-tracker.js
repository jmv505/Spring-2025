document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('weight-form');
    const weightTable = document.getElementById('weight-table');
    const weightGraph = document.getElementById('weight-graph');
    const clearBtn = document.getElementById('clear-weight-data');
    const msg = document.getElementById('weight-message');

    // Chart.js initialization
    let weightChart = null;
    function initChart() {
        // Set canvas width/height to match display size for sharpness
        const parent = weightGraph.parentElement;
        let displayWidth = parent ? parent.offsetWidth : 600;
        let displayHeight = 340;
        weightGraph.width = displayWidth;
        weightGraph.height = displayHeight;
        const ctx = weightGraph.getContext('2d');
        weightChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Weight (lbs)',
                    data: [],
                    borderColor: '#1976d2',
                    tension: 0.1,
                    fill: false
                }]
            },
            options: {
                responsive: false,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    }

    // Load saved weight entries
    let weightEntries = JSON.parse(localStorage.getItem('weightEntries')) || [];

    function saveAndRender() {
        // Save to localStorage
        localStorage.setItem('weightEntries', JSON.stringify(weightEntries));

        // Update table
        const tbody = weightTable.querySelector('tbody');
        tbody.innerHTML = '';
        function formatDate(dateStr) {
            const d = new Date(dateStr);
            const mm = String(d.getMonth() + 1).padStart(2, '0');
            const dd = String(d.getDate()).padStart(2, '0');
            const yyyy = d.getFullYear();
            return `${mm}/${dd}/${yyyy}`;
        }
        weightEntries.forEach(entry => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${formatDate(entry.date)}</td><td>${entry.weight.toFixed(1)}</td>`;
            tbody.appendChild(row);
        });

        // Update graph
        weightChart.data.labels = weightEntries.map(e => formatDate(e.date));
        weightChart.data.datasets[0].data = weightEntries.map(e => e.weight);
        weightChart.update();

        // Show table and graph if there are entries
        weightTable.style.display = weightEntries.length > 0 ? 'table' : 'none';
        weightGraph.style.display = weightEntries.length > 0 ? 'block' : 'none';
    }

    // Form submission
    if (form) {
        form.onsubmit = function (e) {
            e.preventDefault();
            msg.textContent = '';
            const date = document.getElementById('weight-date').value;
            const weight = parseFloat(document.getElementById('weight-value').value);
            if (!date || isNaN(weight) || weight <= 0) {
                msg.textContent = 'Please enter a valid date and weight.';
                return;
            }
            if (weightEntries.some(e => e.date === date)) {
                msg.textContent = 'Entry for this date already exists.';
                return;
            }
            weightEntries.push({ date, weight });
            weightEntries.sort((a, b) => new Date(a.date) - new Date(b.date));
            saveAndRender();
            showProgressPopup();
            form.reset();
        };
    }
    // Show progress popup after each entry if at least 2 entries
    function showProgressPopup() {
        if (weightEntries.length < 2) return;
        const last = weightEntries[weightEntries.length - 1];
        const prev = weightEntries[weightEntries.length - 2];
        let message = '';
        if (last.weight < prev.weight) {
            message = "Congratulations! You're showing progress!";
        } else if (last.weight > prev.weight) {
            message = "You gained weight. Stay motivated!";
        } else {
            message = "No change in weight. Keep going!";
        }
        const popup = document.createElement('div');
        popup.className = 'weight-progress-popup';
        popup.innerHTML = `<div class="popup-content">${message}<br><button class="close-popup">Close</button></div>`;
        document.body.appendChild(popup);
        popup.querySelector('.close-popup').onclick = () => popup.remove();
    }

    // Clear all data
    if (clearBtn) {
        clearBtn.onclick = function () {
            if (confirm('Are you sure you want to clear all weight data?')) {
                weightEntries = [];
                saveAndRender();
                msg.textContent = 'All weight data cleared.';
            }
        };
    }

    // Initialize
    initChart();
    saveAndRender();
});