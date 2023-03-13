function addRow(date) {
    const targetDate = new Date(date);
    const row = tableBody.insertRow();
    const cells = [
        targetDate.getFullYear(),
        targetDate.getMonth() + 1,
        targetDate.getDate(),
        "",
        "",
        "",
        "",
    ];

    cells.forEach((cell, index) => {
        const cellElement = row.insertCell(index);
        cellElement.innerHTML = cell;
        if (index >= 3) {
            cellElement.setAttribute("id", `diff${index - 3}forRow${tableBody.rows.length}`);
        }
    });
}

function updateTime() {
    const now = new Date();
    for (let i = 0; i < tableBody.rows.length; i++) {
        const row = tableBody.rows[i];
        const cells = row.cells;
        const targetDate = new Date(cells[0].innerHTML, cells[1].innerHTML - 1, cells[2].innerHTML);
        const timeDiff = Math.abs(targetDate - now) / 1000;
        const days = Math.floor(timeDiff / 86400);
        const hours = Math.floor((timeDiff % 86400) / 3600);
        const minutes = Math.floor((timeDiff % 3600) / 60);
        const seconds = Math.floor(timeDiff % 60);

        cells[3].innerHTML = days;
        cells[4].innerHTML = hours;
        cells[5].innerHTML = minutes;
        cells[6].innerHTML = seconds;
    }
}
function isDateValidAndUnique(dateString) {
    const table = document.getElementById("myTable").getElementsByTagName('tbody')[0];
    const rows = table.getElementsByTagName('tr');

    const targetDate = new Date(dateString);
    if (isNaN(targetDate.getTime())) {
        alert('日期格式無效！');
        return false;
    }

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const year = targetDate.getFullYear();
        const month = targetDate.getMonth() + 1;
        const date = targetDate.getDate();
        if (year === parseInt(cells[0].innerHTML) &&
            month === parseInt(cells[1].innerHTML) &&
            date === parseInt(cells[2].innerHTML)) {
            alert('此日期已存在，請輸入其他日期！');
            return false;
        }
    }

    return true;
}
