import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropertyCard from '../elements/propertycard.jsx';

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const accessToken = localStorage.getItem('accessToken');

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get('https://real-estate-9ezs.onrender.com/api/auth/user-details', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      setUserDetails(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  if (!userDetails) {
    return (
      <div className='flex items-center justify-center w-full h-lvh'>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center w-full p-4 h-lvh'>
      <div className='w-full h-auto max-w-2xl p-4 bg-white rounded-lg shadow-2xl'>
        <h1 className='mb-4 text-2xl font-bold'>User Profile</h1>
        <div className='flex items-center mb-4'>
          {userDetails.avatar && (
            <img
              src={userDetails.avatar}
              alt={`${userDetails.fullname}'s avatar`}
              className='w-24 h-24 mr-4 rounded-full'
            />
          )}
          <div>
            <h2 className='text-xl font-semibold'>{userDetails.fullname}</h2>
            <p className='text-gray-700'>{userDetails.email}</p>
            <p className='text-gray-700'>{userDetails.contact}</p>
          </div>
        </div>
        <div>
          <h3 className='mb-2 text-lg font-bold'>Uploaded Properties:</h3>
          {userDetails.uploadedProperties && userDetails.uploadedProperties.length > 0 ? (
            userDetails.uploadedProperties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))
          ) : (
            <p>No properties uploaded.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
