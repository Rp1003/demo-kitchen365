'use client';

import React from 'react';
import { useAuth } from '../context/authContext';

export default function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">Product Catalog</h1>
        
        <div>
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.username}</span>
              <button 
                onClick={logout}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <span className="text-gray-600">Not logged in</span>
          )}
        </div>
      </div>
    </nav>
  );
}