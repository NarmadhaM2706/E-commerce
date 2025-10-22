const products = [
  { id: 1, name: "Smartphone", price: 14999, category: "electronics", img: "https://via.placeholder.com/200x180?text=Smartphone", rating: 4.5 },
  { id: 2, name: "Laptop", price: 55999, category: "electronics", img: "https://via.placeholder.com/200x180?text=Laptop", rating: 4.7 },
  { id: 3, name: "T-Shirt", price: 599, category: "fashion", img: "https://via.placeholder.com/200x180?text=T-Shirt", rating: 4.2 },
  { id: 4, name: "Jeans", price: 1299, category: "fashion", img: "https://via.placeholder.com/200x180?text=Jeans", rating: 4.4 },
  { id: 5, name: "Novel - The Alchemist", price: 399, category: "books", img: "https://via.placeholder.com/200x180?text=Book", rating: 4.8 },
  { id: 6, name: "Headphones", price: 2499, category: "electronics", img: "https://via.placeholder.com/200x180?text=Headphones", rating: 4.3 }
];

const container = document.getElementById("productContainer");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
const cartCount = document.getElementById("cartCount");
const themeToggle = document.getElementById("themeToggle");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCartCount();

// Display products
function displayProducts(items) {
  container.innerHTML = "";
  items.forEach(p => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <p>⭐ ${p.rating}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}
displayProducts(products);

// Search functionality
searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(searchTerm));
  displayProducts(filtered);
});

// Filter by category
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.category;
    const filtered = category === "all" ? products : products.filter(p => p.category === category);
    displayProducts(filtered);
  });
});

// Add to Cart
function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showToast(`${product.name} added to cart!`);
}

// Update cart count
function updateCartCount() {
  cartCount.textContent = cart.length;
}

// Toast notification
function showToast(message) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.right = "20px";
  toast.style.background = "#007bff";
  toast.style.color = "white";
  toast.style.padding = "10px 20px";
  toast.style.borderRadius = "8px";
  toast.style.boxShadow = "0 2px 8px rgba(0,0,0,0.3)";
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}

// Theme toggle with save
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});