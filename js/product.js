const productView = document.getElementById("product-view");
const productId = new URLSearchParams(location.search).get("id");

let currentProduct = null;

function thumbsHtml(images) {
  if (images.length < 2) {
    return "";
  }

  const buttons = images.map((src, index) => `
    <button class="thumb${index === 0 ? " active" : ""}" type="button" data-image="${escapeHtml(src)}" aria-label="Show image ${index + 1}">
      <img src="${escapeHtml(src)}" alt="">
    </button>`).join("");

  return `<div class="thumbs">${buttons}</div>`;
}

function factsHtml(product) {
  const rows = [
    ["Brand", product.brand],
    ["Stock", `${stockText(product)} (${product.stock} available)`],
    ["Shipping", product.shippingInformation]
  ].filter(row => row[1]);

  return rows.map(row => `
    <div class="fact">
      <dt>${row[0]}</dt>
      <dd>${escapeHtml(row[1])}</dd>
    </div>`).join("");
}

function reviewHtml(review) {
  return `
    <li class="review">
      <div class="review-head">
        <span class="review-rating">★ ${review.rating}</span>
        <span class="review-author">${escapeHtml(review.reviewerName)}</span>
        <time class="review-date" datetime="${escapeHtml(review.date)}">${formatDate(review.date)}</time>
      </div>
      <p class="review-text">${escapeHtml(review.comment)}</p>
    </li>`;
}

function reviewsHtml(reviews) {
  if (reviews.length === 0) {
    return "";
  }

  return `
    <section class="reviews">
      <h2>Reviews</h2>
      <ul class="review-list">${reviews.map(reviewHtml).join("")}</ul>
    </section>`;
}

function renderProduct(product) {
  currentProduct = product;
  document.title = product.title + " - Online Store";

  const images = product.images && product.images.length > 0 ? product.images : [product.thumbnail];
  const reviews = product.reviews || [];

  productView.innerHTML = `
    <article class="product-layout">
      <div class="gallery">
        <div class="main-image-wrap">
          <img class="main-image" id="main-image" src="${escapeHtml(images[0])}" alt="${escapeHtml(product.title)}">
        </div>
        ${thumbsHtml(images)}
      </div>

      <div class="product-info">
        <h1 class="product-title">${escapeHtml(product.title)}</h1>
        <p class="price price-large">${formatPrice(product.price)}</p>
        <p class="product-description">${escapeHtml(product.description)}</p>
        <dl class="facts">${factsHtml(product)}</dl>
        <button class="btn btn-primary btn-large" type="button" id="add-button"${isOutOfStock(product) ? " disabled" : ""}>Add to cart</button>
      </div>
    </article>
    ${reviewsHtml(reviews)}`;
}

async function loadProduct() {
  if (!/^\d+$/.test(productId || "")) {
    productView.innerHTML = messageHtml("Product not found");
    return;
  }

  productView.innerHTML = loadingHtml("Loading product...");

  try {
    renderProduct(await getProduct(productId));
  } catch (error) {
    if (error.status === 404) {
      productView.innerHTML = messageHtml("Product not found");
    } else {
      productView.innerHTML = errorHtml(error.message);
    }
  }
}

productView.addEventListener("click", event => {
  const thumb = event.target.closest("[data-image]");

  if (thumb) {
    document.getElementById("main-image").src = thumb.dataset.image;
    productView.querySelectorAll(".thumb").forEach(item => {
      item.classList.toggle("active", item === thumb);
    });
    return;
  }

  if (event.target.closest("#add-button") && currentProduct) {
    addToCart(currentProduct);
  }
});

loadProduct();
