import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const dishes = [
    {
      name: "Butter Chicken with Basmati Rice",
      img: "https://sukhis.com/app/uploads/2022/09/image3-5-900x601-1.jpg",
    },
    {
      name: "Enna Dosa",
      img: "https://yennadosa.com/wp-content/uploads/2024/04/yenna-blog1.png",
    },
    {
      name: "Traditional Kerala Sadhya",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Sadhya_DSW.jpg/1024px-Sadhya_DSW.jpg",
    },
    {
      name: "Spiced Chickpea Curry",
      img: "https://sukhis.com/app/uploads/2022/04/image2-3-1536x1026.jpg",
    },
    {
      name: "Stuffed Paratha",
      img: "https://images.moneycontrol.com/static-mcnews/2021/04/paratha_shutterstock_1641709639.jpg?impolicy=website&width=1280&height=720",
    },
    {
      name: "Wedding Lunch Feast",
      img: "https://baanali.in/cdn/shop/articles/best-south-indian-food-wedding-lunch.jpg?v=1682338348&width=1100",
    },
    {
      name: "Uttapam with Chutney",
      img: "https://i0.wp.com/travelgenes.com/wp-content/uploads/2020/10/Uttappam.jpg",
    },
    {
      name: "South Indian Wedding Meals",
      img: "https://www.contiki.com/six-two/app/uploads/2024/03/IMG-20240318-WA0007-e1710844435378.jpg",
    },
    {
      name: "Masala Idli Fry",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpncnmrzWXo6MF0Q7wmQhhMgopcXhhJydQCw&s",
    },
    {
      name: "Special Thali Combo",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCqqxslqDKRjVIsPwEUs3kiIn24pp6VpWYVw&s",
    },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/check-auth", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.isAuthenticated) {
          setUser(res.data.user);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      })
      .catch(() => {
        setUser(null);
        setIsAuthenticated(false);
      });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % dishes.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [dishes.length]);

  return (
    <>
      <Navbar user={user} />

      <div className="home">
        <div className="home-content">
          <h1>Welcome to Indian Catering</h1>
          <p>
            Explore traditional foods, reserve your favorites, and enjoy
            home-style meals from the heart of Indian kitchens.
          </p>

          {isAuthenticated && user ? (
            user.role === "admin" ? (
              <div className="user-section">
                <p className="welcome-text">
                  Hello, <strong>{user.username || user.name}</strong>
                </p>
                <div className="home-buttons">
                  <Link to="/view-product" className="btn">
                    View Products
                  </Link>
                  <Link to="/my-orders" className="btn-secondary">
                    My Orders
                  </Link>
                </div>
              </div>
            ) : (
              <div className="user-section">
                <p className="welcome-text">
                  Hello, <strong>{user.username || user.name}</strong>
                </p>
                <div className="home-buttons">
                  <Link to="/upload-product" className="btn">
                    Upload Product Details
                  </Link>
                  <Link to="/view-order" className="btn-secondary">
                    View Order
                  </Link>
                </div>
              </div>
            )
          ) : (
            <div className="home-buttons">
              <Link to="/login" className="btn">
                Login
              </Link>
              <Link to="/register" className="btn-secondary">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Slideshow */}
      <div className="section gallery">
        <h2>🍛 Featured Dishes</h2>
        <div className="slideshow">
          <img
            src={dishes[currentIndex].img}
            alt={dishes[currentIndex].name}
            className="slide-img"
          />
          <h3 className="dish-name">{dishes[currentIndex].name}</h3>
        </div>
      </div>

      {/* About Indian Food */}
      <div className="section">
        <h2>🌿 About Indian Cuisine</h2>
        <p>
          Indian cuisine is a diverse and flavorful fusion of spices, colors,
          and traditions. Each region has its own specialties — from the rich
          curries of the north to the tangy, coconut-infused dishes of the
          south. We bring this culinary magic to your plate!
        </p>
      </div>

      {/* Why Choose Us */}
      <div className="section">
        <h2>🥘 Why Choose Our Catering?</h2>
        <ul>
          <li>✅ Fresh, homemade recipes</li>
          <li>🌶️ Custom spice levels to suit every taste</li>
          <li>🍃 Vegetarian & non-vegetarian options</li>
          <li>🚚 On-time delivery and quality service</li>
        </ul>
      </div>

      {/* Testimonials */}
      <div className="section">
        <h2>💬 Testimonials</h2>
        <p>
          “Delicious food! Reminds me of home.” — <strong>Priya S.</strong>
        </p>
        <p>
          “Their service made our event unforgettable.” —{" "}
          <strong>Rohan M.</strong>
        </p>
      </div>

      <footer className="site-footer">
        <div className="footer-content">
          <p>
            © {new Date().getFullYear()} <strong>Venkatesh Ramar</strong> |
            Email: <a href="mailto:vinex521@gmail.com">vinex521@gmail.com</a>
          </p>
          <p>
            Project: <strong>Indian Catering System</strong> — Designed and
            developed as a full-stack MERN application for food ordering and
            delivery.
          </p>
        </div>
      </footer>
    </>
  );
}

export default Home;
