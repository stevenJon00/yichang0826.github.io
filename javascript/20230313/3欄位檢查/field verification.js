function checkinput() {
    if (checkusername() != true) {
        document.getElementById("usernamealert").textContent = checkusername();
    } else {
        document.getElementById("usernamealert").textContent = "輸入完成";
        document.getElementById("username").style = "display:none"
        document.getElementById("usernamelabel").style = "display:none"
    }

    if (checkpassword() != true) {
        document.getElementById("passwordalert").textContent = checkpassword();
    } else {
        document.getElementById("passwordalert").textContent = "輸入完成";
        document.getElementById("password").style = "display:none";
        document.getElementById("passwordlabel").style = "display:none";
    }

    if (checkemail() != true) {
        document.getElementById("emailalert").textContent = checkemail();
    } else {
        document.getElementById("emailalert").textContent = "輸入完成";
        document.getElementById("email").style = "display:none";
    }

    if (checknumber() != true) {
        document.getElementById("numberalert").textContent = checknumber();
    } else {
        document.getElementById("numberalert").textContent = "輸入完成";
        document.getElementById("number").style = "display:none";
    }
    if (checkusername() === true && checkpassword() === true && checkemail() === true && checknumber() === true) {
        alert("welcome")
    }
}

function checkusername() {
    var username = document.getElementById("username").value.trim();//trim()去掉空格
    const firstChar = username.charAt(0);//第一個字元
    //const regexAZ = /[^a-zA-Z]/;//正規表達式 (^匹配)
    //const regex = /[^\w]/;//包含英文數字下底線
    const regex = /^[a-zA-Z]\w{5,17}$/;//正規表達式 (^匹配) 以英文開頭 包含英文數字下底線
    if (username === "") {
        return "不得為空";
    } else if (username.length < 6) {
        return "用戶名不得少於 6 位";
    } else if (username.length > 18) {
        return "用戶名不得多於 18 位";
    // } else if (regex.test(firstChar)) {
    //     return "用戶名第一個字必須是英文";
    } else if (!regex.test(username)) {
        return "用戶名裡不符合格式要求";
    } else {
        return true;
    }
}
function checkpassword() {
    var password = document.getElementById("password").value.trim();
    if (password === "") {
        return "不得為空";
    } else if (password.length < 6) {
        return "密碼不得少於 6 位";
    } else if (password.length > 18) {
        return "密碼不得多於 18 位";
    } else {
        return true;
    }
}
function checkemail() {
    var email = document.getElementById("email").value.trim();
    var emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

    if (email === "") {
        return "不得為空";
    } else if (email.search(emailRule)) {
        return "Email不符合格式";
    } else {
        return true;
    }
}
function checknumber() {
    var number = document.getElementById("number").value.trim();
    var numberRule = /[0-9]/;

    if (number === "") {
        return "不得為空";
    } else if (number.search(numberRule) || number.length <= 5) {
        return "手機號碼碼不符合格式";
    } else {
        return true;
    }
}