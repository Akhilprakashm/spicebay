from flask import Flask, jsonify
from config import Config
from models.user import db
from models.product import Product
from routes.auth import auth_bp, bcrypt
from routes.products import products_bp
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Extensions
    db.init_app(app)
    bcrypt.init_app(app)
    JWTManager(app)
    Migrate(app, db)
    CORS(app, origins=["http://localhost:5173"])

    # Blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(products_bp)

    @app.route("/health")
    def health():
        return jsonify({"status": "ok", "service": "spicebay-backend"})

    @app.route("/")
    def index():
        return jsonify({"message": "Welcome to SpiceBay 🌶️"})

    return app

app = create_app()

if __name__ == "__main__":
    app.run()