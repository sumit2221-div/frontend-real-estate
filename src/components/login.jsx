import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { login as authLogin } from '../store/authslice.js';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { TextField, Button, CircularProgress, Snackbar, Box, Fade } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material'; // Import icons

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formVisible, setFormVisible] = useState(false); // For fade animation

  // Trigger fade animation on component mount
  useEffect(() => {
    setFormVisible(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("https://real-estate-9ezs.onrender.com/api/auth/login", formData);
      if (response.status === 200) {
        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        dispatch(authLogin({ email: formData.email, password: formData.password }));
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else if (error.request) {
        setError("No response received from the server. Please try again.");
      } else {
        setError("Error setting up the request. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="flex items-center justify-center w-full h-lvh">
      {loading ? (
        <CircularProgress />
      ) : (
        <Fade in={formVisible} timeout={1000}>
          <Box component="div" sx={{ width: '100%', maxWidth: '400px' }}>
            <form
              className='max-w-md p-6 rounded-md shadow-md'
              onSubmit={handlesubmit}
              style={{ backgroundColor: "#fff" }}
            >
              <h1 className="text-2xl text-center text-green-800">Login</h1>
              {error && (
                <Snackbar
                  open={true}
                  message={error}
                  autoHideDuration={6000}
                  onClose={() => setError("")}
                />
              )}

              <TextField
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                name="email"
                placeholder="Enter email"
                fullWidth
                required
                margin="normal"
              />

              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                name="password"
                placeholder="Enter password"
                fullWidth
                required
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <Button onClick={togglePasswordVisibility} color="inherit">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </Button>
                  ),
                }}
              />

              <Box className="flex flex-col justify-center">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  sx={{
                    mt: 2,
                    background: 'linear-gradient(90deg, #16a085, #27ae60)',
                    backgroundSize: '200% auto',
                    color: 'white',
                    transition: '0.5s',
                    '&:hover': {
                      backgroundPosition: 'right center',
                    },
                  }}
                >
                  Submit
                </Button>

                <p className="mt-2 text-base text-center text-gray-600">
                  New user? <Link to="/registation" className="font-medium hover:underline">Sign up here</Link>
                </p>
              </Box>
            </form>
          </Box>
        </Fade>
      )}
    </Box>
  );
}

export default Login;
