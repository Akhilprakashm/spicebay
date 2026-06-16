from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/health")
def health():
    return jsonify({"status": "ok", "service": "spicebay-backend"})

@app.route("/")
def index():
    return jsonify({"message": "Welcome to SpiceBay 🌶️"})

if __name__ == "__main__":
    app.run()
