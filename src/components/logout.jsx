import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { logout } from '../store/authslice.js'; // Adjust the path based on your project structure

function LogoutButton() {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        const accessToken = localStorage.getItem('accessToken');

        console.log('Access Token:', accessToken); 
        

        setLoading(true);
        try {
            const response = await axios.post(
                'https://real-estate-9ezs.onrender.com/api/auth/logout',
            null,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                }
            );

            if (response.status === 200) {
                // Dispatch the logout action to clear user state in Redux
                dispatch(logout());

                // Remove the access token from local storage
                localStorage.removeItem('accessToken');

                // Redirect to the login page
                navigate('/login');
            } else {
                console.error('Unexpected Response Status:', response.status);
            }
        } catch (error) {
            if (error.response) {
                console.error('Logout failed:', error.response.data || error.message);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error setting up request:', error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button 
                onClick={handleLogout} 
                className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-600"
                disabled={loading}
            >
                {loading ? 'Logging out...' : 'Logout'}
            </button>
        </div>
    );
}

export default LogoutButton;
