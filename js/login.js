// chờ cho tới khi trang được tải xong hết thì mới thực hiện câu lệnh bên trong
const btnGoogle = document.getElementById("btn-google");
// lắng nghe sự kiện bấm vào nút đăng nhập bằng Google
btnGoogle.addEventListener("click", () => {
    // tạo một provider để đăng nhập với Google
    var provider = new firebase.auth.GoogleAuthProvider();
    // đăng nhập với Google bằng popup
    firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
            var credential = result.credential;
            var user = result.user; // sau khi đăng nhập thành công thì user sẽ là một object chứa thông tin của người dùng, ví dụ {displayName: "Nguyen Van A", email: "
            console.log(user);
            window.location.href = "/index.html"; // chuyển hướng về trang chủ sau khi đăng nhập thành công
        })
        .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log(errorCode, errorMessage);
            alert("Error", errorMessage);
            // ...
        });
});
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    console.log(loginForm);

    // lắng nghe sự kiện submit trên form đăng ký
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault(); // ngăn chặn hành vi mặc định của form
        let email = e.target.email.value;
        let password = e.target.password.value;

        if (!email || !password) {
            alert("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        //lấy ra dữ liệu trong localStorage
        // chuyển đổi chuỗi JSON thành mảng đối tượng
        let users = JSON.parse(localStorage.getItem("users")) || [];

        //kiểm tra email đã tồn tại chưa
        let userExists = users.find((user) => user.email === email && user.password === password);
        console.log(userExists);
        // nếu không tìm thấy thì báo lỗi
        if (!userExists) {
            Swal.fire({
                title: "Đăng nhập thất bại",
                text: " Email hoặc mật khẩu không đúng.",
                icon: "error",
            });
            return;
        }
        // tạo người dùng mới
        let newUser = {
            email: userExists.email,
            password: userExists.password,
        };
        // lưu người dùng hiện tại vào localStorage
        localStorage.setItem("currentUser", JSON.stringify(newUser));
        Swal.fire({
            title: "Đăng nhập thành công",
            icon: "success",
            // nếu bấm vào nút ok thì di chuyển về trang chủ
            willClose: () => {
                window.location.href = "index.html";
            },
        });
    });
});
