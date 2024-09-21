import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropertyCard from '../elements/propertycard.jsx';

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = localStorage.getItem('accessToken');

  const fetchUserDetails = async () => {
    if (!accessToken) {
      setError('Access token not found. Please log in again.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get('https://real-estate-9ezs.onrender.com/api/auth/user-details', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setUserDetails(response.data);
    } catch (error) {
      setError('Error fetching user details.');
      console.error('Error fetching user details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-4">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
        <h1 className="mb-4 text-3xl font-bold">User Profile</h1>
        <div className="flex items-center mb-6">
          {userDetails.avatar ? (
            <img
              src={userDetails.avatar}
              alt={`${userDetails.fullname}'s avatar`}
              className="w-24 h-24 mr-4 rounded-full"
            />
          ) : (
            <div className="w-24 h-24 mr-4 bg-gray-200 rounded-full"></div>
          )}
          <div>
            <h2 className="text-xl font-semibold">{userDetails.fullname}</h2>
            <p className="text-gray-700">{userDetails.email}</p>
            <p className="text-gray-700">{userDetails.contact || 'Contact information not provided'}</p>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-bold">Uploaded Properties:</h3>
          {userDetails.uploadedProperties && userDetails.uploadedProperties.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {userDetails.uploadedProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">You have not uploaded any properties yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
