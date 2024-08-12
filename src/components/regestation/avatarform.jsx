import React from 'react';

function AvatarForm({ formData, handleAvatarChange, prevStep, handleSubmit }) {
  return (
    <div className="max-w-md p-6 mx-auto mt-10 rounded-md shadow-md shadow-gray-700">
      <h2 className="mb-4 text-xl font-bold text-center text-green-800">Upload Avatar</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-600">Avatar</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={prevStep}
            className="px-4 py-2 text-white transition-all duration-500 ease-in-out transform rounded-full shadow-lg bg-gradient-to-r from-gray-700 to-gray-600 hover:scale-105 hover:brightness-110"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white transition-all duration-500 ease-in-out transform rounded-full shadow-lg bg-gradient-to-r from-green-900 to-green-800 hover:scale-105 hover:brightness-110"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AvatarForm;
