import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { login as authLogin } from '../store/authslice.js';
import axios from 'axios';
import { Link } from 'react-router-dom';
import InputTab from '../elements/input';
import Loader from '../elements/loader.jsx';

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
        console.log(response.data);
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
    <>
      <div className='w-full h-lvh'>
        <form className='max-w-md p-6 mx-auto mt-40 rounded-md shadow-md shadow-gray-700' onSubmit={handlesubmit}>
          <h1 className="text-2xl text-center text-green-800">Login</h1>
          {error && <p className="text-center text-red-500">{error}</p>}
          <InputTab
            label="email"
            type="text"
            value={formData.email}
            onChange={handleChange}
            name="email"
            placeholder="Enter email"
            required
          />
          <div className="relative">
            <InputTab
              label="password"
              type={showPassword ? "text" : "password"} // Toggle between text and password
              value={formData.password}
              onChange={handleChange}
              name="password"
              placeholder="Enter password"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute flex items-center text-4xl text-gray-500 right-3 bottom-2"
            >
              {showPassword ? '👁️' : '🙈'} 
            </button>
          </div>
          <div className="flex flex-col justify-center">
            <button
              className="px-6 py-3 font-bold text-white transition-all duration-500 ease-in-out transform rounded-full shadow-lg bg-gradient-to-r from-green-900 to-green-900"
              type="submit"
            >
              SUBMIT
            </button>

            <p className="mt-2 text-base text-center text-gray-600">
              New user? <Link to="/registation" className="font-medium hover:underline">Sign up here</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
