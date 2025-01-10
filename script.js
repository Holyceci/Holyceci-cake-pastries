// Simple alert on form submission
document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevents the form from refreshing the page
    alert('Thank you for reaching out! We will get back to you soon.');
});

// Cart functionality
const cart = [];
let total = 0;

// Function to add items to the cart
function addToCart(product, price) {
    cart.push({ product, price });
    total += price;
    updateCart();
}

// Function to update the cart display
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const totalDisplay = document.getElementById("total");

    // Clear the current cart display
    cartItems.innerHTML = "";

    // Add each item in the cart to the display
    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.product} - $${item.price}`;
        cartItems.appendChild(li);
    });

    // Update the total
    totalDisplay.textContent = total;
}

// Async function to place an order
async function placeOrder() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items before placing an order.");
        return;
    }

    try {
        const response = await fetch("/order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cart, total }),
        });

        if (response.ok) {
            alert("Order placed successfully!");
            cart.length = 0;
            total = 0;
            updateCart();
        } else {
            alert("Failed to place order. Please try again.");
        }
    } catch (error) {
        console.error("Error placing order:", error);
        alert("An error occurred. Please try again.");
    }
}
