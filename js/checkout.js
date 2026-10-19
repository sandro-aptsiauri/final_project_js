const TEST_USER_ID = 1;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DIGITS_PATTERN = /^\d+$/;

const checkoutEmpty = document.getElementById("checkout-empty");
const checkoutForm = document.getElementById("checkout-form");
const placeOrderButton = document.getElementById("place-order");
const formError = document.getElementById("form-error");
const confirmation = document.getElementById("confirmation");

const fields = [
  {
    id: "full-name",
    check: value => (value ? "" : "Full name is required.")
  },
  {
    id: "email",
    check: value => (EMAIL_PATTERN.test(value) ? "" : "Email must look like an email address.")
  },
  {
    id: "phone",
    check: value => (DIGITS_PATTERN.test(value) ? "" : "Phone must contain digits only.")
  },
  {
    id: "address",
    check: value => (value ? "" : "Address is required.")
  }
];

function validateField(field) {
  const input = document.getElementById(field.id);
  const error = document.getElementById(field.id + "-error");
  const message = field.check(input.value.trim());

  error.textContent = message;
  input.classList.toggle("invalid", message !== "");

  return message === "";
}

function validateForm() {
  let firstInvalid = null;

  fields.forEach(field => {
    if (!validateField(field) && !firstInvalid) {
      firstInvalid = document.getElementById(field.id);
    }
  });

  if (firstInvalid) {
    firstInvalid.focus();
  }

  return firstInvalid === null;
}

function showConfirmation(order) {
  confirmation.innerHTML = `
    <h2>Order confirmed</h2>
    <dl class="summary-list">
      <div>
        <dt>Total</dt>
        <dd>${formatPrice(order.total)}</dd>
      </div>
      <div>
        <dt>Discounted total</dt>
        <dd>${formatPrice(order.discountedTotal)}</dd>
      </div>
      <div>
        <dt>Products</dt>
        <dd>${order.totalProducts}</dd>
      </div>
      <div>
        <dt>Total quantity</dt>
        <dd>${order.totalQuantity}</dd>
      </div>
    </dl>`;

  checkoutForm.hidden = true;
  confirmation.hidden = false;
}

async function submitOrder(event) {
  event.preventDefault();
  formError.textContent = "";

  if (!validateForm()) {
    return;
  }

  const items = readCart();

  placeOrderButton.disabled = true;

  try {
    const order = await createOrder(
      TEST_USER_ID,
      items.map(item => ({ id: item.id, quantity: item.quantity }))
    );

    showConfirmation(order);
    clearCart();
  } catch (error) {
    formError.textContent = error.message;
    placeOrderButton.disabled = false;
  }
}

fields.forEach(field => {
  const input = document.getElementById(field.id);

  input.addEventListener("input", () => {
    if (input.classList.contains("invalid")) {
      validateField(field);
    }
  });
});

checkoutForm.addEventListener("submit", submitOrder);

if (readCart().length === 0) {
  checkoutEmpty.hidden = false;
} else {
  checkoutForm.hidden = false;
}
