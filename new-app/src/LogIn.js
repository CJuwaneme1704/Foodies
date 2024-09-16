import React, { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import Layout from "./Layout";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const LogIn = () => {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailClick = () => {
    setShowForm(true);
  };

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/auth/LogIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Adjust if email is different
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'An error occurred. Please try again.');
      } else {
        sessionStorage.setItem('token', data.token); // Save token in sessionStorage
        console.log('Token stored:', sessionStorage.getItem('token'));
        alert('Logged in successfully!');
        navigate("/UserDashboard",{ state: { firstname: data.user.firstname,email:data.user.email} })
        
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Error:', error);
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      // Send the credential to the backend
      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: credentialResponse.credential, // Send Google token to backend
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Google login failed. Please try again.');
      } else {
        // Save JWT token in sessionStorage or localStorage
        sessionStorage.setItem('token', data.token);
        console.log('Google login successful. Token stored:', data.token);

        // Navigate to user dashboard or appropriate page
        navigate("/UserDashboard", { state: { firstname: data.user.firstname, email: data.user.email } });
      }
    } catch (error) {
      console.error('Google login error:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };


  let content;

  if (!showForm) {
    // Initial View
    content = (
      <div className='w-full grid justify-items-center '>
        <img
          alt=''
          className='w-full h-28 object-cover'
          src='./spring-roll-6760871_1280.jpg'
        />
        <header className='text-4xl'>Log In</header>
        <div className='grid justify-items-center mt-4'>
          <ul className='flex flex-col space-y-4'>
            <li className='grid justify-items-center p-4 border-2 hover:bg-black'>
              <button
                className='w-52 h-full place-items-center hover:text-white'
                onClick={handleEmailClick}
              >
                <div className='w-52 h-2.5 grid justify-items-center mb-4'>
                  <span className='text-xl'>Log In with Email</span>
                </div>
              </button>
            </li>
            <li className='grid justify-items-center p-4 border-2 hover:bg-blue-800'>
              {/* Replace button with GoogleLogin component */}
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess} // Use the handler to send token to backend
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    // Form View
    content = (
      <div className='w-full grid justify-items-center'>
        <img
          alt=''
          className='w-full h-28 object-cover md:h-64'
          src='./spring-roll-6760871_1280.jpg'
        />
        <div>
          <p className='text-black text-center text-3xl mt-2'>User Login</p>
          <div className='bg-custom-gradient mt-4 rounded-lg w-fit shadow-lg shadow-custom-gradient/50 mb-8'>
            <form onSubmit={handleSubmit} className='grid justify-items-center'>

              {error && <p className='text-black mb-4'>{error}</p>} {/* Display error messages */}

              <div className='mt-4'>
                <label className='ml-4 text-white'>Email</label>
                <input
                  type='text'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='rounded-lg p-2 m-4 border-4 bg-orange-300'
                  required
                />
              </div>
              <div className='mt-4 mb-4'>
                <label className='ml-4 text-white'>Password</label>
                <input
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='rounded-lg p-2 m-4 border-4 bg-orange-300'
                  required
                />
              </div>
              <button className='mb-4 text-xl border-2 border p-4 rounded-lg bg-yellow-200' type='submit'>
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Layout />
      {content}
    </div>
  );
};

export default LogIn;
