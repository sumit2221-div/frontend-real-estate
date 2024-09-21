import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import photo from "../assets/wp4110662.jpg";
import house from "../assets/house.png";
import protect from "../assets/protected.png";
import buy from "../assets/buy.png";
import Propertysection from './propertysection.jsx';

function Home() {
  const [query, setQuery] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (searchQuery = '') => {
    const finalQuery = searchQuery || query;
    if (finalQuery.trim()) {
      navigate(`/properties?query=${encodeURIComponent(finalQuery)}`);
    }
  };

  const handlePresetSearch = (presetQuery) => {
    navigate(`/properties?type=${encodeURIComponent(presetQuery)}`);
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const threshold = 400; // Change this value based on when you want the effect to start
    if (scrollPosition > threshold) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Background image with overlay */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          backgroundImage: `url(${photo})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'rgba(0, 0, 0, 0.5)' }}>
          <Box sx={{ textAlign: 'center', maxWidth: '600px', px: 2 }}>
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
              Believe in Finding it
            </Typography>
            <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
              Search Properties for Sale and Rent
            </Typography>
            {/* Search box */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
              <TextField
                variant="outlined"
                placeholder="Enter property details"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                sx={{ flex: 1, bgcolor: 'white' }}
              />
              <Button
                variant="contained"
                onClick={() => handleSearch()}
                sx={{
                  bgcolor: 'green.500',
                  '&:hover': { bgcolor: 'green.600' },
                }}
              >
                Search
              </Button>
            </Box>

            {/* Preset buttons */}
            <Box sx={{ mt: 2 }}>
              {['Building', 'Flat', 'Plot', 'Bungalow'].map((type) => (
                <Button
                  key={type}
                  variant="outlined"
                  onClick={() => handlePresetSearch(type.toLowerCase())}
                  sx={{
                    mx: 1,
                    color: 'white',
                    borderColor: 'green.400',
                    '&:hover': { borderColor: 'green.600', bgcolor: 'green.500' },
                  }}
                >
                  {type}
                </Button>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Property section */}
      <Propertysection />

      {/* Why Us Section */}
      <Box sx={{ py: 12, bgcolor: 'gray.100', opacity: isVisible ? 1 : 0, transition: 'opacity 0.6s ease' }}>
        <Typography variant="h4" align="center" sx={{ color: 'gray.800', mb: 4 }}>
          Why You Should Work With Us
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[
            {
              img: house,
              title: "Wide Range of Properties",
              text: "We offer expert legal help for all related property in India.",
            },
            {
              img: buy,
              title: "Buy or Rent Homes",
              text: "We offer a large variety of properties across locations.",
            },
            {
              img: protect,
              title: "Trusted by Thousands",
              text: "Our clients trust us for professional service and support.",
            },
          ].map((item, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Card sx={{ textAlign: 'center', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                <CardMedia component="img" image={item.img} alt={item.title} sx={{ width: '100px', margin: 'auto', mb: 2 }} />
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'gray.600' }}>
                    {item.text}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default Home;
