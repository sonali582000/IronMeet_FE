<<<<<<< HEAD
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const ProfilePage = () => {
  const [user, setUser] = useState([]);
  const { userId } = useContext(AuthContext);
  console.log(userId);

  const fetchUser = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/user/${userId}`
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
      <h1>Users page</h1>
      <p>{user.email}</p>
    </div>
  );
=======
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import styles from '../styles/Profile.module.css';

const ProfilePage = () => {
    const [user, setUser] = useState([]);
    const { userId } = useContext(AuthContext);
    console.log(userId)


    const fetchUser = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/user/${userId}`);
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
        if (
            userId
        ) {
            fetchUser();

        }
    }, [userId]); //we add user id on the array to have it again after refreshing the page

    return (
     
        <div>
            <h1>Users page</h1>
            <div className={styles.profileContainer}>
                <div className={styles.welcomeSection}>
                    <p>Welcome <span className={styles.userEemail}>{user.email}</span>!</p>
                </div>
                <div className={styles.profile_section}>
                    <span className={styles.profilePicture}>{user.profile_picture}</span>
                </div>
                <div className={styles.eventSection}>
                    <h2>Events you are interested in:</h2>
                    {/* display events here */}
                </div>
            </div>
        </div>

    );
>>>>>>> c9e58044989745b705ccb1d697095f2d0bafe79b
};

export default ProfilePage;
