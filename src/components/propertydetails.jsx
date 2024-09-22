import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Button, Card, CardContent, CardMedia } from '@mui/material';
import Loader from '../elements/loader.jsx';
import { VscChevronLeft,VscChevronRight } from "react-icons/vsc";

const PropertyDetail = () => {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);
  const [owner, setOwner] = useState(null);
  const [address, setAddress] = useState(null); // State for address
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`https://real-estate-9ezs.onrender.com/api/property/${propertyId}`);
        setProperty(response.data);

        const ownerResponse = await axios.get(`https://real-estate-9ezs.onrender.com/api/auth/${response.data.owner}`);
        setOwner(ownerResponse.data);

        // Fetch address data using the address ID from the property
        const addressResponse = await axios.get(`https://real-estate-9ezs.onrender.com/api/address/${response.data.address}`);
        setAddress(addressResponse.data);
      } catch (error) {
        setError('Error fetching property, owner, or address details');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId]);

  if (loading) return <Loader />;
  if (error) return <Typography color="error">{error}</Typography>;

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === property.photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === 0 ? property.photos.length - 1 : prevIndex - 1
    );
  };

  return (
    <Box maxWidth="lg" mx="auto" mt={5} p={2}>
      <Typography variant="h4" align="center" gutterBottom>
        {property.name}
      </Typography>

      <Box position="relative" display="flex" justifyContent="center" mt={4}>
        <CardMedia
          component="img"
          image={property.photos[currentPhotoIndex]}
          alt={`Property ${property.name}`}
          sx={{
            maxHeight: '60vh',
            width: '100%',
            objectFit: 'cover',
            borderRadius: '12px',
            boxShadow: 3
          }}
        />

        <Button
          onClick={handlePrevPhoto}
          sx={{ position: 'absolute', left: 16, top: '50%', bgcolor: "black" }}
          variant="contained"
        >
          <VscChevronLeft/>
        </Button>
        <Button
          onClick={handleNextPhoto}
          sx={{ position: 'absolute', right: 16, top: '50%', bgcolor: "black" }}
          variant="contained"
        >
          <VscChevronRight/>
        </Button>
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mt={4}>
        <Card sx={{ flex: 1, mr: 2, p: 2, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Property Details
            </Typography>
            <Typography variant="body1">Type: {property.type}</Typography>
            <Typography variant="body1">Size: {property.size}</Typography>
            <Typography variant="body1">Status: {property.status}</Typography>
            <Typography variant="body1">Cost: ${property.cost.toLocaleString()}</Typography>
          </CardContent>
        </Card>

        {address && (
          <Card sx={{ flex: 1, ml: 2, p: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Address Information
              </Typography>
              <Typography variant="body1">Street: {address.street}</Typography>
              <Typography variant="body1">City: {address.city}</Typography>
              <Typography variant="body1">State: {address.state}</Typography>
              <Typography variant="body1">Zip: {address.postal_code}</Typography>
            </CardContent>
          </Card>
        )}
      </Box>

      {owner && (
        <Card sx={{ mt: 4, p: 2, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Owner Information
            </Typography>
            <Typography variant="body1">Name: {owner.fullname}</Typography>
            <Typography variant="body1">Email: {owner.email}</Typography>
            <Typography variant="body1">Contact: {owner.contact}</Typography>
            <Box mt={2}>
              <Typography variant="body2" color="textSecondary">
                If you're interested in this property, feel free to contact the owner.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default PropertyDetail;
