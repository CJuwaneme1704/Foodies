import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import { GoogleLogin } from '@react-oauth/google';

const SignUp = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to manage error messages
  const navigate = useNavigate();



  
  const handleGoogleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;
    
    try {
      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Google login failed. Please try again.');
      } else {
        sessionStorage.setItem('token', data.token);  // Save JWT token in sessionStorage
        navigate('/UserDashboard', { state: { firstname: data.user.firstname, email: data.user.email } });
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Error:', error);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    

    try {
      const response = await fetch('/api/auth/SignUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstname, lastname, email, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        // If the response is not OK, set the error message from the server
        setError(data.message);
      } else {
        // Save the token in localStorage or sessionStorage
        sessionStorage.setItem('token', data.token)

        // Log the user in and redirect them to the home or dashboard page
        alert('User registered and logged in successfully!');
        navigate("/UserDashboard",{ state: { firstname: data.user.firstname,email:data.user.email} }) // Adjust the path as needed
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");

      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Layout />
      <div className='w-full grid justify-items-center'>
        <p className='text-black text-center text-3xl mt-2'>User SignUp</p>

        <div className='bg-custom-gradient mt-4 rounded-lg w-fit shadow-lg shadow-custom-gradient/50 mb-8'>
          <form onSubmit={handleSubmit} className='grid justify-items-center'>
            {error && <p className='text-white mb-4'>{error}</p>} {/* Display error messages */}
            <div className='mt-4'>
              <label className='ml-4 text-white'>Firstname</label>
              <input
                type='text'
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className='rounded-lg p-2 m-4 border-4 bg-orange-300'
                required
              />
            </div>

            <div className='mt-4'>
              <label className='ml-4 text-white'>Lastname</label>
              <input
                type='text'
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className='rounded-lg p-2 m-4 border-4 bg-orange-300'
                required
              />
            </div>

            <div className='mt-4 mb-4 ml-0'>
              <label className='ml-4 text-white'>Email address</label>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='rounded-lg p-2 m-4 border-4 bg-orange-300'
                required
              />
            </div>
            <div className='mt-4 mb-4'>
              <label className='ml-4 text-white '>Password</label>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='rounded-lg p-2 m-4 border-4 bg-orange-300'
                required
              />
            </div>

            <button className='mb-4 text-xl border-2 p-4 rounded-lg bg-yellow-200' type='submit'>
              Create account
            </button>
          </form>
        </div>
      </div>
      <div className="mb-8 grid justify-items-center">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => {
          console.log('Login Failed');
          }}
          useOneTap
        />
      </div>
      
      
    </div>
  );
};

export default SignUp;
