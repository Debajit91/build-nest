import React from 'react';
import { Link } from 'react-router';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
      <img
        src="https://i.ibb.co/Y4cV7Nkd/18240812.png"
        alt="Unauthorized access"
        className="w-80 mb-8"
      />
      <h1 className="text-5xl font-bold text-red-600 mb-4">403</h1>
      <h2 className="text-2xl font-semibold mb-2 text-gray-800">Unauthorized Access</h2>
      <p className="mb-6 text-gray-600 max-w-md">
        You do not have permission to view this page. Please check with your admin or try logging in with the correct account.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default Unauthorized;