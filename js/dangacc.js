// const btnCreateAccount = document.getElementById("btn-upload-account");
// const name = document.getElementById("account-name");
// const rank = document.getElementById("account-rank");
// const gun = document.getElementById("account-gun");
// const bp = document.getElementById("account-bp");
// const mele = document.getElementById("account-mele");
// const sell = document.getElementById("account-sell");
// const image = document.getElementById("account-image");

// // cập nhật hình ảnh khi người dùng nhập URL
// image.addEventListener("input", () => {
//     let imagePreview = document.getElementById("image-preview");
//     if (imagePreview) {
//         imagePreview.src = image.value;
//     }
// });

// btnCreateAccount.addEventListener("click", () => {
//     // lấy giá trị từ các input
//     // kiểm tra dữ liệu hợp lệ
//     if (!name.value) {
//         alert("Vui lòng nhập tên/id tài khoản của bạn");
//         return;
//     }
//     if (!rank.value) {
//         alert("Vui lòng nhập Rank tài khoản của bạn");
//         return;
//     }

//     if (!gun.value) {
//         alert("Vui lòng nhập Gun tài khoản của bạn");
//         return;
//     }
//     if (!bp.value) {
//         alert("Vui lòng nhập Bp tài khoản của bạn");
//         return;
//     }
//     if (!mele.value) {
//         alert("Vui lòng nhập Mele tài khoản của bạn");
//         return;
//     }
//     if (!sell.value) {
//         alert("Vui lòng nhập Sell tài khoản của bạn");
//         return;
//     }
//     if (!image.value) {
//         alert("Vui lòng nhập URL hình ảnh về tài khoản bạn định đăng bán");
//         return;
//     }
//     // tạo đối tượng tài khoản mới
//     const newAccount = {
//         id: Date.now(),
//         name: name.value,
//         rank: rank.value,
//         gun: gun.value,
//         bp: bp.value,
//         mele: mele.value,
//         sell: sell.value,
//         image: image.value,
//     };
//     // lấy danh sách món ăn từ localStorage
//     const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
//     // thêm món ăn mới vào danh sách
//     accounts.push(newAccount);
//     // lưu danh sách món ăn vào localStorage
//     localStorage.setItem("accounts", JSON.stringify(accounts));
//     // chuyển về trang danh sách món ăn
//     window.location.href = "../index.html";
// });

const formAddProduct = document.getElementById("product-form");

formAddProduct.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(formAddProduct);

    const name = formData.get("name");
    const rank = formData.get("rank");
    const gun = formData.get("gun");
    const bp = formData.get("bp");
    const mele = formData.get("mele");
    const sell = formData.get("sell");
    const image = formData.get("image");

    if (!name || !name.trim()) {
        Swal.fire({
            icon: "error",
            title: "Vui lòng nhập tên tài khoản",
            willClose: () => {
                document.getElementById("account-name").focus();
            },
        });
        return;
    }

    if (!rank || !rank.trim()) {
        Swal.fire({
            icon: "error",
            title: "Vui lòng nhập hạng tài khoản",
            willClose: () => {
                document.getElementById("account-rank").focus();
            },
        });
        return;
    }

    if (!gun || !gun.trim()) {
        Swal.fire({
            icon: "error",
            title: "Vui lòng nhập số súng",
            willClose: () => {
                document.getElementById("account-gun").focus();
            },
        });
        return;
    }

    if (!bp || !bp.trim()) {
        Swal.fire({
            icon: "error",
            title: "Vui lòng nhập số Battle Pass",
            willClose: () => {
                document.getElementById("account-bp").focus();
            },
        });
        return;
    }

    if (!mele || !mele.trim()) {
        Swal.fire({
            icon: "error",
            title: "Vui lòng nhập số Mele",
            willClose: () => {
                document.getElementById("account-mele").focus();
            },
        });
        return;
    }

    if (!sell || !sell.trim()) {
        Swal.fire({
            icon: "error",
            title: "Vui lòng nhập giá tài khoản",
            willClose: () => {
                document.getElementById("account-sell").focus();
            },
        });
        return;
    }

    if (!image || !image.trim()) {
        Swal.fire({
            icon: "error",
            title: "Vui lòng nhập URL hình ảnh",
            willClose: () => {
                document.getElementById("account-image").focus();
            },
        });
        return;
    }

    const newProduct = { name, rank, gun, bp, mele, sell, image };
    console.log(newProduct);
    Swal.fire({
        icon: "loading",
        title: "Loading...",
        showConfirmButton: false,
    });
    const db = firebase.firestore();
    db.collection("products")
        .add(newProduct)
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            Swal.fire({
                icon: "success",
                title: "Add product successfully",
                willClose: () => {
                    window.location.href = "../index.html";
                },
            });
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            Swal.fire({
                icon: "error",
                title: "Add product failed",
                text: error.message,
            });
        });
});
