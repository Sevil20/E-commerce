import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 

    // Make a POST request to the backend API
    const handleFormSubmit = (e) => {
        e.preventDefault();
      
        // Make a POST request to the backend API
        axios.post('http://localhost:5173/register', {
          username,
          email,
          password,
        })
          .then((response) => {
            console.log(response.data);
            // Handle successful registration
          })
          .catch((error) => {
            console.log(error.response.data);
            // Handle registration error
          });
      };
      

  return (
    <form className="max-w-sm mx-auto mt-8" onSubmit={handleFormSubmit}>
      <div className="mb-4">
        <label className="block mb-2 text-gray-700" htmlFor="username">
          Username
        </label>
        <input
          className="w-full px-3 py-2 border rounded focus:outline-none focus:border-indigo-500"
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-gray-700" htmlFor="email">
          Email
        </label>
        <input
          className="w-full px-3 py-2 border rounded focus:outline-none focus:border-indigo-500"
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-gray-700" htmlFor="password">
          Password
        </label>
        <input
          className="w-full px-3 py-2 border rounded focus:outline-none focus:border-indigo-500"
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
      style={{backgroundColor:'red'}}
        className="w-full py-2 px-4 text-white bg-indigo-500 rounded hover:bg-indigo-600"
        type="submit"
      >
        Register
      </button>
    </form>
  );
};

export default Register;
