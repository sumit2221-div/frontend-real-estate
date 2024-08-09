import React from 'react';

const InputTab = ({ label, type, name, value, onChange, required, placeholder }) => {
    return (
        <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                className="w-full px-4 py-3 text-gray-900 placeholder-gray-500 transition duration-150 ease-in-out border border-gray-300 rounded-lg shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
            />
        </div>
    );
};

export default InputTab;
