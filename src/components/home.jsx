import React from 'react';
import photo from "../assets/wp4110662.jpg";


function Home() {
  return (
    <>
    <div className="relative w-full h-screen bg-center bg-cover" style={{ backgroundImage: `url(${photo})` }}>
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
        <div className="flex flex-col items-center w-full p-6 bg-transparent rounded-lg shadow-lg">
          
          <h1 className="text-white text-8xl">Believe in Finding it</h1>
          <h2 className="mb-6 text-2xl font-semibold text-center text-white">
            Search Properties for Sale and Rent
          </h2>
          <div className="flex items-center w-[700px] mb-4 h-[70px]">
            <input
              type="text"
              placeholder="Enter property details"
              className="w-full h-full p-2 border border-gray-300 rounded-l-2xl focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="h-full p-5 text-white bg-green-500 rounded-r-2xl hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="flex flex-col items-center h-screen bg-white">
  <h1 className="mt-10 font-mono text-5xl text-center text-black">
    Why You Should Work With Us
  </h1>
  <div className="flex w-[1000px] h-[300px]  justify-around items-center mt-10">
    <div className="flex items-center justify-center w-1/4 bg-white shadow-xl h-4/5">
      <p className="text-black">Content 1</p>
    </div>
    <div className="flex items-center justify-center w-1/4 bg-white shadow-xl h-4/5">
      <p className="text-black">Content 2</p>
    </div>
    <div className="flex items-center justify-center w-1/4 bg-white shadow-xl h-4/5">
      <p className="text-black">Content 3</p>
    </div>
  </div>
</div>


    
    </>
  );
}

export default Home;
