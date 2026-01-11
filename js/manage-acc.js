const manageAcc = document.getElementById("manage-account");
const accs = JSON.parse(localStorage.getItem("accs")) || [];

const handleDeleteAcc = (id) => {
    Swal.fire({
        title: `Bạn có chắc chắn muốn xóa Tài khoản này không?`,
        text: "Sau khi xóa bạn sẽ không thể khôi phục lại tài khoản này!",
        icon: "info",
        willClose() {
            // tìm index của món ăn cần xóa
            const foodIndex = accs.findIndex((f) => f.id === id);
            // xóa món ăn khỏi mảng
            if (accIndex !== -1) {
                accs.splice(foodIndex, 1);
                // lưu lại mảng sau khi xóa vào localStorage
                localStorage.setItem("accs", JSON.stringify(accs));
                // làm mới lại trang
                window.location.reload();
            }
        },
    });
};

foods.forEach((acc) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <a href="./html/detail-acc.html?${acc.id}" class="block w-full border border-indigo-600 bg-black rounded-xl overflow-hidden text-white">
                <div class="px-5 py-2">
                    <img src="${acc.image}" />
                    <p class="pt-3 pb-2 font-bold">${acc.name}</p>
                    <p class="">${acc.rank}</p>
                    <div class="space-y-1 py-2 text-gray-400">
                        <p>${acc.gun} Gun</p>
                        <p>${acc.bp} Battle Pass</p>
                        <p>${acc.mele} Mele</p>
                        <p>${acc.limit} Limit</p>
                    </div>
                    <div class="flex justify-between items-center">
                        <div class="text-xl">
                            <div class="">${acc.bought}.000đ</div>
                            <div class="line-through text-indigo-900">${acc.sell}.000đ</div>
                        </div>
                </div>
            </a>
    `;
    manageFood.appendChild(tr);
});
