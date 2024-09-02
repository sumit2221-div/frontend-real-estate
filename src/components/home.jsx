import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import photo from "../assets/wp4110662.jpg";
import house from "../assets/house.png";
import protect from "../assets/protected.png";
import buy from "../assets/buy.png";

function Home() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (searchQuery = '') => {
    const finalQuery = searchQuery || query;
    if (finalQuery.trim()) {
      navigate(`/properties?query=${encodeURIComponent(finalQuery)}`);
    }
  };

  const handlePresetSearch = (presetQuery) => {
    navigate(`/properties?type=${encodeURIComponent(presetQuery)}`);
  };

  return (
    <>
      <div className="relative w-full h-screen bg-center bg-cover" style={{ backgroundImage: `url(${photo})` }}>
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="flex flex-col items-center w-full p-4 bg-transparent rounded-lg shadow-lg sm:p-6">
            <h1 className="text-4xl text-center text-white sm:text-6xl lg:text-8xl">Believe in Finding it</h1>
            <h2 className="mb-4 text-lg font-semibold text-center text-white sm:mb-6 sm:text-2xl">
              Search Properties for Sale and Rent
            </h2>
            <div className="flex flex-col sm:flex-row items-center w-full sm:w-[700px] mb-4 h-[50px] sm:h-[70px]">
              <input
                type="text"
                placeholder="Enter property details"
                className="w-full h-full p-2 text-gray-700 placeholder-gray-500 border border-gray-300 sm:p-4 rounded-t-2xl sm:rounded-l-2xl sm:rounded-t-none focus:outline-none focus:ring-2 focus:ring-green-500"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                onClick={() => handleSearch()}
                className="w-full h-full p-3 text-white transition-transform transform bg-green-500 sm:w-auto sm:p-4 rounded-b-2xl sm:rounded-r-2xl sm:rounded-b-none hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 hover:scale-105"
              >
                Search
              </button>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <button
                onClick={() => handlePresetSearch('building')}
                className="px-6 py-3 text-sm font-semibold text-white transition-all transform rounded-full shadow-lg bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Building
              </button>
              <button
                onClick={() => handlePresetSearch('flat')}
                className="px-6 py-3 text-sm font-semibold text-white transition-all transform rounded-full shadow-lg bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Flat
              </button>
              <button
                onClick={() => handlePresetSearch('plot')}
                className="px-6 py-3 text-sm font-semibold text-white transition-all transform rounded-full shadow-lg bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Plot
              </button>
              <button
                onClick={() => handlePresetSearch('bungalow')}
                className="px-6 py-3 text-sm font-semibold text-white transition-all transform rounded-full shadow-lg bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Bungalow
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center py-10 bg-white sm:py-20">
        <h1 className="mt-6 font-mono text-3xl text-center text-black sm:mt-10 sm:text-4xl lg:text-5xl">
          Why You Should Work With Us
        </h1>
        <div className="flex flex-col sm:flex-row w-full sm:w-[1200px] h-auto sm:h-[350px] justify-around items-center mt-6 sm:mt-10 space-y-4 sm:space-y-0">
          <div className="flex flex-col items-center justify-center w-full h-auto p-4 text-center bg-white shadow-xl rounded-xl sm:w-1/4 sm:h-full">
            <img src={house} alt="House" className="w-[90px] h-[70px] mb-4" />
            <h1 className="mb-2 text-xl font-semibold">Wide Range of Properties</h1>
            <p className="text-sm">We offer expert legal help for all related property in India.</p>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-auto p-4 text-center bg-white shadow-xl rounded-xl sm:w-1/4 sm:h-full">
            <img src={buy} alt="Buy or Rent" className="w-[90px] h-[70px] mb-4" />
            <h1 className="mb-2 text-xl font-semibold">Buy or Rent Homes</h1>
            <p className="text-sm">We offer expert legal help for all related property in India.</p>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-auto p-4 text-center bg-white shadow-xl rounded-xl sm:w-1/4 sm:h-full">
            <img src={protect} alt="Trusted by Thousands" className="w-[90px] h-[70px] mb-4" />
            <h1 className="mb-2 text-xl font-semibold">Trusted by Thousands</h1>
            <p className="text-sm">We offer expert legal help for all related property in India.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;