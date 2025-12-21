// chờ cho tới khi trang được tải xong hết thì mới thực hiện câu lệnh bên trong

document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form");
    console.log(registerForm);

    // lắng nghe sự kiện submit trên form đăng ký
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault(); // ngăn chặn hành vi mặc định của form
        let email = e.target.email.value;
        let password = e.target.password.value;
        let repeatPassword = e.target.repeatPassword.value;

        console.log(email, password, repeatPassword);

        //regex chữ hoa, chữ thuờng, số
        const uppercaseRegex = /[A-Z]/;
        const lowerRegex = /[a-z]/;
        const numberRegex = /[0-9]/;

        // kiểm tra độ dài mật khẩu
        if (password.length < 6) {
            alert("Mật khẩu phải có ít nhất 6 ký tự.");
            return;
        }

        // kiểm tra xem mật khẩu có chứa chữ hoa không
        if (!uppercaseRegex.test(password)) {
            alert("Mật khẩu phải chứa ít nhất một chữ cái viết hoa.");
            return;
        }

        // kiểm tra xem mật khẩu có chứa chữ thường không
        if (!lowerRegex.test(password)) {
            alert("Mật khẩu phải chứa ít nhất một chữ cái.");
            return;
        }

        // kiểm tra xem mật khẩu có chứa chữ hoa không
        if (!numberRegex.test(password)) {
            alert("Mật khẩu phải chứa ít nhất một chữ số.");
            return;
        }

        // kiểm tra xem mật khẩu và xác nhận mật khẩu có khớp không
        if (password != repeatPassword) {
            alert("Mật khẩu không khớp. Vui lòng thử lại.");
            return;
        }

        //lấy ra dữ liệu trong localStorage
        // chuyển đổi chuỗi JSON thành mảng đối tượng
        let users = JSON.parse(localStorage.getItem("users")) || [];

        //kiểm tra email đã tồn tại chưa
        let userExists = users.some((user) => user.email === email);
        if (userExists) {
            alert("Email đã tồn tại. Vui lòng sử dụng email khác.");
            return;
        }
        // thêm người dùng mới vào mảng
        users.push({ email, password });
        // lưu mảng người dùng trở lại localStorage dưới dạng chuỗi JSON
        localStorage.setItem("users", JSON.stringify(users));
        // nếu tất cả các kiểm tra đều hợp lệ, hiển thị thông báo đăng ký thành công
        alert("Đăng ký thành công!");
    });
});
