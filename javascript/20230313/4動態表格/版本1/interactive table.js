

// 添加新行的函数
function addRow(index, name, sex) {
	// 检查索引值是否已经存在
	if (indexExists[index]) {
		alert("索引值 " + index + " 已经存在，请输入其他值！");
		return;
	}

	// 创建新行
	var table = document.querySelector("table tbody");
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
	sortTable();
}

// 删除行的函数
function deleteRow(btn) {
	var row = btn.parentNode.parentNode;
	var index = row.cells[0].innerHTML;
	delete indexExists[index];
	row.parentNode.removeChild(row);
}

function sortTable() {
	var table, rows, switching, i, x, y, shouldSwitch;
	table = document.getElementById("table"); // 获取 table 元素
	switching = true;
	while (switching) {
	  switching = false;
	  rows = table.rows; // 获取所有行
	  for (i = 1; i < (rows.length - 1); i++) {
		shouldSwitch = false;
		x = rows[i].getElementsByTagName("TD")[0]; // 获取当前行第一个单元格
		y = rows[i + 1].getElementsByTagName("TD")[0]; // 获取下一行第一个单元格
		if (Number(x.innerHTML) > Number(y.innerHTML)) { // 比较两个单元格中的数值大小
		  shouldSwitch = true; // 如果需要交换，则将 shouldSwitch 设为 true
		  break; // 跳出 for 循环
		}
	  }
	  if (shouldSwitch) { // 如果需要交换
		rows[i].parentNode.insertBefore(rows[i + 1], rows[i]); // 交换两行
		switching = true; // 重置 switching 变量
	  }
	}
  }
  