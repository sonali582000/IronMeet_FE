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
        // <div>
        //     <h1>Users page</h1>
        //     <div>
        //         <p>Welcome {user.email}!  </p>
        //     </div>
        //     <div>
        //         <span>{user.profile_picture}</span>
        //     </div>
        // </div>
        <div>
            <h1>Users page</h1>
            <div className="profile-container">
                <div className="welcome-section">
                    <p>Welcome <span className="user-email">{user.email}</span>!</p>
                </div>
                <div className="profile-section">
                    <span className="profile-picture">{user.profile_picture}</span>
                </div>
                <div className="events-section">
                    <h2>Events you are interested in:</h2>
                    {/* display events here */}
                </div>
            </div>
        </div>

    );
};

export default ProfilePage;
