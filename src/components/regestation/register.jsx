import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BasicInfoForm from './basicfrom.jsx';
import AvatarForm from "./avatarform.jsx"
function Register() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    contact: '',
    password: '',
    avatar: null,
  });
  const [error, setError] = useState(''); // State to hold error messages
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAvatarChange = (e) => {
    setFormData({
      ...formData,
      avatar: e.target.files[0],
    });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    const registrationData = new FormData();
    registrationData.append('fullname', formData.fullname);
    registrationData.append('email', formData.email);
    registrationData.append('contact', formData.contact);
    registrationData.append('password', formData.password);
    if (formData.avatar) {
      registrationData.append('avatar', formData.avatar);
    }

    try {
      const response = await axios.post('https://real-estate-9ezs.onrender.com/api/auth/register', registrationData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.ok) {
        console.log('Registration successful:', response.data);
        navigate('/login'); 
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Registration failed. Please try again.');
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="w-full h-screen">
      {step === 1 && (
        <BasicInfoForm formData={formData} handleChange={handleChange} nextStep={nextStep} />
      )}
      {step === 2 && (
        <AvatarForm
          formData={formData}
          handleAvatarChange={handleAvatarChange}
          prevStep={prevStep}
          handleSubmit={handleSubmit}
        />
      )}
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}
    </div>
  );
}

export default Register;
