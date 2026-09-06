const cartButton = document.getElementById("cartButton");
const cartDrawer = document.getElementById("cartDrawer");
const closeCart = document.getElementById("closeCart");
const overlay = document.getElementById("overlay");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

let cart = [];

function openCart() {
  cartDrawer.classList.add("open");
  overlay.classList.add("show");
  cartDrawer.setAttribute("aria-hidden", "false");
}

function hideCart() {
  cartDrawer.classList.remove("open");
  overlay.classList.remove("show");
  cartDrawer.setAttribute("aria-hidden", "true");
}

function renderCart() {
  cartCount.textContent = cart.length;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Your bag is empty.</p>';
    return;
  }

  cartItems.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <span>${item}</span>
      <button type="button" data-index="${index}" class="remove-item">Remove</button>
    </div>
  `).join("");

  document.querySelectorAll(".remove-item").forEach(button => {
    button.addEventListener("click", () => {
      cart.splice(Number(button.dataset.index), 1);
      renderCart();
    });
  });
}

document.querySelectorAll(".add-btn").forEach(button => {
  button.addEventListener("click", () => {
    cart.push(button.dataset.name);
    renderCart();
    openCart();
  });
});

cartButton.addEventListener("click", openCart);
closeCart.addEventListener("click", hideCart);
overlay.addEventListener("click", hideCart);

menuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});

document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", () => mobileMenu.classList.remove("open"));
});

document.getElementById("newsletterForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("emailInput").value;
  document.getElementById("formMessage").textContent =
    `Thanks — ${email} has been added to the demo list.`;
  event.target.reset();
});

document.getElementById("checkoutButton").addEventListener("click", () => {
  alert("Checkout is a demo for now. You can connect Shopify, Stripe, PayPal or another payment system later.");
});

document.getElementById("year").textContent = new Date().getFullYear();
renderCart();
