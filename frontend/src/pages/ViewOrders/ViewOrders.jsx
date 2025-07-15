import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import "./ViewOrders.css";

function ViewOrders() {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/check-auth", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.isAuthenticated) {
          const currentUser = res.data.user;
          setUser(currentUser);

          axios
            .get(
              `http://localhost:5000/api/orders/my-orders?userId=${currentUser._id}`
            )
            .then((res) => setOrders(res.data))
            .catch((err) => console.error("Error loading orders:", err));
        } else {
          setUser(null);
        }
      });
  }, []);
  return (
    <>
      <Navbar user={user} />
      <div className="orders-page">
        <h2 className="orders-title">📦 My Orders</h2>
        {orders.length === 0 ? (
          <p className="no-orders">No orders found.</p>
        ) : (
          <div className="orders-list">
            {[...orders].reverse().map((order) => (
              <div key={order._id} className="order-card">
                <div className="order-card-header">
                  <h4 className="order-id">🧾 Order ID: {order._id}</h4>
                  <p
                    className={`order-status order-status-${
                      order.status?.toLowerCase() || "pending"
                    }`}
                  >
                    {order.status || "Pending"}
                  </p>
                </div>
                <p className="order-total">Total Price: ₹{order.totalPrice}</p>
                <div className="order-products">
                  {order.products.map((item, idx) => (
                    <div key={idx} className="order-product">
                      <img
                        src={item.productId.imageUrl}
                        alt={item.productId.name}
                        className="order-product-image"
                      />
                      <div className="order-product-details">
                        <p className="order-product-name">
                          {item.productId.name}
                        </p>
                        <p className="order-product-quantity">
                          Qty: {item.quantity}
                        </p>
                        <p className="order-product-price">
                          ₹{item.productId.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default ViewOrders;
