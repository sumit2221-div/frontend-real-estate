import React from 'react';
import axios from 'axios';
import { CiHeart } from "react-icons/ci";

const PropertyCard = ({ property, onFavorite }) => {
  const handleFavorite = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const params = new URLSearchParams({ propertyId: property._id }).toString();

      await axios.post(
        `https://real-estate-9ezs.onrender.com/api/favorite?${params}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      onFavorite(property._id); // Call the parent function to update favorites
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  return (
    <div className='p-4 mb-4 bg-white rounded-lg shadow-lg'>
      <img
        src={property.photos[0]} // Display the first photo
        alt={property.name}
        className='object-cover w-full h-40 rounded-t-lg'
      />
      <div className='p-4'>
        <h2 className='text-xl font-semibold'>{property.name}</h2>
        <p className='text-gray-600'>Type: {property.type}</p>
        <p className='text-gray-600'>Size: {property.size}</p>
        <p className='text-gray-600'>Cost: ${property.cost.toLocaleString()}</p>
        <button 
          onClick={handleFavorite} 
          className='flex items-center justify-center px-2 py-1 mt-2 text-lg text-white transition duration-300 ease-in-out transform bg-red-600 rounded-full shadow hover:bg-red-700 hover:scale-105'
        >
          <CiHeart className='mr-1' />
          <span className='hidden md:inline'>Add to Favorites</span>
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
