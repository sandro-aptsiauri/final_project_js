function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatPrice(value) {
  return "$" + Number(value).toFixed(2);
}

function formatDate(isoString) {
  const date = new Date(isoString);

  if (isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

function isOutOfStock(product) {
  return product.availabilityStatus === "Out of Stock" || product.stock < 1;
}

function stockText(product) {
  if (isOutOfStock(product)) {
    return "Out of Stock";
  }
  return product.availabilityStatus || "In Stock";
}

function stockClass(product) {
  if (isOutOfStock(product)) {
    return "stock-out";
  }
  if (product.availabilityStatus === "Low Stock") {
    return "stock-low";
  }
  return "stock-in";
}

function discountBadge(product) {
  const percent = Math.round(product.discountPercentage);
  return percent > 0 ? `<span class="badge-discount">-${percent}%</span>` : "";
}

function loadingHtml(text) {
  return `
    <div class="state-box">
      <div class="spinner" aria-hidden="true"></div>
      <p>${escapeHtml(text)}</p>
    </div>`;
}

function messageHtml(text) {
  return `
    <div class="state-box">
      <p>${escapeHtml(text)}</p>
    </div>`;
}

function errorHtml(text) {
  return `
    <div class="state-box state-error" role="alert">
      <p>${escapeHtml(text)}</p>
    </div>`;
}
