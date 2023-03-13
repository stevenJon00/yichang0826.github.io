$(function () {
    // 從 localStorage 中讀取數據
    var users = JSON.parse(localStorage.getItem('users')) || [];

    // 顯示已有數據
    for (var i = 0; i < users.length; i++) {
        addRow(users[i]);
    }

    // 監聽表單提交事件
    $('#form').submit(function (e) {
        e.preventDefault(); // 防止表單提交

        // 獲取表單數據
        var username = $('#username').val();
        var age = $('#age').val();
        var sex = $('#sex').val();

        // 創建用戶對象
        var user = { username: username, age: age, sex: sex };

        // 將用戶對象添加到數組中
        users.push(user);

        // 保存數組到 localStorage 中
        localStorage.setItem('users', JSON.stringify(users));

        // 清空表單
        $('#form')[0].reset();

        // 在表格中顯示用戶
        addRow(user);
    });

    // 監聽刪除按鈕點擊事件
    $('#table').on('click', '.delbut', function () {
        var tr = $(this).closest('tr'); // 找到要刪除的行
        var index = tr.index(); // 獲取行索引
        tr.remove(); // 刪除行
        users.splice(index, 1); // 刪除對應的數據
        localStorage.setItem('users', JSON.stringify(users)); // 保存數組到 localStorage 中
    });

    // 在表格中添加一行
    function addRow(user) {

        var row = '<tr>' +
            '<td>' + user.username + '</td>' +
            '<td>' + user.age + '</td>' +
            '<td>' + user.sex + '</td>' +
            '<td><button type="button" class="delbut">刪除</button></td>' +
            '</tr>';
        $('#table tbody').append(row);
    }
});