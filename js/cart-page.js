const emptyBox = document.getElementById("cart-empty");
const cartContent = document.getElementById("cart-content");
const cartLines = document.getElementById("cart-lines");
const cartTotal = document.getElementById("cart-total");

function lineHtml(item) {
  const name = escapeHtml(item.title);
  const atMax = item.quantity >= item.stock;

  return `
    <li class="cart-line" data-id="${item.id}">
      <div class="cart-line-info">
        <span class="cart-line-title">${name}</span>
        <span class="cart-line-price">${formatPrice(item.price)} &times; ${item.quantity} = ${formatPrice(item.price * item.quantity)}</span>
      </div>
      <div class="quantity">
        <button type="button" data-action="decrease" aria-label="Decrease quantity of ${name}"${item.quantity <= 1 ? " disabled" : ""}>&minus;</button>
        <span class="quantity-value">${item.quantity}</span>
        <button type="button" data-action="increase" aria-label="Increase quantity of ${name}"${atMax ? " disabled" : ""}>+</button>
      </div>
      <button class="link-button" type="button" data-action="remove">Remove</button>
    </li>`;
}

function renderCart() {
  const items = readCart();

  if (items.length === 0) {
    emptyBox.hidden = false;
    cartContent.hidden = true;
    return;
  }

  emptyBox.hidden = true;
  cartContent.hidden = false;
  cartLines.innerHTML = items.map(lineHtml).join("");
  cartTotal.textContent = formatPrice(getCartTotal());
}

cartLines.addEventListener("click", event => {
  const button = event.target.closest("[data-action]");
  const line = event.target.closest("[data-id]");

  if (!button || !line || button.disabled) {
    return;
  }

  const id = Number(line.dataset.id);
  const action = button.dataset.action;

  if (action === "increase") {
    changeQuantity(id, 1);
  } else if (action === "decrease") {
    changeQuantity(id, -1);
  } else if (action === "remove") {
    removeFromCart(id);
  }

  renderCart();
});

renderCart();
