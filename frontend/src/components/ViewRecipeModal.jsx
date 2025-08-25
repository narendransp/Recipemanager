import React, { useEffect, useState } from "react";
import API from "../api/api";

export default function ViewRecipeModal({ isOpen, onClose, recipeId }) {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    if (!isOpen || !recipeId) return;

    const fetchRecipe = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await API.get(`/recipes/${recipeId}`,{
           headers: { Authorization: `Bearer ${token}` },
        }); // fetch single recipe
        setRecipe(data);
      } catch (err) {
        alert("Error fetching recipe");
        console.error(err);
      }
    };

    fetchRecipe();
  }, [isOpen, recipeId]);

  if (!isOpen || !recipe) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
  <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] p-6 relative overflow-y-auto">
    {/* Close Button */}
    <button
      onClick={onClose}
      className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-lg font-bold"
    >
      ✖
    </button>

    {/* Recipe Title */}
    <h2 className="text-3xl font-bold text-gray-800 mb-4">{recipe.title}</h2>

    {/* Recipe Image */}
    {recipe.image && (
      <div className="w-full h-64 md:h-80 overflow-hidden rounded-xl mb-4">
        <img
          src= {`https://recipemanager-4g1t.onrender.com/api${recipe.image}`}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
      </div>
    )}

    {/* Ingredients */}
    <div className="bg-gray-100 rounded-lg p-4 mb-4">
      <h3 className="text-xl font-semibold mb-2">📝 Ingredients</h3>
      <ul className="list-disc list-inside text-gray-700">
        {recipe.ingredients.map((ing, i) => (
          <li key={i}>{ing}</li>
        ))}
      </ul>
    </div>

    {/* Instructions */}
    <div className="bg-gray-100 rounded-lg p-4 mb-4">
      <h3 className="text-xl font-semibold mb-2">👩‍🍳 Instructions</h3>
      <p className="text-gray-700 whitespace-pre-line">{recipe.instructions}</p>
    </div>
  </div>
</div>
  );
}
