const name = document.getElementById("name");
const price = document.getElementById("price");
const image = document.getElementById("image");
const btnEditProduct = document.getElementById("edit-product");

const id = window.location.search.slice(1);

const db = firebase.firestore();
db.collection("products")
    .doc(id)
    .get()
    .then((doc) => {
        const product = doc.data();
        name.innerText = product.name;
        price.innerText = Number(product.price).toLocaleString() + "đ";
        image.src = product.image;
        btnEditProduct.href = `./edit-product.html?${id}`;
    })
    .catch((error) => {
        console.log("Error getting document:", error);
        Swal.fire({
            icon: "error",
            title: "Error getting product detail",
        });
    });

const btnDeleteProduct = document.getElementById("delete-product");
btnDeleteProduct.addEventListener("click", function () {
    Swal.fire({
        title: "Are you sure you want to delete this product?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.isConfirmed) {
            const db = firebase.firestore();
            db.collection("products")
                .doc(id)
                .delete()
                .then(() => {
                    console.log("Document successfully deleted!");
                    Swal.fire({
                        icon: "success",
                        title: "Delete product successfully",
                        willClose: () => {
                            window.location.href = "../index.html";
                        },
                    });
                })
                .catch((error) => {
                    console.error("Error removing document: ", error);
                    Swal.fire({
                        icon: "error",
                        title: "Error deleting product",
                    });
                });
        }
    });
});
