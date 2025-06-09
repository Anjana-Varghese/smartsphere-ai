from flask import Flask, jsonify, send_from_directory

app = Flask(__name__, static_folder='frontend', static_url_path='')

# Serve frontend files
@app.route('/')
def serve_index():
    return send_from_directory('frontend', 'index.html')

# Example: Optional API to get products from JSON (can be expanded)
@app.route('/api/products')
def get_products():
    import json
    with open('products.json') as f:
        products = json.load(f)
    return jsonify(products)

if __name__ == '__main__':
    app.run(debug=True)

