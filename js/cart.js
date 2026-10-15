const CART_KEY = "online-store-cart";

function readCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    return [];
  }
}

function saveCart(items) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch (error) {
    return;
  }
  updateCartCount();
}

function getCartQuantity() {
  return readCart().reduce((sum, item) => sum + item.quantity, 0);
}

function getCartTotal() {
  return readCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function addToCart(product) {
  const items = readCart();
  const line = items.find(item => item.id === product.id);

  if (line) {
    if (line.quantity >= line.stock) {
      return;
    }
    line.quantity += 1;
  } else {
    if (product.stock < 1) {
      return;
    }
    items.push({
      id: product.id,
      title: product.title,
      price: product.price,
      stock: product.stock,
      quantity: 1
    });
  }

  saveCart(items);
}

function changeQuantity(id, change) {
  const items = readCart();
  const line = items.find(item => item.id === id);

  if (!line) {
    return;
  }

  const next = line.quantity + change;

  if (next < 1 || next > line.stock) {
    return;
  }

  line.quantity = next;
  saveCart(items);
}

function removeFromCart(id) {
  saveCart(readCart().filter(item => item.id !== id));
}

function clearCart() {
  saveCart([]);
}

function updateCartCount() {
  const badge = document.getElementById("cart-count");

  if (badge) {
    badge.textContent = getCartQuantity();
  }
}

updateCartCount();
