const nameEl = document.getElementById("name");
const priceEl = document.getElementById("price");
const imageEl = document.getElementById("image");
const rankEl = document.getElementById("rank");
const gunEl = document.getElementById("gun");
const bpEl = document.getElementById("bp");
const meleEl = document.getElementById("mele");

// Parse ID from query string. Support both ?id=... and legacy ?{id}
function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    if (!id) {
        const raw = window.location.search || "";
        if (raw.startsWith("?") && !raw.includes("=")) {
            id = raw.slice(1);
        }
    }
    return id;
}

const id = getProductIdFromUrl();

const db = firebase.firestore();

function showError(title, text) {
    console.error(title, text || "");
    Swal.fire({ icon: "error", title, text });
}

if (!id) {
    showError("Không có ID sản phẩm trong URL", "URL phải chứa ?id=PRODUCT_ID hoặc ?PRODUCT_ID");
} else {
    db.collection("products")
        .doc(id)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                showError("Sản phẩm không tồn tại");
                return;
            }
            const product = doc.data();

            if (nameEl) nameEl.innerText = product.name || "(Không có tên)";

            // price may be stored in `sell` or `price`
            let rawPrice = product.sell ?? product.price ?? 0;
            // if stored as formatted string, remove non-digits
            if (typeof rawPrice === "string") {
                const digits = rawPrice.replace(/[^0-9.-]+/g, "");
                rawPrice = digits === "" ? 0 : Number(digits);
            }
            const numeric = Number(rawPrice) || 0;
            if (priceEl) priceEl.innerText = numeric.toLocaleString() + "đ";

            if (rankEl) rankEl.innerText = product.rank || "";
            if (gunEl) gunEl.innerText = product.gun || "";
            if (bpEl) bpEl.innerText = product.bp || "";
            if (meleEl) meleEl.innerText = product.mele || "";

            if (imageEl) imageEl.src = product.image || imageEl.src;

            // Set page title for clarity
            try {
                if (product.name) document.title = product.name + " - Chi tiết";
            } catch (e) {}
        })
        .catch((error) => {
            showError("Lỗi khi lấy thông tin sản phẩm", error.message || error);
        });
}
