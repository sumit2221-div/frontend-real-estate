import React from 'react';
import InputTab from '../elements/input';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { login as authLogin } from '../store/authslice.js';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState(""); // State to hold error message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://real-estate-9ezs.onrender.com/api/auth/login", formData);
      if (response.status === 200) {
        console.log(response.data);
        dispatch(authLogin({ email: formData.email, password: formData.password }));
       navigate("/")
      }
    } catch (error) {
      if (error.response) {
       
        setError(error.response.data.message);
      } else if (error.request) {
        
        setError("No response received from the server. Please try again.");
      } else {
       
        setError("Error setting up the request. Please try again.");
      }
    }
  };

  return (
    <div className='w-full h-lvh'>
      <form className='max-w-md p-6 mx-auto mt-40 rounded-md shadow-md shadow-green-700' onSubmit={handlesubmit}>
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
        <InputTab
          label="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          name="password"
          placeholder="Enter password"
          required
        />
        <div className='flex justify-center'>
          <button className="px-10 py-4 text-center text-white bg-green-900 rounded-xl" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
