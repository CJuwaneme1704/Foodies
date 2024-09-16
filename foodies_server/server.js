import express from 'express';
import path from 'path';
import fetch from 'node-fetch';
import mongoose from 'mongoose';
import cors from 'cors'; // Added for handling CORS
import dotenv from 'dotenv';
import authRouter from './authRouter.js';
import { User} from './models/User.js'; // Assumig both models are in User.js


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const mongoURI = process.env.MONGODB_URI


// Connect to MongoDB using environment variable
mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

// Middleware to parse JSON bodies
app.use(express.json());

// In server.js
app.use('/api/auth', authRouter);


// Middleware for CORS
app.use(cors()); 

// Serve static files from the 'build' directory
app.use(express.static(path.join(path.resolve(), 'build')));

app.post('/api/data', async (req, res) => {
  const { ingredients, restrictions } = req.body;

  try {
    // Await the result of GetRecipesFromMealDB
    const recipes = await GetRecipesFromMealDB(ingredients, restrictions);

    // Send the filtered recipes back to the client
    res.status(200).json({
      message: 'Data received successfully',
      data: recipes
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: 'Error processing request', error });
  }
});


app.post('/api/liked-recipes', async (req, res) => {
  const { recipe, email, isLiked } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (isLiked) {
      // Add recipe to favorites
      user.favorites.push({
        mealId: recipe.mealId,
        name: recipe.name,
        image: recipe.image,
      });
    } else {
      // Remove recipe from favorites
      user.favorites = user.favorites.filter(fav => fav.mealId !== recipe.mealId);
    }

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: 'Favorites updated successfully', favorites: user.favorites });
    
  } catch (error) {
    console.error('Error updating favorites:', error);
    res.status(500).json({ message: 'Server error' });
  }
});




app.get('/api/get-favorites', async (req, res) => {
  const { email } = req.query; // Use req.query to get query parameters

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the user's favorites array as the response
    res.status(200).json(user.favorites);
  } catch (error) {
    console.error('Error retrieving favorite meals:', error);
    res.status(500).json({ message: 'Server error' });
  }
});







async function GetRecipesFromMealDB(ingredients, restrictions) {
  const apiUrl = `https://www.themealdb.com/api/json/v2/9973533/filter.php?i=${ingredients}`;

  console.log(`Fetching recipes from: ${apiUrl}`);

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    let meals = data.meals || [];

    meals = meals.filter((meal) => {
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient && restrictions.includes(ingredient.toLowerCase())) {
          return false;
        }
      }
      return true;
    });

    return meals;

  } catch (error) {
    console.error('Error fetching recipes from MealDB:', error);
    return [];
  }
}

// Handle all other routes by sending back the 'index.html' file
app.get('*', (req, res) => {
  res.sendFile(path.join(path.resolve(), 'build', 'index.html'));
});

// Make the server listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
