import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import oria from '../assets/oria.png';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Login successful
        console.log('Login successful');
        // Redirect to the desired page (e.g., dashboard)
      } else {
        // Login failed
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-blue-200">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md flex flex-col items-center">
          <div className="flex justify-center items-center">
            <div className="text-center">
              <img src={oria} alt="Logo" className="mb-4" />
            </div>
          </div>

          <h2 className="text-2xl text-center font-semibold text-gray-700 mb-6">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <input
                type="text"
                className="px-3 py-2 border rounded-lg w-full"
                placeholder="Enter your username"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                className="px-3 py-2 border rounded-lg w-full"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
              >
                Login
              </button>
            </div>
          </form>
          {error && (
            <p className="text-red-600 text-center mt-4">{error}</p>
          )}
          <p className="text-gray-600 text-center mt-4">
            Don't have an account?{' '}
            <a href="/RegisterPage" className="text-blue-500">
              Register
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LoginPage;
