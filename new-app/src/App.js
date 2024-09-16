import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import './App.css';
import Results from './Results';
import RecipeDetail from './RecipeDetail';
import LogIn from './LogIn';
import SignUp from './SignUp';
import Home from './Home';
import Dashboard from "./UserDashboard";
import './headnav.css';          
import ProtectedRoute from './ProtectedRoute';
import DashboardLayout from './DashboardLayout';
import SearchBar from './Search';




const  App = () => {


  return (
    
    <Router>
      <Routes>
          <Route path="/" element={<Navigate to="/Home" replace />} />
          <Route path="/Home" element={<Home />} />
          {/* Public Routes */}
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/LogIn" element={<LogIn />} />
          {/* Protected Routes */}
          {/* <Route element={<ProtectedRoute />}> */}
            <Route path="/UserDashboard" element={<Dashboard />} />
            <Route path="/recipe/:mealId" element={<RecipeDetail />} />
            <Route path="/results" element={<Results />} />
            <Route  element={<DashboardLayout />} />
            <Route path='/Search'  element={<SearchBar />} />
          {/* </Route> */}

          {/* a route with sample data for testing */}
          {/* <Route path="/test-results" element={<ResultsTest />} /> */}
      </Routes>
    </Router>
  );
}

// const ResultsTest = () => {
//   // Sample data for testing

  
//   const sampleRecipes = [
//     { idMeal: "52874", strMeal: "Tuna and Egg Briks", strMealThumb: "https://www.themealdb.com/images/media/meals/2dsltq1560461468.jpg" },
//     { idMeal: "52872", strMeal: "Summer Pistou", strMealThumb: "https://www.themealdb.com/images/media/meals/rqtxvr1511792990.jpg" },
//     { idMeal: "52873", strMeal: "Bubble & Squeak", strMealThumb: "https://www.themealdb.com/images/media/meals/xusqvw1511638311.jpg" },
//     { idMeal: "53049", strMeal: "Apam balik", strMealThumb: "https://www.themealdb.com/images/media/meals/adxcbq1619787919.jpg" }
//   ]
//   return (
//     <Results recipes={sampleRecipes} />
//   );
// }





 
export default App;
