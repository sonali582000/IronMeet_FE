import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import styles from "../styles/Profile.module.css";

const ProfilePage = () => {
  const [user, setUser] = useState([]);
  const { userId, logout } = useContext(AuthContext);
  console.log(userId);

  const fetchUser = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/${userId}`
      );
      if (response.ok) {
        const userData = await response.json();
        console.log(userData);
        setUser(userData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId]); //we add user id on the array to have it again after refreshing the page

  return (
    <div>
      <div className={styles.userPageTitle}>        <h1>Users page</h1>
      </div>

      
      <div className={styles.profileContainer}>
        <div className={styles.welcomeSection}>
          <p className={styles.userEmail}>
            Welcome Ironhacker! <span className={styles.userEmail}>{user.userName}</span>!
          </p>
        </div>
        <div className={styles.profile_section}>
          <span className={styles.profilePicture}>{user.profile_picture}</span>
        </div>
     
      </div>
      <div className={styles.buttonWrapper}>
        <button className={styles.buttonLogOut} onClick={logout}>Log out</button>

      </div>
    </div>
  );
};

export default ProfilePage;
