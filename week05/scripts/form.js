const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const year = document.querySelector("#currentyear");
  const modified = document.querySelector("#lastModified");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  if (modified) {
    modified.textContent = document.lastModified;
  }

  const productSelect = document.querySelector("#product");

  if (productSelect) {
    products.forEach((product) => {
      const option = document.createElement("option");
      option.value = product.id;
      option.textContent = product.name;
      productSelect.appendChild(option);
    });
  }

  const reviewCountElement = document.querySelector("#review-count");

  if (reviewCountElement) {
    const storageKey = "productReviewCount";
    const currentCount = Number(localStorage.getItem(storageKey) || 0) + 1;
    localStorage.setItem(storageKey, currentCount);
    reviewCountElement.textContent = currentCount;

    const params = new URLSearchParams(window.location.search);
    const productId = params.get("product");
    const product = products.find((item) => item.id === productId);
    const rating = params.get("rating");
    const installationDate = params.get("installation-date");
    const review = params.get("written-review");
    const userName = params.get("user-name");

    const summary = document.querySelector("#review-summary");

    if (summary) {
      const productName = product ? product.name : "Not provided";
      const stars = rating ? "★".repeat(Number(rating)) + "☆".repeat(5 - Number(rating)) : "Not provided";

      summary.innerHTML = `
        <p><strong>Product:</strong> ${escapeHtml(productName)}</p>
        <p><strong>Rating:</strong> ${stars}</p>
        <p><strong>Installation date:</strong> ${escapeHtml(installationDate || "Not provided")}</p>
        ${userName ? `<p><strong>Name:</strong> ${escapeHtml(userName)}</p>` : ""}
        ${review ? `<p><strong>Review:</strong> ${escapeHtml(review)}</p>` : ""}
      `;
    }
  }
});

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}
