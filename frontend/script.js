async function sendQuery() {
    const query = document.getElementById("query").value;

    const response = await fetch("http://127.0.0.1:5000/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
    });

    const results = await response.json();
    const resultBox = document.getElementById("results");
    resultBox.innerHTML = "";

    if (results.length === 0) {
        resultBox.innerHTML = "<p>No matching products found.</p>";
        return;
    }

    results.forEach(product => {
        const item = document.createElement("div");
        item.className = "result-item";
        item.innerHTML = `
            <h3>${product.name}</h3>
            <p>Brand: ${product.brand || "N/A"}</p>
            <p>Category: ${product.category || "N/A"}</p>
            <p>Price: ₹${product.price}</p>
            <p>Color: ${(product.color || []).join(", ")}</p>
            <p>Size: ${(product.size || []).join(", ")}</p>
            <p>Site: ${product.site || "Unknown"}</p>
        `;
        resultBox.appendChild(item);
    });
}

