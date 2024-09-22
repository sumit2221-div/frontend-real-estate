import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyCard from '../elements/propertycard.jsx';
import { Box, Button, Typography, CircularProgress, Grow } from '@mui/material';

function PropertySection() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const fetchProperties = async (filter = '') => {
    setLoading(true);
    setError('');
    try {
      let url = 'https://real-estate-9ezs.onrender.com/api/property';
      if (filter) {
        url += `?status=${filter}`;
      }
      console.log('Fetching properties from URL:', url);
      const response = await axios.get(url);
      console.log('Fetched properties:', response.data);
      setProperties(response.data);
    } catch (err) {
      console.error('Error fetching properties:', err);
      setError('Failed to fetch properties');
    } finally {
      setLoading(false);
    }
  };

  const favoriteProperty = async (propertyId) => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      await axios.post(
        `https://real-estate-9ezs.onrender.com/api/favorite/${propertyId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      alert('Property added to favorites!');
    } catch (error) {
      console.error('Error favoriting property:', error);
      alert('Failed to add property to favorites.');
    }
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const threshold = 400;
    setIsVisible(scrollPosition > threshold);
  };

  useEffect(() => {
    fetchProperties(); // Fetch all properties on initial load
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box className='w-full p-6 bg-white'>
      <Box className='flex flex-col items-center justify-center mb-6 space-y-4 md:flex-row md:space-y-0 md:space-x-4'>
        <Button variant="contained" color="primary" onClick={() => fetchProperties()}>
          All Properties
        </Button>
        <Button variant="contained" color="success" onClick={() => fetchProperties('sale')}>
          For Sale
        </Button>
        <Button variant="contained" color="warning" onClick={() => fetchProperties('rent')}>
          For Rent
        </Button>
      </Box>

      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}

      <Box className='grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {properties.map((property) => (
          <Grow in={isVisible} timeout={1000} key={property._id}>
            <div>
              <PropertyCard 
                property={property} 
                onFavorite={() => favoriteProperty(property._id)} 
              />
            </div>
          </Grow>
        ))}
      </Box>
    </Box>
  );
}

export default PropertySection;
