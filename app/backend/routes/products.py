from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from models.product import Product
from models.user import db

products_bp = Blueprint("products", __name__, url_prefix="/api/products")

@products_bp.route("/", methods=["GET"])
def list_products():
    category = request.args.get("category")
    search = request.args.get("search")

    query = Product.query

    if category:
        query = query.filter_by(category=category)
    if search:
        query = query.filter(Product.name.ilike(f"%{search}%"))

    products = query.all()
    return jsonify({"products": [p.to_dict() for p in products], "count": len(products)}), 200


@products_bp.route("/<int:product_id>", methods=["GET"])
def get_product(product_id):
    product = Product.query.get_or_404(product_id)
    return jsonify(product.to_dict()), 200


@products_bp.route("/seed", methods=["POST"])
def seed_products():
    if Product.query.count() > 0:
        return jsonify({"message": "Products already seeded"}), 200

    spices = [
        Product(name="Malabar Black Pepper", description="The king of spices from Kerala's Malabar coast", price=12.99, stock=100, origin="Malabar, Kerala", category="pepper", image_url=""),
        Product(name="Cardamom Green", description="Aromatic green cardamom from Idukki hills", price=18.50, stock=75, origin="Idukki, Kerala", category="cardamom", image_url=""),
        Product(name="Turmeric Powder", description="Pure turmeric with high curcumin content", price=8.99, stock=200, origin="Ernakulam, Kerala", category="turmeric", image_url=""),
        Product(name="Cloves Whole", description="Premium whole cloves with intense aroma", price=15.00, stock=60, origin="Thrissur, Kerala", category="cloves", image_url=""),
        Product(name="Cinnamon Sticks", description="True Ceylon cinnamon, hand-rolled", price=11.25, stock=90, origin="Kottayam, Kerala", category="cinnamon", image_url=""),
    ]

    for spice in spices:
        db.session.add(spice)
    db.session.commit()

    return jsonify({"message": "Seeded 5 spices", "products": [s.to_dict() for s in spices]}), 201
