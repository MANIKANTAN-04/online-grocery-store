document.addEventListener("DOMContentLoaded", function () {
    const cartContainer = document.getElementById("cart-container");
    const cartTotal = document.getElementById("cart-total");
    const placeOrderButton = document.getElementById("placeOrderButton");

    // Retrieve cart items from local storage
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Function to display cart items
    function displayCartItems() {
        if (cartItems.length === 0) {
            cartContainer.innerHTML = "<p>Your cart is empty.</p>";
            cartTotal.innerHTML = "";
            placeOrderButton.style.display = "none"; // Hide the button if cart is empty
            return;
        }

        let total = 0;
        cartContainer.innerHTML = ""; // Clear the cart container

        cartItems.forEach((item, index) => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");
            productCard.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="product-image">
                <div class="product-info">
                    <h2>${item.name}</h2>
                    <p>Product Price: ₹${item.price}</p>
                    <div class="quantity-controls">
                        <button class="decrease-btn" data-index="${index}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase-btn" data-index="${index}">+</button>
                    </div>
                </div>
                <button class="delete-btn" data-index="${index}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            `;
            cartContainer.appendChild(productCard);
            total += item.price * item.quantity;
        });

        cartTotal.innerHTML = `<h3>Total: ₹${total}</h3>`;
        placeOrderButton.style.display = "block"; // Show the button if there are items in the cart
        attachEventListeners();
    }

    function attachEventListeners() {
        // Attach delete button listeners
        const deleteButtons = document.querySelectorAll(".delete-btn");
        deleteButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                const index = e.target.closest('.delete-btn').dataset.index;
                cartItems.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cartItems));
                displayCartItems();
            });
        });

        // Attach increase and decrease button listeners
        const increaseButtons = document.querySelectorAll(".increase-btn");
        const decreaseButtons = document.querySelectorAll(".decrease-btn");

        increaseButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                const index = e.target.dataset.index;
                cartItems[index].quantity++;
                localStorage.setItem("cart", JSON.stringify(cartItems));
                displayCartItems();
            });
        });

        decreaseButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                const index = e.target.dataset.index;

                if (cartItems[index].quantity > 1) {
                    cartItems[index].quantity--;
                } else {
                    // Remove the item from the cart if quantity is 0
                    cartItems.splice(index, 1);
                }

                localStorage.setItem("cart", JSON.stringify(cartItems));
                displayCartItems();
            });
        });
    }

    // Show the modal when the "Place Order" button is clicked
    placeOrderButton.addEventListener("click", () => {
        const modal = document.getElementById("orderModal");
        modal.style.display = "block"; // Show the modal
    });

    // Close the modal when the close button is clicked
    const closeButton = document.getElementsByClassName("close")[0];
    closeButton.addEventListener("click", () => {
        const modal = document.getElementById("orderModal");
        modal.style.display = "none"; // Hide the modal
    });

    // Close the modal when clicking outside of the modal content
    window.addEventListener("click", (event) => {
        const modal = document.getElementById("orderModal");
        if (event.target === modal) {
            modal.style.display = "none"; // Hide the modal
        }
    });

    displayCartItems(); // Initial call to display cart items
});