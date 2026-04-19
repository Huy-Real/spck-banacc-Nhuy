const db = firebase.firestore();
// lấy ra container để hiển thị sản phẩm
const productContainer = document.getElementById("accounts-container");
// lấy dữ liệu từ firestore và hiển thị ra giao diện
let productHTML = ``; // biến này sẽ chứa HTML của tất cả sản phẩm, sau khi lấy dữ liệu từ firestore xong thì gán vào innerHTML của productContainer để hiển thị ra giao diện
db.collection("products")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.id);
            let product = doc.data(); // doc.data() sẽ trả về dữ liệu của document dưới dạng object, ví dụ {name: "iPhone 14 Pro Max", price: 30000000, image: "https://..."}
            console.log(product);
            productHTML += `
        <a href="./html/detail-acc.html?${acc.id}" class="block w-full border border-indigo-600 bg-black rounded-xl overflow-hidden text-white">
                <div class="px-5 py-2">
                    <img src="${acc.image}" />
                    <p class="pt-3 pb-2 font-bold">${acc.name}</p>
                    <p class="">${acc.rank}</p>
                    <div class="space-y-1 py-2 text-gray-400">
                        <p>${acc.gun} Gun</p>
                        <p>${acc.bp} Battle Pass</p>
                        <p>${acc.mele} Mele</p>
                    </div>
                    <div class="flex justify-between items-center">
                        <div class="text-xl">
                            <div class=" text-indigo-900">${acc.sell}VNĐ</div>
                        </div>
                        <div href="" class="bg-indigo-950 block px-4 py-2 rounded-xl border border-indigo-600 overflow-hidden font-bold text-center">MUA NGAY</div>
                    </div>
                </div>
            </a>
    `;
            productContainer.innerHTML = productHTML; // gán HTML của tất cả sản phẩm vào innerHTML của productContainer để hiển thị ra giao diện
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error); // nếu có lỗi xảy ra khi lấy dữ liệu từ firestore thì hiển thị lỗi ra console và alert cho người dùng biết
        alert("Error getting documents: " + error.message);
    });

// // lây ra id của thẻ chứa các món ăn
// const foodContainer = document.getElementById("account-container");
// // lấy ra danh sách món ăn từ localStorage
// const foods = JSON.parse(localStorage.getItem("accounts")) || [];
// // duyệt qua từng món ăn và tạo thẻ HTML tương ứng
// let html = ``;

// foods.forEach((acc) => {
//     html += `
//         <a href="./html/detail-acc.html?${acc.id}" class="block w-full border border-indigo-600 bg-black rounded-xl overflow-hidden text-white">
//                 <div class="px-5 py-2">
//                     <img src="${acc.image}" />
//                     <p class="pt-3 pb-2 font-bold">${acc.name}</p>
//                     <p class="">${acc.rank}</p>
//                     <div class="space-y-1 py-2 text-gray-400">
//                         <p>${acc.gun} Gun</p>
//                         <p>${acc.bp} Battle Pass</p>
//                         <p>${acc.mele} Mele</p>
//                     </div>
//                     <div class="flex justify-between items-center">
//                         <div class="text-xl">
//                             <div class=" text-indigo-900">${acc.sell}VNĐ</div>
//                         </div>
//                         <div href="" class="bg-indigo-950 block px-4 py-2 rounded-xl border border-indigo-600 overflow-hidden font-bold text-center">MUA NGAY</div>
//                     </div>
//                 </div>
//             </a>
//     `;
// });

// // chèn các thẻ HTML vào trong thẻ chứa món ăn
// foodContainer.innerHTML = html;
