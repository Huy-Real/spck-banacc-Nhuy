const btnCreateaccount = document.getElementById("btn-Create-account");
const name = document.getElementById("account-name");
const rank = document.getElementById("account-rank");
const gun = document.getElementById("account-gun");
const bp = document.getElementById("account-bp");
const mele = document.getElementById("account-mele");
const sell = document.getElementById("account-sell");
const image = document.getElementById("account-image");
let imagePreview = document.getElementById("image-preview");

const id = window.location.search.slice(1);

const db = firebase.firestore();
db.collection("products")
    .doc(id)
    .get()
    .then((doc) => {
        const product = doc.data();
        console.log(product);
        bp.value = product.bp;
        gun.value = product.gun;
        image.value = product.image;
        mele.value = product.mele;
        name.value = product.name;
        rank.value = product.rank;
        sell.value = product.sell;
        imagePreview.src = product.image;
    })
    .catch((error) => {
        console.log("Error getting document:", error);
        Swal.fire({
            icon: "error",
            title: "Error getting product detail",
        });
    });

btnCreateaccount.addEventListener("click", () => {
    // kiểm tra dữ liệu hợp lệ
    if (!name.value) {
        alert("Vui lòng nhập tên tài khoản");
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

    const newProduct = {
        name: name.value,
        rank: rank.value,
        gun: gun.value,
        bp: bp.value,
        mele: mele.value,
        sell: sell.value,
        image: image.value,
    };
    console.log(newProduct);
    Swal.fire({
        icon: "loading",
        title: "Loading...",
        showConfirmButton: false,
    });
    const db = firebase.firestore();
    db.collection("products")
        .doc(id)
        .update(newProduct)
        .then(() => {
            console.log("Document updated successfully");
            Swal.fire({
                icon: "success",
                title: "Update product successfully",
                willClose: () => {
                    window.location.href = "../index.html";
                },
            });
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
            Swal.fire({
                icon: "error",
                title: "Update product failed",
                text: error.message,
            });
        });
});
