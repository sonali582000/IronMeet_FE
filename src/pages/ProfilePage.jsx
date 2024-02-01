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
    console.log(user)
  }, [userId]); //we add user id on the array to have it again after refreshing the page

  return (
    <div>

      <div className={styles.profileContainer}>
        <div className={styles.welcomeSection}>
          <p className={styles.username}>
            Welcome {user.username}
          </p>
        </div>


      </div>
      <div className={styles.buttonWrapper}>
        <button className={styles.buttonLogOut} onClick={logout}>Log out</button>

      </div>
    </div>
  );
};

export default ProfilePage;
