import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CiHeart } from "react-icons/ci";
import { Card, CardMedia, CardContent, Typography, Button, Grid } from '@mui/material';
import { FaRegEye } from 'react-icons/fa'; // Importing an eye icon for viewing details

const PropertyCard = ({ property, onFavorite }) => {
  const navigate = useNavigate();

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
    <Grid item xs={12} sm={6} md={4} lg={3}> {/* Responsive grid item */}
      <Card className='mb-4 shadow-lg'>
        <CardMedia
          component="img"
          image={property.photos[0]} 
          alt={property.name}
          sx={{ height: 140, cursor: 'pointer' }}
          onClick={handleViewDetails}
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
                display: { xs: 'flex', sm: 'none' } // Show only icon on mobile
              }}
            >
              <CiHeart className='text-lg' />
            </Button>
            <Button
              onClick={handleFavorite}
              variant="contained"
              color="error"
              sx={{
                display: { xs: 'none', sm: 'flex' }, // Show text on larger screens
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
              startIcon={<FaRegEye />} // Eye icon for view details
              sx={{
                px: 4,
                '&:hover': {
                  transform: 'scale(1.05)',
                },
                display: { xs: 'flex', sm: 'none' } // Show only icon on mobile
              }}
            >
              <FaRegEye className='text-lg' />
            </Button>
            <Button
              onClick={handleViewDetails}
              variant="contained"
              color="primary"
              sx={{
                display: { xs: 'none', sm: 'flex' }, // Show text on larger screens
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
    </Grid>
  );
};

export default PropertyCard;
