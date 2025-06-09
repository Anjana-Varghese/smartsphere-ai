from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)  # Enable CORS

# Load products once
with open('data/products.json') as f:
    products = json.load(f)

@app.route("/recommend", methods=["POST"])
def recommend():
    query = request.json.get("query", "").lower()
    results = []

    # Extract filters
    price_limit = None
    for word in query.split():
        if word.isdigit():
            price_limit = int(word)
            break

    for product in products:
        match = True

        if price_limit and product.get("price", 0) > price_limit:
            match = False

        # Filter by color
        if "color" in product and any(c.lower() in query for c in product["color"]):
            pass
        elif "color" in product and any(color in query for color in ["red", "blue", "black", "white", "grey"]):
            if not any(c in query for c in product["color"]):
                match = False

        # Filter by brand
        if "brand" in product and product["brand"].lower() not in query:
            # Allow generic match unless other filters passed
            if any(b in query for b in ["nike", "puma", "arrow", "levis", "freshfarm", "soundmax"]):
                match = False

        # Filter by category
        if "category" in product and product["category"].lower() not in query:
            if any(cat in query for cat in ["fashion", "grocery", "footwear", "accessories"]):
                match = False

        # Filter by site
        if "site" in product and any(site in query for site in ["myntra", "flipkart", "amazon"]):
            if product["site"].lower() not in query:
                match = False

        if match:
            results.append(product)

    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True)

