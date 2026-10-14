const API_URL = "https://dummyjson.com";

async function fetchJson(path, options) {
  let response;

  try {
    response = await fetch(API_URL + path, options);
  } catch (error) {
    throw new Error("Could not reach the server.");
  }

  let data = null;

  try {
    data = await response.json();
  } catch (error) {
    data = null;
  }

  if (!response.ok) {
    const message = data && data.message ? data.message : "Request failed with status " + response.status;
    const failure = new Error(message);
    failure.status = response.status;
    throw failure;
  }

  return data;
}

function getProducts(options) {
  const { search, category, sortBy, order, limit, skip } = options;
  const query = new URLSearchParams();

  if (sortBy) {
    query.set("sortBy", sortBy);
    query.set("order", order);
  }

  query.set("limit", limit);
  query.set("skip", skip);

  if (search) {
    query.set("q", search);
    return fetchJson("/products/search?" + query.toString());
  }

  if (category) {
    return fetchJson("/products/category/" + encodeURIComponent(category) + "?" + query.toString());
  }

  return fetchJson("/products?" + query.toString());
}

function getProduct(id) {
  return fetchJson("/products/" + encodeURIComponent(id));
}

function getCategories() {
  return fetchJson("/products/categories");
}

function createOrder(userId, items) {
  return fetchJson("/carts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: userId, products: items })
  });
}
