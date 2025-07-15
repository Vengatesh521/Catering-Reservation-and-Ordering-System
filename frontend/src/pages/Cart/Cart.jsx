// src/pages/Cart.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Cart.css";
import Navbar from "../../components/Navbar/Navbar";

function Cart() {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  // ✅ Check auth and load cart
  useEffect(() => {
    axios
      .get(
        "https://catering-reservation-and-ordering-system-02d9.onrender.com/api/auth/check-auth",
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.isAuthenticated) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      })
      .catch(() => setUser(null));

    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(items);
  }, []);

  // ✅ Remove from cart
  const handleRemove = (id) => {
    const updated = cartItems.filter((item) => item._id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cart-updated")); // notify navbar
  };

  // ✅ Total Price
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <>
      <Navbar user={user} />
      <div className="cart-container">
        <h2>🛒 Your Cart</h2>
        {cartItems.length === 0 ? (
          <p className="empty-msg">Cart is empty 😔</p>
        ) : (
          <div className="cart-list">
            {cartItems.map((item) => (
              <div className="cart-item" key={item._id}>
                <img src={item.imageUrl} alt={item.name} />
                <div className="cart-info">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <span>₹{item.price}</span>
                  <button onClick={() => handleRemove(item._id)}>
                    ❌ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="cart-total">
            <h3>Total: ₹{total}</h3>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
