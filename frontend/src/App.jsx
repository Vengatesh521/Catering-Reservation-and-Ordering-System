import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Navbar
import Navbar from "./components/Navbar/Navbar";

// Auth Pages
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";

// Protected Page
import Home from "./pages/Home/Home";

// Common Components
import ProtectedRoute from "./components/Common/ProtectedRoute";
import UploadProduct from "./pages/UploadProduct/UploadProduct";
import ViewProducts from "./pages/View Products/ViewProducts";
import Cart from "./pages/Cart/Cart";
import ViewOrders from "./pages/ViewOrders/ViewOrders";
import ViewMyProductOrders from "./pages/ViewMyProductOrders/ViewMyProductOrders";
import UserProfile from "./pages/UserProfile/UserProfile";

// CSS
import "./App.css";

const App = () => {
  // Import BookAppointment component

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Route */}
        <Route path="/" element={<Home />} />
        <Route
          path="/upload-product"
          element={
            <ProtectedRoute>
              <UploadProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-product"
          element={
            <ProtectedRoute>
              <ViewProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-orders"
          element={
            <ProtectedRoute>
              <ViewOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-order"
          element={
            <ProtectedRoute>
              <ViewMyProductOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
