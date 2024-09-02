import React from 'react';

const PropertyCard = ({ property }) => {
  return (
    <div className='p-4 mb-4 bg-white rounded-lg shadow-lg'>
      <img
        src={property.photos[0]} // Display the first photo
        alt={property.name}
        className='object-cover w-full h-40 rounded-t-lg'
      />
      <div className='p-4'>
        <h2 className='text-xl font-semibold'>{property.name}</h2>
        <p className='text-gray-600'>Type: {property.type}</p>
        <p className='text-gray-600'>Size: {property.size}</p>
        <p className='text-gray-600'>Cost: ${property.cost.toLocaleString()}</p>
       
      </div>
    </div>
  );
};

export default PropertyCard
