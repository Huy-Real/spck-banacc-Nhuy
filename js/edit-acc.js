const btnCreateaccount = document.getElementById("btn-create-account");
const name = document.getElementById("acc-name");
const rank = document.getElementById("account-rank");
const gun = document.getElementById("account-gun");
const bp = document.getElementById("account-bp");
const mele = document.getElementById("account-mele");
const sell = document.getElementById("account-sell");
const image = document.getElementById("acc-image");
let imagePreview = document.getElementById("image-preview");

const queryString = window.location.search;
// lấy ra danh sách món ăn từ localStorage
const accs = JSON.parse(localStorage.getItem("accs")) || [];

// lấy id từ URL
const accId = Number(queryString.split("?")[1]);

// tìm món ăn có id tương ứng
const acc = accs.find((f) => f.id === accId);
// hiển thị thông tin món ăn lên các input để chỉnh sửa
if (acc) {
    name.value = acc.name;
    rank.value = acc.rank;
    gun.value = acc.gun;
    bp.value = acc.bp;
    mele.value = acc.mele;
    sell.value = acc.sell;
    image.value = acc.image;
    imagePreview.src = acc.image;
}

btnCreateacc.addEventListener("click", () => {
    // kiểm tra dữ liệu hợp lệ
    if (!name.value) {
        alert("Vui lòng nhập tên tài khoản");
        return;
    }
    if (!description.value) {
        alert("Vui lòng nhập mô tả tài khoản");
        return;
    }
    if (!rank.value) {
        alert("Vui lòng nhập Rank tài khoản");
        return;
    }
    if (!gun.value) {
        alert("Vui lòng nhập Gun tài khoản");
        return;
    }
    if (!bp.value) {
        alert("Vui lòng nhập Bp tài khoản");
        return;
    }
    if (!mele.value) {
        alert("Vui lòng nhập Mele tài khoản");
        return;
    }
    if (!sell.value) {
        alert("Vui lòng nhập Sell tài khoản");
        return;
    }
    if (!image.value) {
        alert("Vui lòng nhập URL hình ảnh tài khoản");
        return;
    }

    // tìm index của tài khoản cần cập nhật
    const accIndex = accs.findIndex((f) => f.id === accId);

    // cập nhật thông tin tài khoản
    if (accIndex !== -1) {
        accs[accIndex] = {
            id: accId, // giữ nguyên id
            name: name.value,
            rank: rank.value,
            gun: gun.value,
            bp: bp.value,
            mele: mele.value,
            sell: sell.value,
            image: image.value,
        };

        // lưu danh sách tài khoản vào localStorage
        localStorage.setItem("accs", JSON.stringify(accs));

        // chuyển về trang danh sách tài khoản
        window.location.href = "../index.html";
    }
});
