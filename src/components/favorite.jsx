import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyCard from '../elements/propertycard.jsx'

function Favorite() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get('https://real-estate-9ezs.onrender.com/api/favorite/', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        const favoriteIds = response.data.favProperty.map(fav => fav.property[0]);
        const propertyResponses = await Promise.all(favoriteIds.map(id =>
          axios.get(`https://real-estate-9ezs.onrender.com/api/property/${id}`)
        ));

        const fetchedProperties = propertyResponses.map(res => res.data);
        setProperties(fetchedProperties);
      } catch (error) {
        console.error('Error fetching favorites:', error);
        setError('Failed to fetch favorites. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className='flex flex-col items-center justify-center w-full h-screen bg-gray-100'>
      <h1 className='mb-6 text-3xl font-bold text-blue-600'>Favorites</h1>
      {loading ? (
        <p>Loading favorites...</p>
      ) : error ? (
        <p className='text-red-500'>{error}</p>
      ) : properties.length > 0 ? (
        <ul className='w-full max-w-xl space-y-8'>
          {properties.map((property) => (
            <li key={property._id} className='p-4 transition-shadow bg-white border rounded-lg shadow-lg hover:shadow-xl'>
              <PropertyCard property={property} />
            </li>
          ))}
        </ul>
      ) : (
        <p className='text-gray-500'>You have no favorite properties yet.</p>
      )}
    </div>
  );
}

export default Favorite;
