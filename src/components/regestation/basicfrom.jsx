import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function BasicInfoForm({ formData, handleChange, nextStep }) {
  const [error, setError] = useState('');

  const handleNext = () => {
    // Check if all fields are filled
    if (
      formData.fullname.trim() === '' ||
      formData.email.trim() === '' ||
      formData.contact.trim() === '' ||
      formData.password.trim() === ''
    ) {
      setError('Please fill out all fields.');
    } else {
      setError('');
      nextStep();
    }
  };

  return (
    <div className="max-w-md p-6 mx-auto mt-10 rounded-md shadow-md shadow-gray-700">
      <h2 className="mb-4 text-xl font-bold text-center text-green-800">registation form</h2>
      {error && <p className="mb-4 text-center text-red-500">{error}</p>}
      <form>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-600">Full Name</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter your full name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-600">Contact</label>
          <input
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter your contact number"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-600">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter your password"
            required
          />
        </div>
      
        <button
          type="button"
          onClick={handleNext}
        
          className="w-full px-10 py-3 font-bold text-white transition-all duration-500 ease-in-out transform rounded-full shadow-lg bg-gradient-to-r from-green-900 to-green-900"
        
       
        >
          Next
        </button>
        <p className="mt-2 text-base text-center text-gray-600">
            Already have a account? <Link to="/login" className="font-medium hover:underline">login here</Link>
          </p>
      </form>
    </div>
  );
}

export default BasicInfoForm;
