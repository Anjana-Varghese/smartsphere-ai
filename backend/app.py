from flask import Flask, request, jsonify
import json

app = Flask(__name__)

with open('../data/products.json') as f:
    products = json.load(f)

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()
    query = data['query'].lower()
    matched = []

    for product in products:
        for tag in product['tags']:
            if tag in query:
                matched.append(product)
                break

    return jsonify(matched)

if __name__ == '__main__':
    app.run(debug=True)
