import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';


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
            <p>{user.email}</p>
        </div>
    );
};

export default ProfilePage;
