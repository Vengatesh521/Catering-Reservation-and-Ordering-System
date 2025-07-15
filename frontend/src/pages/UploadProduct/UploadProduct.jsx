import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import "./UploadProduct.css";

function UploadProduct() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });

  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  // ✅ Check authentication
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

  // ✅ Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  // ✅ Submit product data
  // ✅ Updated handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, description, price, imageUrl } = product;

    if (!name || !description || !price || !imageUrl) {
      return setMessage("❌ All fields are required.");
    }

    try {
      const productData = {
        name,
        description,
        price,
        imageUrl,
        createdBy: user._id, // ✅ add this
      };

      const res = await axios.post(
        "https://catering-reservation-and-ordering-system-02d9.onrender.com/api/products",
        productData,
        {
          withCredentials: true,
        }
      );

      setMessage("✅ Product uploaded successfully!");
      setProduct({ name: "", description: "", price: "", imageUrl: "" });
    } catch (err) {
      console.error("Upload error:", err);
      setMessage("❌ Upload failed. Try again.");
    }
  };

  return (
    <>
      <Navbar user={user} />

      <div className="upload-container">
        <h2>📦 Upload New Product</h2>
        <form onSubmit={handleSubmit} className="upload-form">
          <input
            type="text"
            name="name"
            placeholder="Dish Name"
            value={product.name}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Dish Description"
            value={product.description}
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price (₹)"
            value={product.price}
            onChange={handleChange}
          />
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={product.imageUrl}
            onChange={handleChange}
          />
          <button type="submit" className="upload-btn">
            Upload Product
          </button>
          {message && <p className="upload-message">{message}</p>}
        </form>
      </div>
    </>
  );
}

export default UploadProduct;
