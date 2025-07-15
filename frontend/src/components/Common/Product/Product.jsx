import React, { useState, useEffect } from "react";
import "./Product.css";

function Product({ product, quantity = 1, onQuantityChange, onOrder }) {
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find((item) => item._id === product._id);
    if (exists) setAddedToCart(true);
  }, [product._id]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!cart.find((item) => item._id === product._id)) {
      cart.push({ ...product, quantity });
      localStorage.setItem("cart", JSON.stringify(cart));
      setAddedToCart(true);
      window.dispatchEvent(new Event("cart-updated"));
    }
  };

  return (
    <div className="product-card">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="product-image"
      />
      <div className="product-info">
        <h3>{product.name.charAt(0).toUpperCase() + product.name.slice(1)}</h3>
        <p>
          {product.description
            ? product.description.charAt(0).toUpperCase() +
              product.description.slice(1)
            : ""}
        </p>
        <span className="price">₹{product.price}</span>
        <p className="provider">
          👨‍🍳 Provided by:{" "}
          <strong>
            {product.createdBy?.username
              ? product.createdBy.username.charAt(0).toUpperCase() +
                product.createdBy.username.slice(1)
              : "Unknown"}
          </strong>
        </p>

        <div className="product-actions">
          <input
            type="number"
            value={quantity}
            min="1"
            onChange={(e) => onQuantityChange(e.target.value)}
            className="quantity-input"
          />
          <button onClick={onOrder} className="order-btn">
            🛒 Order
          </button>
        </div>

        <button
          className="cart-btn"
          onClick={handleAddToCart}
          disabled={addedToCart}
        >
          {addedToCart ? "✅ Added to Cart" : "🛍️ Add to Cart"}
        </button>
      </div>
    </div>
  );
}

export default Product;
