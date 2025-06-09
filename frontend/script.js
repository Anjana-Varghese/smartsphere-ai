function sendQuery() {
  const query = document.getElementById("query").value;

  fetch("http://127.0.0.1:5000/recommend", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((data) => {
      const results = document.getElementById("results");
      results.innerHTML = "";

      if (data.length === 0) {
        results.innerHTML = "No products found.";
        return;
      }

      data.forEach((product) => {
        const item = document.createElement("p");
        item.textContent = `${product.name} - ₹${product.price}`;
        results.appendChild(item);
      });
    });
}
