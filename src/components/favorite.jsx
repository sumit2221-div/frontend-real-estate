import React from 'react';

function Favorite() {
  const favorites = []; // This would be populated with actual data

  return (
    <div className='w-full h-[100vh] flex flex-col items-center justify-center'>
      <h1 className='mb-4 text-2xl font-bold'>Favorites</h1>
      {favorites.length > 0 ? (
        <ul className='space-y-4'>
          {favorites.map((item, index) => (
            <li key={index} className='p-4 border rounded shadow'>
              {item.name}
            </li>
          ))}
        </ul>
      ) : (
        <p className='text-gray-500'>You have no favorite properties yet.</p>
      )}
    </div>
  );
}

export default Favorite;
