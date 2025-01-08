function getInput() {
    const name = document.getElementById("name").value;
    const priority = document.getElementById("priority").value;
    const status = document.getElementById("status").value;

    if (name.trim() === '' || priority.trim() === '' || status.trim() === '') {
        alert('Please fill out all fields.');
        return;
    }

    const tableBody = document.getElementById('table').querySelector('tbody');
    const newRow = tableBody.insertRow();

    const nameCell = newRow.insertCell(0);
    const statusCell = newRow.insertCell(1);
    const priorityCell = newRow.insertCell(2);
    const delCell = newRow.insertCell(3);

    const delBtn = document.createElement('button');
    delBtn.innerHTML = '<i class="fas fa-trash"></i>';
    delBtn.className = 'dbtn';
    delBtn.onclick = function () {
        deleteRow(newRow, status);
        updateTaskCounts();
    };

    function deleteRow(row, status) {
        row.remove();
        if (status === "Completed") {
            completedCount -= 1;
        } else if (status === "Pending") {
            pendingCount -= 1;
        }
        updateTaskCounts();
    }

    delCell.appendChild(delBtn);
    nameCell.textContent = name;
    statusCell.textContent = status;
    priorityCell.textContent = priority;

    document.getElementById('name').value = '';
    document.getElementById('status').value = '';
    document.getElementById('priority').value = '';

    if (status === "Completed") {
        completedCount += 1;
    } else if (status === "Pending") {
        pendingCount += 1;
    }

    updateTaskCounts();
}

let completedCount = 0;
let pendingCount = 0;

function updateTaskCounts() {
    const tableBody = document.getElementById('table').querySelector('tbody');
    const rowCount = tableBody.rows.length;
    document.getElementById('count').textContent = rowCount - 1;
    document.getElementById('completed').textContent = completedCount;
    document.getElementById('pending').textContent = pendingCount;
}