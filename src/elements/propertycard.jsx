import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CiHeart } from "react-icons/ci";
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';

const PropertyCard = ({ property, onFavorite }) => {
  const navigate = useNavigate(); // Hook to navigate to different pages

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
      onFavorite(property._id); 
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  const handleViewDetails = () => {
    navigate(`/property/${property._id}`);
  };

  return (
    <Card className='mb-4 shadow-lg'>
      <CardMedia
        component="img"
        image={property.photos[0]} 
        alt={property.name}
        sx={{ height: 140, cursor: 'pointer' }}
        onClick={handleViewDetails} // Navigate on click
      />
      <CardContent>
        <Typography variant="h6" component="div" className='font-semibold'>
          {property.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Type: {property.type}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Size: {property.size}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Status: {property.status}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Cost: ${property.cost.toLocaleString()}
        </Typography>
        <div className='flex justify-between mt-2'>
          <Button
            onClick={handleFavorite}
            variant="contained"
            color="error"
            startIcon={<CiHeart />}
            sx={{
              px: 2,
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            Add to Favorites
          </Button>
          <Button
            onClick={handleViewDetails}
            variant="contained"
            color="primary"
            sx={{
              px: 4,
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
