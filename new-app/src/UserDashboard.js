import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchBar from './Search';
import './App.css';
import './headnav.css';
import DashboardLayout from './DashboardLayout';
import { FaHeart } from "react-icons/fa"; // Import the heart icon for favorites

function UserDashboard() {
  const location = useLocation();
  const firstname = location.state?.firstname || 'User';
  const email = location.state?.email || "User_email";
  const [favorites, setFavorites] = useState([]); // State to store favorite recipes
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the user's favorites when the component mounts
    const fetchFavorites = async () => {
      try {
        const response = await fetch(`/api/get-favorites?email=${email}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFavorites(data); // Set the favorites in state
        console.log(data)
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, [email]);

  const handleClick = (mealId) => {
    navigate(`/recipe/${mealId}`); // Navigate to detailed recipe page
  };

  return (
    <div>                           
      <DashboardLayout />
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <img
          alt=''
          className='w-full h-40 object-cover'
          src='./cupcake-8215179_1280.jpg'
        />
        <div className='mt=auto'>
          <h1 className='text-6xl HashedBrowns mt-4'>Welcome {firstname}</h1>
        </div>

        <SearchBar email={email} firstname={firstname}/>

        {/* Favorites Section */}
        <div className='mb-6'>
          <h1 className='HashedBrowns text-6xl'>Favorites</h1>
          <div className="userrecipes-grid">
            {/* Check if there are favorites, if so, map over them to display */}
            {favorites.length > 0 ? (
              favorites.map((recipe, index) => (
                <div className="recipe-card relative group" key={index}>
                  {/* Display recipe image */}
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="recipe-image"
                    onClick={() => handleClick(recipe.mealId)} // When clicked, navigate to detailed recipe page
                  />
                  <h2 className="recipe-title Kalam">{recipe.name}</h2>
                  {/* Like button (FaHeart icon), changes color based on liked state */}
                  {/* <FaHeart
                    className={`absolute top-2 right-2 text-xl cursor-pointer transition-opacity duration-300 text-red-500`}
                  /> */}
                </div>
              ))
            ) : (
              <p className='Kalam'>No favorites found.</p> // Message if no favorites are available
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
//unliking from dashboard