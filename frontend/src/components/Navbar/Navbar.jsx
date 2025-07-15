import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);
  };

  useEffect(() => {
    updateCartCount();
    window.addEventListener("cart-updated", updateCartCount);
    return () => window.removeEventListener("cart-updated", updateCartCount);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://catering-reservation-and-ordering-system-02d9.onrender.com/api/auth/logout",
        {},
        { withCredentials: true }
      );
      localStorage.clear();
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left" onClick={() => navigate("/")}>
        🍛 Indian Catering
      </div>

      <div className="navbar-right">
        <div className="cart-icon" onClick={() => navigate("/cart")}>
          🛒
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </div>

        {user ? (
          <>
            <span
              className="username clickable"
              onClick={() => navigate("/profile")}
              title="View Profile"
            >
              👤 {user.username || user.name}
            </span>

            <button className="logout-button" onClick={handleLogout}>
              🚪 Logout
            </button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/login")} className="btn login">
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="btn register"
            >
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
