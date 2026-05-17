const manageAcc = document.getElementById("manage-account");
const db = firebase.firestore();

db.collection("products")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.id, "abc");
            let product = doc.data(); // doc.data() sẽ trả về dữ liệu của document dưới dạng object
            let productId = doc.id;
            console.log(product);
            //         productHTML += `
            //     <a href="./html/detail-acc.html?${productId}" class="block w-full border border-indigo-600 bg-black rounded-xl overflow-hidden text-white">
            //             <div class="px-5 py-2">
            //                 <img src="${product.image}" />
            //                 <p class="pt-3 pb-2 font-bold">${product.name}</p>
            //                 <p class="">${product.rank}</p>
            //                 <div class="space-y-1 py-2 text-gray-400">
            //                     <p>${product.gun} Gun</p>
            //                     <p>${product.bp} Battle Pass</p>
            //                     <p>${product.mele} Mele</p>
            //                 </div>
            //                 <div class="flex justify-between items-center">
            //                     <div class="text-xl">
            //                         <div class=" text-indigo-900">${product.sell}VNĐ</div>
            //                     </div>
            //                     <div href="" class="bg-indigo-950 block px-4 py-2 rounded-xl border border-indigo-600 overflow-hidden font-bold text-center">MUA NGAY</div>
            //                 </div>
            //             </div>
            //         </a>
            // `;

            const tr = document.createElement("tr");
            tr.innerHTML = `
        <td class="border px-4 py-2 w-64">${product.name}</td>
        <td class="border px-4 py-2  "><p>${product.gun} Gun</p>
                        <p>${product.bp} Battle Pass</p>
                        <p>${product.mele} Mele</p>
                        <p">${product.sell} VNĐ</p></td>
        <td class="border p-3  w-64">
            <img src="${product.image}" alt="${product.name}" class="h-full w-full object-cover"/>
        </td>
        <td class="border px-4 py-2 w-64">
        <a href="./edit-acc.html?${doc.id}" class="btn btn-warning mr-2">Sửa</a>
        <button class="btn btn-error bg-red-500" onclick="handleDeleteAcc('${doc.id}');">Xóa</button>
        </td>

    `;
            manageAcc.appendChild(tr);
        });
        // productContainer.innerHTML = productHTML; // gán HTML của tất cả sản phẩm vào innerHTML của productContainer để hiển thị ra giao diện
    })
    .catch((error) => {
        console.log("Error getting documents: ", error); // nếu có lỗi xảy ra khi lấy dữ liệu từ firestore thì hiển thị lỗi ra console và alert cho người dùng biết
        alert("Error getting documents: " + error.message);
    });

function handleDeleteAcc(id) {
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
                            window.location.reload();
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
}
