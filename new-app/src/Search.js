import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const SearchBar = ({ email,firstname }) => {
  const [ingredients, setIngredients] = useState('');
  const [restrictions, setRestrictions] = useState('');
  const navigate = useNavigate(); // Hook to navigate between routes

  const handleIngredientChange = (e) => {
    setIngredients(e.target.value);
  }

  const handleRestrictionChange = (e) => {
    setRestrictions(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ingredients, restrictions })
    })
    .then(response => response.json()) // Parse the response as JSON
    .then(result => {
      console.log('Server response:', result); // Log the server response
      // Navigate to the results page and pass the data as state
      navigate('/results', { state: { recipes: result.data, email: email, firstname:firstname} });
    })
    .catch(error => {
      console.error('Error:', error); // Log any errors
    });

    setIngredients('');
    setRestrictions('');
  }

  return (
    <div className='search_div'>
      <form className='search_bar_container' onSubmit={handleSubmit}>

      <div className='writeup Kalam'>
        <p style={{ fontSize: '2rem', color: 'white' }}>Simply enter ingredients and dietary restrictions and explore different recipes.</p>
      </div>

        <input
          type='text'
          className='search_bar placeholder:text-white sm:placeholder:text-xs md:placeholder:text-xl bg-orange-300'
          placeholder='Enter ingredients here (comma-separated)'
          value={ingredients}
          onChange={handleIngredientChange}
        />

        <input
          type='text'
          className='search_bar placeholder:text-white sm:placeholder:text-xs md:placeholder:text-xl bg-orange-300'
          placeholder='Enter dietary restrictions here'
          value={restrictions}
          onChange={handleRestrictionChange}
        />

        <button type="submit" className='mb-4 text-xl border-2 border p-4 rounded-lg bg-yellow-200'>Submit</button>
      </form>
    </div>
  );
}

export default SearchBar;
