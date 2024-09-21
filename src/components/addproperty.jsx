import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  const [photoPreviews, setPhotoPreviews] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const accessToken = localStorage.getItem('accessToken')
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhotoChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const totalPhotos = formData.photos.length + selectedFiles.length;
    if (totalPhotos > 7) {
      setError('You can upload a maximum of 7 photos.');
    } else {
      setError('');
      const updatedPhotos = [...formData.photos, ...selectedFiles];
      setFormData({ ...formData, photos: updatedPhotos });
      const previews = updatedPhotos.map((file) => URL.createObjectURL(file));
      setPhotoPreviews(previews);
    }
  };

  const removePhoto = (indexToRemove) => {
    const updatedPhotos = formData.photos.filter((_, index) => index !== indexToRemove);
    const updatedPreviews = photoPreviews.filter((_, index) => index !== indexToRemove);
    setFormData({ ...formData, photos: updatedPhotos });
    setPhotoPreviews(updatedPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
   
  
    const dataToSubmit = new FormData();
    console.log(dataToSubmit)
  
    // Append all form data to FormData object
    for (const key in formData) {
      if (key === 'photos') {
        for (let i = 0; i < formData.photos.length; i++) {
          dataToSubmit.append('photos', formData.photos[i]);
        }
      } else {
        // Ensure status and all other fields are added
        dataToSubmit.append(key, formData[key]);
      }
    }
  
    try {
      await axios.post('https://real-estate-9ezs.onrender.com/api/property', dataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      alert('Property added successfully');
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
      setPhotoPreviews([]);
      setStep(1);
    } catch (error) {
      console.error('Error adding property:', error);
      alert('An error occurred while adding the property');
    } finally {
      setLoading(false);
    
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
              <div className="mb-4">
                <label className="block text-gray-700">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Type:</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="building">building</option>
                  <option value="flat">flat</option>
                  <option value="plot">plot</option>
                  <option value="bungalow">bungalow</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">About:</label>
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Size:</label>
                <input
                  type="text"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Cost:</label>
                <input
                  type="text"
                  name="cost"
                  value={formData.cost}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Street:</label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">City:</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">State:</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Postal Code:</label>
                <input
                  type="text"
                  name="postal_code"
                  value={formData.postal_code}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Country:</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
  <label className="block text-gray-700">Status:</label>
  <select
    name="status"
    value={formData.status}
    onChange={handleChange}
    className="w-full p-2 border rounded"
    required
  >
    <option value="">Select Status</option>
    <option value="sell">sell</option>
    <option value="rent">rent</option>
  </select>
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
            <h2 className='mb-4 text-xl font-semibold'>Step 2: Upload Photos (7)</h2>
            <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label className='block text-gray-700'>Photos:</label>
                <input
                  type='file'
                  multiple
                  onChange={handlePhotoChange}
                  disabled={formData.photos.length >= 7}
                  className='w-full'
                />
                {error && <p className="mt-2 text-red-500">{error}</p>}

                <div className="flex flex-wrap mt-4">
                  {photoPreviews.map((preview, index) => (
                    <div key={index} className="relative w-1/4 p-2">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="object-cover w-full h-24 rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute top-0 right-0 p-1 text-white bg-red-600 rounded-full"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type='button'
                  onClick={() => setStep(1)}
                  className='px-4 py-2 text-white bg-gray-500 rounded'
                >
                  Back
                </button>
                <button
                  type='submit'
                  className='px-4 py-2 text-white bg-green-500 rounded'
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AddProperty;
