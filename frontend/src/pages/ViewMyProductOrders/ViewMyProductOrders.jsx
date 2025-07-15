// src/pages/ViewMyProductOrders/ViewMyProductOrders.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import "./ViewMyProductOrders.css";

function ViewMyProductOrders() {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

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
          const currentUser = res.data.user;
          setUser(currentUser);

          axios
            .get(
              `https://catering-reservation-and-ordering-system-02d9.onrender.com/api/orders/view-orders?userId=${currentUser._id}`
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
        <h2>📥 Orders for My Products</h2>

        {orders.length === 0 ? (
          <p className="no-orders">No one has ordered your dishes yet.</p>
        ) : (
          <div className="orders-list">
            {[...orders].reverse().map((order) => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <h4>🧾 Order ID: {order._id}</h4>
                  <p>
                    👤 Ordered by:{" "}
                    <strong>
                      {order.userId?.username || "Unknown"} (
                      <a
                        href={`mailto:${order.userId?.email}`}
                        style={{
                          color: "#1976d2",
                          textDecoration: "underline",
                        }}
                      >
                        {order.userId?.email}
                      </a>
                      )
                    </strong>
                  </p>
                  <p>
                    Status:{" "}
                    <span className={`status ${order.status?.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </p>
                </div>

                <div className="order-products">
                  {order.products
                    .filter(
                      (item) =>
                        item.productId?.createdBy?._id?.toString() === user?._id
                    )
                    .map((item, index) => (
                      <div key={index} className="order-product">
                        <img
                          src={item.productId.imageUrl}
                          alt={item.productId.name}
                        />
                        <div>
                          <p>
                            <strong>{item.productId.name}</strong>
                          </p>
                          <p>Qty: {item.quantity}</p>
                          <p>₹{item.productId.price}</p>
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

export default ViewMyProductOrders;
