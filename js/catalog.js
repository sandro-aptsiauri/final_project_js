const PAGE_SIZE = 12;

const sortSettings = {
  "price-asc": { sortBy: "price", order: "asc" },
  "price-desc": { sortBy: "price", order: "desc" },
  "rating-desc": { sortBy: "rating", order: "desc" }
};

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const categorySelect = document.getElementById("category-select");
const sortSelect = document.getElementById("sort-select");
const productGrid = document.getElementById("product-grid");
const statusBox = document.getElementById("status-box");
const pagination = document.getElementById("pagination");

const state = { search: "", category: "", sort: "", page: 1 };

let productsById = new Map();
let latestRequest = 0;
let searchTimer = null;

async function loadCategories() {
  const categories = await getCategories();

  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category.slug;
    option.textContent = category.name;
    categorySelect.appendChild(option);
  });
}

function cardHtml(product) {
  const link = "product.html?id=" + product.id;
  const soldOut = isOutOfStock(product);

  return `
    <article class="card">
      <a class="card-image" href="${link}">
        <img src="${escapeHtml(product.thumbnail)}" alt="${escapeHtml(product.title)}" loading="lazy">
        ${discountBadge(product)}
      </a>
      <div class="card-body">
        <h2 class="card-title"><a href="${link}">${escapeHtml(product.title)}</a></h2>
        <div class="card-meta">
          <span class="rating">★ ${product.rating}</span>
          <span class="stock ${stockClass(product)}">${stockText(product)}</span>
        </div>
        <div class="card-footer">
          <span class="price">${formatPrice(product.price)}</span>
          <button class="btn btn-primary btn-small" type="button" data-add="${product.id}"${soldOut ? " disabled" : ""}>Add to cart</button>
        </div>
      </div>
    </article>`;
}

function renderPagination(totalPages) {
  if (totalPages <= 1) {
    pagination.innerHTML = "";
    return;
  }

  let buttons = "";

  for (let page = 1; page <= totalPages; page++) {
    const active = page === state.page;
    buttons += `<button class="page-btn${active ? " active" : ""}" type="button" data-page="${page}"${active ? ' aria-current="page"' : ""}>${page}</button>`;
  }

  pagination.innerHTML = buttons;
}

async function loadProducts() {
  const requestNumber = ++latestRequest;
  const sort = sortSettings[state.sort] || {};

  productGrid.innerHTML = "";
  pagination.innerHTML = "";
  statusBox.innerHTML = loadingHtml("Loading products...");

  try {
    const data = await getProducts({
      search: state.search,
      category: state.category,
      sortBy: sort.sortBy,
      order: sort.order,
      limit: PAGE_SIZE,
      skip: (state.page - 1) * PAGE_SIZE
    });

    if (requestNumber !== latestRequest) {
      return;
    }

    if (data.products.length === 0) {
      statusBox.innerHTML = messageHtml("No products found");
      return;
    }

    productsById = new Map(data.products.map(product => [product.id, product]));
    statusBox.innerHTML = "";
    productGrid.innerHTML = data.products.map(cardHtml).join("");
    renderPagination(Math.ceil(data.total / PAGE_SIZE));
  } catch (error) {
    if (requestNumber !== latestRequest) {
      return;
    }
    statusBox.innerHTML = errorHtml(error.message);
  }
}

function applySearch() {
  const value = searchInput.value.trim();

  if (value === state.search) {
    return;
  }

  state.search = value;
  state.category = "";
  state.page = 1;
  categorySelect.value = "";
  loadProducts();
}

searchInput.addEventListener("input", () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(applySearch, 400);
});

searchForm.addEventListener("submit", event => {
  event.preventDefault();
  clearTimeout(searchTimer);
  applySearch();
});

categorySelect.addEventListener("change", () => {
  clearTimeout(searchTimer);
  state.category = categorySelect.value;
  state.search = "";
  state.page = 1;
  searchInput.value = "";
  loadProducts();
});

sortSelect.addEventListener("change", () => {
  state.sort = sortSelect.value;
  state.page = 1;
  loadProducts();
});

pagination.addEventListener("click", event => {
  const button = event.target.closest("[data-page]");

  if (!button) {
    return;
  }

  state.page = Number(button.dataset.page);
  loadProducts();
});

productGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-add]");

  if (!button) {
    return;
  }

  const product = productsById.get(Number(button.dataset.add));

  if (product) {
    addToCart(product);
  }
});

async function startCatalog() {
  statusBox.innerHTML = loadingHtml("Loading products...");

  try {
    await loadCategories();
  } catch (error) {
    statusBox.innerHTML = errorHtml(error.message);
    return;
  }

  loadProducts();
}

startCatalog();
