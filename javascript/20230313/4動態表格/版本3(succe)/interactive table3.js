// // 添加新行的函数
// function addRow(jsdata) {
// 	// 检查索引值是否已经存在
// 	if (indexExists[jsdata.index]) {
// 		alert("索引值 " + jsdata.index + " 已经存在，请输入其他值！");
// 		return;
// 	}

// 	// 创建新行
// 	const tbody = document.querySelector('table tbody');
// 	var row = tbody.insertRow(-1);

// 	var indexCell = row.insertCell(0);
// 	var nameCell = row.insertCell(1);
// 	var sexCell = row.insertCell(2);
// 	var actionCell = row.insertCell(3);

// 	indexCell.innerHTML = jsdata.index;
// 	nameCell.innerHTML = jsdata.name;
// 	sexCell.innerHTML = jsdata.sex;
// 	actionCell.innerHTML = "<button type='button' onclick='deleteRow(this)' class='delbut'>Delete</button>";

// 	// 将索引值添加到 indexExists 对象中
// 	indexExists[jsdata.index] = true;
// 	saveTableData(jsdata);

// 	// 清空表单
// 	document.getElementById("form").reset()
	
// }


// // 删除行的函数
// function deleteRow(btn) {
// 	var row = btn.parentNode.parentNode;
// 	var dataindex = row.cells[0].innerHTML;
// 	var dataname = row.cells[1].innerHTML;
// 	var datasex = row.cells[2].innerHTML;
// 	const datajson = {"index":dataindex, "name":dataname, "sex":datasex}
// 	delete indexExists[dataindex];

// 	const storedData = JSON.parse(localStorage.getItem("jsdata"));

// 	// 如果找到了具有 index 属性值为 2 的对象，则使用 splice() 方法从数组中删除该对象
// 	for (let i = 0; i < storedData.length; i++) {
// 		if (storedData[i] === datajson) {
// 		  storedData.splice(i, 1);
// 		  break;
// 		}
// 	  }

// 	// 将修改后的数组重新保存到 localStorage 中
// 	saveTableData(storedData);
// 	row.parentNode.removeChild(row);
// 	}

// // 将表格数据保存在本地存储中
// function saveTableData(jsdata) {
// 	// // 從 localStorage 取得之前儲存的資料
// 	// const tableData = JSON.parse(localStorage.getItem("jsdata")) || [];
	
  
// 	// // 將新的資料加入到之前儲存的資料中
// 	// tableData.push(jsdata);
  
// 	// // 將更新後的資料存入 localStorage
// 	localStorage.setItem("jsdata", JSON.stringify(jsdata));
// 	const tabledata = JSON.parse(localStorage.getItem("jsdata"));
// 	console.log(tabledata)
//   }
  

// // 从本地存储中恢复表格数据
// function restoreTableData() {
// 	const table = document.getElementById("table");
// 	const tbody = table.tBodies[0];
// 	const tableData = JSON.parse(localStorage.getItem("jsdata"));
// 	console.log(tableData)
// 	if (tableData) {
// 		if(tableData.length === 0){
// 			console.log("no data restored")
// 			const data = [
// 				{"index":"1", "name":"tom", "sex":"male"}, 
// 				{"index":"2", "name":"mary", "sex":"female"}, 
// 				{"index":"3", "name":"steve", "sex":"male"}
// 			]
// 			data.forEach(function(item){
// 				addRow(item)
// 			});
// 		}else{
// 			console.log("data restoring")
// 	  		for (let i = 0; i < tableData.length; i++) {
// 				const rowData = tableData[i];
// 				const row = document.createElement("tr");
// 				console.log("data restoring:"+rowData.index)
// 				for (let key in rowData) {
// 					const cell = document.createElement("td");
// 					cell.textContent = rowData[key];
// 					row.appendChild(cell);
// 				}
// 				// 将索引值添加到 indexExists 对象中
// 				indexExists[rowData.index] = true;
			
// 				const actionCell = document.createElement("td");
// 				actionCell.innerHTML = "<button type='button' onclick='deleteRow(this)' class='delbut'>Delete</button>";
// 				row.appendChild(actionCell);
// 				tbody.appendChild(row);
// 	  		}
// 		}
// 	}else{
// 		console.log("no data restored")
// 			const data = [
// 				{"index":"1", "name":"tom", "sex":"male"}, 
// 				{"index":"2", "name":"mary", "sex":"female"}, 
// 				{"index":"3", "name":"steve", "sex":"male"}
// 			]
// 			data.forEach(function(item){
// 				addRow(item)
// 			});
// 	}
	
//   }
  
// 添加新行的函数
function addRow(jsdata) {
	// 检查索引值是否已经存在
	if (indexExists[jsdata.index]) {
		alert("索引值 " + jsdata.index + " 已经存在，请输入其他值！");
		return;
	}

	// 创建新行
	const tbody = document.querySelector('table tbody');
	var row = tbody.insertRow(-1);

	var indexCell = row.insertCell(0);
	var nameCell = row.insertCell(1);
	var sexCell = row.insertCell(2);
	var actionCell = row.insertCell(3);

	indexCell.innerHTML = jsdata.index;
	nameCell.innerHTML = jsdata.name;
	sexCell.innerHTML = jsdata.sex;
	actionCell.innerHTML = "<button type='button' onclick='deleteRow(this)' class='delbut'>Delete</button>";

	// 将索引值添加到 indexExists 对象中
	indexExists[jsdata.index] = true;
	saveTableData(jsdata);
	sortTable(0); // 按照第一列（索引值）排序

	// 清空表单
	document.getElementById("form").reset()
	
}


// 删除行的函数
function deleteRow(btn) {
	var row = btn.parentNode.parentNode;
	var dataindex = row.cells[0].innerHTML;
	var dataname = row.cells[1].innerHTML;
	var datasex = row.cells[2].innerHTML;
	const datajson = {"index":dataindex, "name":dataname, "sex":datasex}
	delete indexExists[dataindex];

	// 从本地存储中恢复表格数据
	const storedData = JSON.parse(localStorage.getItem("jsdata"));

	// 使用 filter() 方法过滤出不需要删除的对象
	const newData = storedData.filter(function(item) {
		return item.index !== dataindex;
	});

	// 将修改后的数组重新保存到 localStorage 中
	localStorage.setItem("jsdata", JSON.stringify(newData));

	row.parentNode.removeChild(row);
}


// 将表格数据保存在本地存储中
function saveTableData(jsdata) {
	// 从本地存储中恢复表格数据
	const storedData = JSON.parse(localStorage.getItem("jsdata")) || [];

	// 将新的数据添加到已有数据的末尾
	storedData.push(jsdata);

	// 将更新后的数据保存到 localStorage 中
	localStorage.setItem("jsdata", JSON.stringify(storedData));
}


// 从本地存储中恢复表格数据
// 从本地存储中恢复表格数据
function restoreTableData() {
	const table = document.getElementById("table");
	const tbody = table.tBodies[0];
	const tableData = JSON.parse(localStorage.getItem("jsdata"));
	console.log(tableData)
	if (tableData) {
		if(tableData.length === 0){
			// 如果 localStorage 中没有数据，那么添加一些默认数据
			console.log("no data restored")
			const data = [
				{"index":"1", "name":"tom", "sex":"male"}, 
				{"index":"2", "name":"mary", "sex":"female"}, 
				{"index":"3", "name":"steve", "sex":"male"}
			]
			// 遍历默认数据，添加到表格中
			data.forEach(function(item){
				addRow(item)
			});
		}else{
			console.log("data restoring")
			// 如果 localStorage 中有数据，那么将数据添加到表格中
	  		for (let i = 0; i < tableData.length; i++) {
				const rowData = tableData[i];
				const row = document.createElement("tr");
				console.log("data restoring:"+rowData.index)
				for (let key in rowData) {
					const cell = document.createElement("td");
					cell.textContent = rowData[key];
					row.appendChild(cell);
				}
				// 将索引值添加到 indexExists 对象中
				indexExists[rowData.index] = true;
			
				const actionCell = document.createElement("td");
				actionCell.innerHTML = "<button type='button' onclick='deleteRow(this)' class='delbut'>Delete</button>";
				row.appendChild(actionCell);
				tbody.appendChild(row);
	  		}
		}
	}else{
		// 如果 localStorage 中没有数据，那么添加一些默认数据
		console.log("no data restored")
			const data = [
				{"index":"1", "name":"tom", "sex":"male"}, 
				{"index":"2", "name":"mary", "sex":"female"}, 
				{"index":"3", "name":"steve", "sex":"male"}
			]
			// 遍历默认数据，添加到表格中
			data.forEach(function(item){
				addRow(item)
			});
	}
	
}

function sortTable(columnIndex) {
	const tbody = document.querySelector('table tbody');
	const rows = Array.from(tbody.querySelectorAll('tr'));
	const direction = headerCells[columnIndex].getAttribute('data-sort') === 'asc' ? 1 : -1;
	
	rows.sort(function(a, b) {
	  const aValue = a.cells[columnIndex].textContent.trim();
	  const bValue = b.cells[columnIndex].textContent.trim();
	  if (aValue === bValue) {
		return 0;
	  }
	  if (isNaN(aValue) || isNaN(bValue)) {
		return aValue.localeCompare(bValue) * direction;
	  } else {
		return (aValue - bValue) * direction;
	  }
	});
	
	while (tbody.firstChild) {
	  tbody.removeChild(tbody.firstChild);
	}
	
	rows.forEach(function(row) {
	  tbody.appendChild(row);
	});
	
	// 更新表头的排序标识
	headerCells.forEach(function(cell) {
	  cell.removeAttribute('data-sort');
	});
	headerCells[columnIndex].setAttribute('data-sort', direction === 1 ? 'desc' : 'asc');
  }
  
