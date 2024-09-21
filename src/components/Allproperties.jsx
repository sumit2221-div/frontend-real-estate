import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropertyCard from '../elements/propertycard.jsx'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const fetchProperties = async (filters) => {
  try {
    const response = await axios.get('https://real-estate-9ezs.onrender.com/api/property/', { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
};

const AllProperties = () => {
  const query = useQuery();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState(query.get('query') || '');
  const [type, setType] = useState(query.get('type') || '');
  const [size, setSize] = useState(query.get('size') || '');
  const [minCost, setMinCost] = useState(query.get('minCost') || '');
  const [maxCost, setMaxCost] = useState(query.get('maxCost') || '');
  const [city, setCity] = useState(query.get('city') || '');
  const [state, setState] = useState(query.get('state') || '');
  const [country, setCountry] = useState(query.get('country') || '');
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const filters = { query: searchQuery, type, size, minCost, maxCost, city, state, country };
    fetchProperties(filters).then(data => {
      setProperties(data || []);
    });
  }, [searchQuery, type, size, minCost, maxCost, city, state, country]);

  const updateQuery = (key, value) => {
    const newFilters = { ...{ query: searchQuery, type, size, minCost, maxCost, city, state, country }, [key]: value };
    const queryParams = new URLSearchParams(newFilters).toString();
    navigate(`/properties?${queryParams}`);
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search properties..."
          className="w-full max-w-lg p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            updateQuery('query', e.target.value);
          }}
        />
      </div>

      <div className="p-4 mb-6 bg-white rounded-lg shadow-md">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-7">
          <div className="flex flex-col gap-4">
            <select
              value={type}
              onChange={(e) => updateQuery('type', e.target.value)}
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Type</option>
              <option value="flat">flat</option>
              <option value="plot">plot</option>
              <option value="bungalow">bungalow</option>
              <option value="building">building</option>
            </select>
          </div>

          <div className="flex flex-col gap-4">
            <select
              value={size}
              onChange={(e) => updateQuery('size', e.target.value)}
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Size</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>

          <div className="flex flex-col gap-4">
            <input
              type="number"
              placeholder="Min Cost"
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={minCost}
              onChange={(e) => setMinCost(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-4">
            <input
              type="number"
              placeholder="Max Cost"
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={maxCost}
              onChange={(e) => setMaxCost(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="City"
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="State"
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Country"
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
        </div>
      </div>

      {properties.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {properties.map(property => (
            <PropertyCard 
              key={property._id} 
              property={property} 
              onFavorite={() => favoriteProperty(property._id)} 
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No properties found.</p>
      )}
    </div>
  );
};

export default AllProperties;
