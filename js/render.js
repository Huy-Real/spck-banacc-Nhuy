// lây ra id của thẻ chứa các món ăn
const foodContainer = document.getElementById("account-container");
// lấy ra danh sách món ăn từ localStorage
const foods = JSON.parse(localStorage.getItem("accounts")) || [];
// duyệt qua từng món ăn và tạo thẻ HTML tương ứng
let html = ``;

foods.forEach((acc) => {
    html += `
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
                            <div class=" text-indigo-900">${acc.sell}K</div>
                        </div>
                        <div href="" class="bg-indigo-950 block px-4 py-2 rounded-xl border border-indigo-600 overflow-hidden font-bold text-center">MUA NGAY</div>
                    </div>
                </div>
            </a>
    `;
});

// chèn các thẻ HTML vào trong thẻ chứa món ăn
foodContainer.innerHTML = html;
