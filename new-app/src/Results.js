import React, { useState } from 'react';
import './App.css'; // Import a new CSS file for specific styling
import './headnav.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';

const Results = () => {
  const location = useLocation();

  
  // Access the email passed from the previous state or set to an empty string if not available
  const email = location.state?.email || ''; 
  const firstname = location.state?.firstname || '';
  const [likedRecipes, setLikedRecipes] = useState([]); // State to store liked recipes (array of objects)
  const navigate = useNavigate(); // Hook to navigate programmatically to other routes
  const recipes = location.state?.recipes || []; // Access the passed recipes or default to an empty array
  // Function to handle when a recipe is clicked (to view details)
  const handleClick = (mealId) => {
    navigate(`/recipe/${mealId}`); // Navigate to the detailed page using the meal ID
  };

  // Function to handle the 'like' action for recipes
  const handleLike = async (recipe) => {
    let updatedLikedRecipes;
  
    // Check if the recipe is already in the likedRecipes array
    if (likedRecipes.some(liked => liked.mealId === recipe.idMeal)) {
      // If already liked, remove it from the likedRecipes array
      updatedLikedRecipes = likedRecipes.filter(liked => liked.mealId !== recipe.idMeal);
    } else {
      // If not liked, add it to the likedRecipes array
      const recipeObject = {
        mealId: recipe.idMeal,
        name: recipe.strMeal,
        image: recipe.strMealThumb
      };
      updatedLikedRecipes = [...likedRecipes, recipeObject]; // Add the new liked recipe
    }
  
    // Log the updated liked recipes for debugging purposes
    console.log('Updated liked recipes:', updatedLikedRecipes);
    // Update the state with the new liked recipes
    setLikedRecipes(updatedLikedRecipes);

    const payload = {
      recipe: {
        mealId: recipe.idMeal,
        name: recipe.strMeal,
        image: recipe.strMealThumb
      },
      email: email,
      isLiked: !likedRecipes.some(liked => liked.mealId === recipe.idMeal) // Determine if the recipe is being liked or unliked
    };

    console.log('Payload to send:', payload);


  
    try {
      // Send the updated liked recipes to the backend
      const response = await fetch('/api/liked-recipes', {
        method: 'POST', // Use POST request to update the backend
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      // Check if the response was successful
      if (!response.ok) {
        throw new Error('Network response was not ok'); // Throw an error if the response was not successful
      }
  
      // Parse the response JSON
      const data = await response.json();
      // Log the server response for debugging
      console.log('Server response:', data);
  
    } catch (error) {
      // Catch and log any errors that occurred during the fetch operation
      console.error('There was a problem with the fetch operation:', error);
    }
  };
  

  


  return (
    <div>
    <DashboardLayout />
          <div className='results-container'>
      {/* Include the dashboard layout */}
      <Link to="/UserDashboard" state={{ firstname, email }}  className='Kalam  hover:underline'>Back to Dashboard</Link>
      <h1 className='Kalam'>Recipe Results</h1>
      <div className="recipes-grid">
        {/* Check if there are recipes, if so, map over them to display */}
        {recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <div className="recipe-card relative group" key={index}>
              {/* Display recipe image */}
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="recipe-image"
                onClick={() => handleClick(recipe.idMeal)} // When clicked, navigate to detailed recipe page
              />
              <h2 className="recipe-title Kalam">{recipe.strMeal}</h2>
              {/* Like button (FaHeart icon), changes color based on liked state */}
              <FaHeart
                className={`absolute top-2 right-2 text-xl cursor-pointer transition-opacity duration-300 ${likedRecipes.some(liked => liked.mealId === recipe.idMeal) ? 'text-red-500' : 'text-white'}`}
                onClick={() => handleLike(recipe)} // Toggle like state when heart icon is clicked
              />
            </div>
          ))
        ) : (
          <p className='Kalam'>No recipes found.</p> // Message if no recipes are available
        )}
        </div>
      </div>
    </div>

  );
};

export default Results;
