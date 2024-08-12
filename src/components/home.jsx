import React from 'react';
import photo from "../assets/wp4110662.jpg";

function Home() {
  return (
    <div className="relative w-full bg-center bg-cover h-lvh" style={{ backgroundImage: `url(${photo})` }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg">
          <h1 className="mb-4 text-xl font-semibold text-center">Search Properties</h1>
          <input
            type="text"
            placeholder="Enter property details"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
