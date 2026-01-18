const manageAcc = document.getElementById("manage-account");
const accs = JSON.parse(localStorage.getItem("accounts")) || [];

const handleDeleteAcc = (id) => {
    Swal.fire({
        title: `Bạn có chắc chắn muốn xóa Tài khoản này không?`,
        text: "Sau khi xóa bạn sẽ không thể khôi phục lại tài khoản này!",
        icon: "info",
        willClose() {
            // tìm index của món ăn cần xóa
            const accIndex = accs.findIndex((a) => a.id === id);
            // xóa món ăn khỏi mảng
            if (accIndex !== -1) {
                accs.splice(accIndex, 1);
                // lưu lại mảng sau khi xóa vào localStorage
                localStorage.setItem("accounts", JSON.stringify(accs));
                // làm mới lại trang
                window.location.reload();
            }
        },
    });
};

accs.forEach((acc) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td class="border px-4 py-2 w-64">${acc.name}</td>
        <td class="border px-4 py-2  "><p>${acc.gun} Gun</p>
                        <p>${acc.bp} Battle Pass</p>
                        <p>${acc.mele} Mele</p>
                        <p">${acc.sell}.000đ</p></td>
        <td class="border p-3  w-64">
            <img src="${acc.image}" alt="${acc.name}" class="h-full w-full object-cover"/>
        </td>
        <td class="border px-4 py-2 w-64">
        <a href="./edit-acc.html?${acc.id}" class="btn btn-warning mr-2">Sửa</a>
        <button class="btn btn-error bg-red-500" onclick="handleDeleteAcc(${acc.id});">Xóa</button>
        </td>

    `;
    manageAcc.appendChild(tr);
});
