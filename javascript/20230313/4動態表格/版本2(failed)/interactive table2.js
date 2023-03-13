const table = document.getElementById("table");
var indexExists = {};
var data = [
	{ index: "1", name: "John", sex: "male" },
	{ index: "2", name: "Mary", sex: "female" },
	{ index: "3", name: "Tom", sex: "male" }
];
data.forEach(function (item) {
	addRow(item.index, item.name, item.sex);
});
// 当页面加载时恢复表格数据
window.addEventListener("load", function () {
	restoreTableData();
});


form.addEventListener("submit", function (event) {
	event.preventDefault();
	var index = document.getElementById("index").value;
	var name = document.getElementById("name").value;
	var sex = document.getElementById("sex").value;
	addRow(index, name, sex);
	saveTableData(getTableData());
	sortTable();
	form.reset();
});

// 添加新行的函数
function addRow(index, name, sex) {
	// 检查索引值是否已经存在
	if (indexExists[index]) {
		alert("索引值 " + index + " 已经存在，请输入其他值！");
		return;
	}

	// 创建新行
	var table = document.getElementById("table");
	var row = table.insertRow(-1);

	var indexCell = row.insertCell(0);
	var nameCell = row.insertCell(1);
	var sexCell = row.insertCell(2);
	var actionCell = row.insertCell(3);

	indexCell.innerHTML = index;
	nameCell.innerHTML = name;
	sexCell.innerHTML = sex;
	actionCell.innerHTML = "<button type='button' onclick='deleteRow(this)' class='delbut'>Delete</button>";

	// 将索引值添加到 indexExists 对象中
	indexExists[index] = true;

	// 清空表单
	document.getElementById("index").value = "";
	document.getElementById("name").value = "";
	document.getElementById("sex").value = "";

	// 当表格数据发生变化时保存数据
	const data = {"index":index, "name":name, "sex":sex};
	saveTableData([data]);
}


// 删除行的函数
function deleteRow(btn) {
	var row = btn.parentNode.parentNode;
	var index = row.cells[0].innerHTML;
	delete indexExists[index];
	row.parentNode.removeChild(row);
	// 删除行时更新本地存储数据
	updateLocalStorageData();
}

// 将表格数据保存在本地存储中
function saveTableData() {
	const table = document.getElementById("table");
	const tableData = [];
	for (let i = 1; i < table.rows.length; i++) {
	  const rowData = {};
	  rowData.index = table.rows[i].cells[0].innerHTML;
	  rowData.name = table.rows[i].cells[1].innerHTML;
	  rowData.sex = table.rows[i].cells[2].innerHTML;
	  tableData.push(rowData);
	}
	localStorage.setItem("tableData", JSON.stringify(tableData));
}

// 更新本地存储中的数据
function updateLocalStorageData() {
	saveTableData();
	alert("資料已更新！");
}

  
  
// 从本地存储中恢复表格数据
function restoreTableData() {
	const table = document.getElementById("table");
	const tbody = table.tBodies[0];
	const tableData = JSON.parse(localStorage.getItem("tableData"));
	if (tableData) {
	  for (let i = 0; i < tableData.length; i++) {
		const rowData = tableData[i];
		const row = document.createElement("tr");
		for (let j = 0; j < rowData.length; j++) {
		  const cell = document.createElement("td");
		  cell.textContent = rowData[j];
		  row.appendChild(cell);
		  if (j === 0) {
			// 将索引值添加到 indexExists 对象中
			indexExists[rowData[j]] = true;
		  }
		}
		const actionCell = document.createElement("td");
		actionCell.innerHTML = "<button type='button' onclick='deleteRow(this)' class='delbut'>Delete</button>";
		row.appendChild(actionCell);
		tbody.appendChild(row);
	  }
	}
	alert("資料回復");
  }
  
