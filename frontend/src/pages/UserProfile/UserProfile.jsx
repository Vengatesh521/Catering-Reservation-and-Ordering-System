import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import "./UserProfile.css";

function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/check-auth", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.isAuthenticated) {
          setUser(res.data.user);
        }
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
      });
  }, []);

  if (!user) {
    return (
      <>
        <Navbar user={null} />
        <div className="profile-container">
          <h2>Please log in to view your profile.</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar user={user} />
      <div className="profile-container">
        <div className="profile-card">
          <h2>👤 Profile</h2>
          <p>
            <strong>Username:</strong> {user.username || "N/A"}
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${user.email}`} className="profile-email">
              {user.email}
            </a>
          </p>
          <p>
            <strong>Role:</strong> {user.role || "User"}
          </p>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
