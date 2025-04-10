document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll("button");
    const cartCountElement = document.getElementById("stored");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCartCount();
    addToCartButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const productCard = e.target.closest(".product-card");
            const productName = productCard.querySelector("h3").textContent;
            const discountedPrice = productCard.querySelector(".discounted-price").textContent;
            const productImg = productCard.querySelector("img").getAttribute("src");
            const item = {
                name: productName,
                price: parseFloat(discountedPrice.replace("₹", "")),
                img: productImg
            };
            cart.push(item);
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
            alert(`${productName} added to the cart!`);
        });
    });
    function updateCartCount() {
        cartCountElement.textContent = `${cart.length}`;
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cartItem");
    const totalElement = document.getElementById("total");
    const countElement = document.getElementById("count");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        cartItemsContainer.textContent = "Your Cart is Empty";
        totalElement.textContent = "₹ 0.00";
        countElement.textContent = "0";
        return;
    }
    const table = document.createElement("table");
    table.classList.add("cart-table");
    table.innerHTML = `
        <thead>
            <tr>
                <th><th>
                <th></th>
                <th></th>
                <th></th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    const tbody = table.querySelector("tbody");
    cart.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
        <img src="${item.img}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; vertical-align: middle; border-radius: 5px; margin-right: 10px;">
    </td>
            <td>${item.name}</td>
            <td>₹${item.price.toFixed(2)}</td>
            <td><button class="remove-btn" data-index="${index}">🗑️</button></td>
        `;
        tbody.appendChild(row);
    });
    cartItemsContainer.innerHTML = "";
    cartItemsContainer.appendChild(table);
    updateTotal();
    document.querySelectorAll(".remove-btn").forEach((button) => {
        button.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            window.location.reload(); 
        });
    });
    countElement.textContent = cart.length;
    function updateTotal() {
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        totalElement.textContent = `₹ ${total.toFixed(2)}`;
    }
});