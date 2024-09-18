import React, { useState } from 'react';
import axios from 'axios';

function Propertysection() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProperties = async (filter) => {
    setLoading(true);
    setError('');
    try {
      let url = 'https://your-backend-url.com/api/property/';
      if (filter) {
        url += `?status=${filter}`;
      }
      const response = await axios.get(url);
      setProperties(response.data);
    } catch (err) {
      setError('Failed to fetch properties');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full p-6 bg-white h-lvh'>
      <div className='flex items-center justify-center mb-6 space-x-4'>
        <button
          className='px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600'
          onClick={() => fetchProperties()} // Fetch all properties
        >
          All Properties
        </button>
        <button
          className='px-6 py-2 text-white bg-green-500 rounded hover:bg-green-600'
          onClick={() => fetchProperties('for sale')} // Fetch properties for sale
        >
          For Sale
        </button>
        <button
          className='px-6 py-2 text-white bg-orange-500 rounded hover:bg-orange-600'
          onClick={() => fetchProperties('for rent')} // Fetch properties for rent
        >
          For Rent
        </button>
      </div>

      {loading && <p>Loading properties...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {properties.map((property) => (
          <div key={property.id} className='p-4 border rounded shadow'>
            <h3 className='text-lg font-semibold'>{property.name}</h3>
            <p>{property.type}</p>
            <p>{property.status === 'for sale' ? 'For Sale' : 'For Rent'}</p>
            <p>Cost: ${property.cost}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Propertysection;
