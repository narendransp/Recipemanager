import React from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate} from 'react-router-dom';
import Navbar from './components/Navbar';
import AuthPage from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import EditRecipe from './pages/EditRecipe';
import Home from './pages/Home';
import Layout from "./components/Layout";
import MyRecipes from './pages/MyRecipes';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
   const isLoggedIn = !!localStorage.getItem('token');
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard currentUserId={localStorage.getItem("userId")}/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/edit-recipe/:id" element={<EditRecipe />} />
          <Route 
          path="/my-recipes" 
          element={isLoggedIn ? <MyRecipes /> : <Navigate to="/login" />} 
        />
        <Route path="/layout" element={<Layout />} />
      </Routes>
      </>
  );
}

export default App;

