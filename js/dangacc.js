const btnCreateAccount = document.getElementById("btn-upload-account");
const name = document.getElementById("account-name");
const rank = document.getElementById("account-rank");
const gun = document.getElementById("account-gun");
const bp = document.getElementById("account-bp");
const mele = document.getElementById("account-mele");
const limit = document.getElementById("account-limit");
const bought = document.getElementById("account-bought");
const sell = document.getElementById("account-sell");
const image = document.getElementById("account-image");

// cập nhật hình ảnh khi người dùng nhập URL
image.addEventListener("input", () => {
    let imagePreview = document.getElementById("image-preview");
    imagePreview.src = image.value;
});

btnCreateAccount.addEventListener("click", () => {
    // lấy giá trị từ các input
    // kiểm tra dữ liệu hợp lệ
    if (!name.value) {
        alert("Vui lòng nhập tên/id tài khoản của bạn");
        return;
    }
    if (!rank.value) {
        alert("Vui lòng nhập Rank tài khoản của bạn");
        return;
    }

    if (!gun.value) {
        alert("Vui lòng nhập Gun tài khoản của bạn");
        return;
    }
    if (!bp.value) {
        alert("Vui lòng nhập Bp tài khoản của bạn");
        return;
    }
    if (!mele.value) {
        alert("Vui lòng nhập Mele tài khoản của bạn");
        return;
    }
    if (!sell.value) {
        alert("Vui lòng nhập Sell tài khoản của bạn");
        return;
    }
    if (!image.value) {
        alert("Vui lòng nhập URL hình ảnh về tài khoản bạn định đăng bán");
        return;
    }
    // tạo đối tượng tài khoản mới
    const newAccount = {
        id: Date.now(),
        name: name.value,
        rank: rank.value,
        gun: gun.value,
        bp: bp.value,
        mele: mele.value,
        limit: limit.value,
        bought: bought.value,
        sell: sell.value,
        image: image.value,
    };
    // lấy danh sách món ăn từ localStorage
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    // thêm món ăn mới vào danh sách
    accounts.push(newAccount);
    // lưu danh sách món ăn vào localStorage
    localStorage.setItem("accounts", JSON.stringify(accounts));
    // chuyển về trang danh sách món ăn
    window.location.href = "./index.html";
});
