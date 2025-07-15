import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "../../components/Common/Product/Product";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import "./ViewProducts.css";

function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  // ✅ Fetch products + auth
  useEffect(() => {
    axios
      .get(
        "https://catering-reservation-and-ordering-system-02d9.onrender.com/api/products"
      )
      .then((res) => {
        console.log("Fetched products:", res.data);

        setProducts(res.data);
        // initialize quantity = 1 for all products
        const initialQuantities = {};
        res.data.forEach((product) => {
          initialQuantities[product._id] = 1;
        });
        setQuantities(initialQuantities);
      })
      .catch((err) => console.error("Error fetching products:", err));

    axios
      .get(
        "https://catering-reservation-and-ordering-system-02d9.onrender.com/api/auth/check-auth",
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.isAuthenticated) setUser(res.data.user);
        else setUser(null);
      });
  }, []);

  // ✅ Place order for selected product
  const handlePlaceOrder = async (product) => {
    const quantity = quantities[product._id] || 1;

    if (!user) return alert("Please login to place an order.");

    const orderData = {
      userId: user._id,
      products: [{ productId: product._id, quantity }],
      totalPrice: product.price * quantity,
    };

    try {
      await axios.post(
        "https://catering-reservation-and-ordering-system-02d9.onrender.com/api/orders/place",
        orderData,
        {
          withCredentials: true,
        }
      );
      setMessage("✅ Order placed successfully! Redirecting...");
      setTimeout(() => {
        navigate("/my-orders");
      }, 2000);
    } catch (err) {
      console.error("Order error:", err);
      setMessage("❌ Failed to place order.");
    }
  };

  // ✅ Quantity change
  const handleQuantityChange = (productId, value) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, parseInt(value) || 1),
    }));
  };

  return (
    <>
      <Navbar user={user} />
      <div className="view-products-page">
        <h2>🛍️ All Available Dishes</h2>
        {message && <p className="order-message">{message}</p>}
        <div className="product-list">
          {products.length > 0 ? (
            products.map((p) => (
              <Product
                key={p._id}
                product={p}
                quantity={quantities[p._id]}
                onQuantityChange={(val) => handleQuantityChange(p._id, val)}
                onOrder={() => handlePlaceOrder(p)}
              />
            ))
          ) : (
            <p className="no-products">No products available.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ViewProducts;
