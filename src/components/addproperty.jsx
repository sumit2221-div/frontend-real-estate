import React, { useState } from 'react';
import axios from 'axios';

const AddProperty = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    about: '',
    size: '',
    cost: '',
    street: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
    status: '',
    photos: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhotoChange = (e) => {
    setFormData({
      ...formData,
      photos: [...e.target.files],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data for uploading
    const dataToSubmit = new FormData();
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        if (key === 'photos') {
          for (let i = 0; i < formData.photos.length; i++) {
            dataToSubmit.append('photos', formData.photos[i]);
          }
        } else {
          dataToSubmit.append(key, formData[key]);
        }
      }
    }

    try {
      await axios.post('https://your-api-endpoint.com/api/properties', dataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Property added successfully');
      // Reset form or navigate
      setFormData({
        name: '',
        type: '',
        about: '',
        size: '',
        cost: '',
        street: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
        status: '',
        photos: [],
      });
      setStep(1); // Go back to step 1 or redirect
    } catch (error) {
      console.error('Error adding property:', error);
      alert('An error occurred while adding the property');
    }
  };

  return (
    <div className='p-4'>
      <div className='max-w-2xl p-6 mx-auto bg-white rounded-lg shadow-lg'>
        {step === 1 && (
          <>
            <h2 className='mb-4 text-xl font-semibold'>Step 1: Fill Property Details</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStep(2);
              }}
            >
              <div className='mb-4'>
                <label className='block text-gray-700'>Name:</label>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded'
                  required
                />
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700'>Type:</label>
                <div className='flex gap-4'>
                  {['flat', 'building', 'plot', 'bungalow'].map((typeOption) => (
                    <label key={typeOption} className='flex items-center'>
                      <input
                        type='radio'
                        name='type'
                        value={typeOption}
                        checked={formData.type === typeOption}
                        onChange={handleChange}
                        className='mr-2'
                        required
                      />
                      {typeOption}
                    </label>
                  ))}
                </div>
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700'>About:</label>
                <textarea
                  name='about'
                  value={formData.about}
                  onChange={handleChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded'
                  rows='3'
                />
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700'>Size:</label>
                <input
                  type='text'
                  name='size'
                  value={formData.size}
                  onChange={handleChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded'
                  required
                />
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700'>Cost:</label>
                <input
                  type='number'
                  name='cost'
                  value={formData.cost}
                  onChange={handleChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded'
                  required
                />
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700'>Street:</label>
                <input
                  type='text'
                  name='street'
                  value={formData.street}
                  onChange={handleChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded'
                  required
                />
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700'>City:</label>
                <input
                  type='text'
                  name='city'
                  value={formData.city}
                  onChange={handleChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded'
                  required
                />
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700'>State:</label>
                <input
                  type='text'
                  name='state'
                  value={formData.state}
                  onChange={handleChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded'
                  required
                />
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700'>Postal Code:</label>
                <input
                  type='text'
                  name='postal_code'
                  value={formData.postal_code}
                  onChange={handleChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded'
                  required
                />
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700'>Country:</label>
                <input
                  type='text'
                  name='country'
                  value={formData.country}
                  onChange={handleChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded'
                  required
                />
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700'>Status:</label>
                <div className='flex gap-4'>
                  {['sell', 'rent'].map((statusOption) => (
                    <label key={statusOption} className='flex items-center'>
                      <input
                        type='radio'
                        name='status'
                        value={statusOption}
                        checked={formData.status === statusOption}
                        onChange={handleChange}
                        className='mr-2'
                        required
                      />
                      {statusOption}
                    </label>
                  ))}
                </div>
              </div>
              <button
                type='submit'
                className='px-4 py-2 text-white bg-blue-500 rounded'
              >
                Next: Upload Photos
              </button>
            </form>
          </>
        )}
        
        {step === 2 && (
          <>
            <h2 className='mb-4 text-xl font-semibold'>Step 2: Upload Photos</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
            >
              <div className='mb-4'>
                <label className='block text-gray-700'>Photos:</label>
                <input
                  type='file'
                  multiple
                  onChange={handlePhotoChange}
                  className='w-full'
                />
              </div>
              <button
                type='submit'
                className='px-4 py-2 text-white bg-green-500 rounded'
              >
                Submit Property
              </button>
              <button
                type='button'
                onClick={() => setStep(1)}
                className='px-4 py-2 ml-2 text-white bg-gray-500 rounded'
              >
                Back to Details
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AddProperty;
