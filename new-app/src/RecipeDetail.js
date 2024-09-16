import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';

const RecipeDetail = () => {
  const { mealId } = useParams(); // Get the meal ID from the URL params
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Fetch the recipe details from the MealDB API using the meal ID
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then(response => response.json())
      .then(data => {
        if (data.meals) {
          setRecipe(data.meals[0]); // Set the first meal from the response data
        }
      })
      .catch(error => console.error('Error fetching recipe:', error));
  }, [mealId]);

  if (!recipe) return <div>Loading...</div>; // Show a loading state while fetching


  // Extract ingredients and their measurements
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient) {
      let ingredientString = '';
      if (measure) {
        ingredientString += measure + ' ';
      }
      ingredientString += ingredient;
      ingredients.push(ingredientString);
    }
  }

  return (
    <div className='details_container'>
      {/* Title and Picture */}
      <div className='headerimageingredients_container'>

        <h1 className='HashedBrowns'>{recipe.strMeal}</h1>
        <img src={recipe.strMealThumb} alt={recipe.strMeal} className='w-full h-auto max-w-full object-cover' />
        
        <hr className='section_separator' /> {/* Line separator */}



        {/* Ingredients */}
        <div className='details_ingredients'>

          <h2 className='HashedBrowns'>Ingredients</h2>
          <ul className='ingrelist Kalam'>
            {ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

        </div>

      </div>

      <hr className='section_separator' /> {/* Line separator */}

      {/* Instructions */}
      <div className='details_instructions'>
        <h2 className='HashedBrowns'>Instructions</h2>
        <p className='Kalam'>
          {recipe.strInstructions}
        </p>
      </div>

      <hr className='section_separator' /> {/* Line separator */}


      <div class="ytlink">
        <h2 className='HashedBrowns'>Watch the Recipe</h2>
        <div class="responsive-iframe">
          <iframe
            src={`https://www.youtube.com/embed/${recipe.strYoutube.split('v=')[1]}`}
            title="YouTube video player"
            frameBorder="0"
          >
          </iframe>
        </div>
     </div>








    

    </div>
  );
};

export default RecipeDetail;
