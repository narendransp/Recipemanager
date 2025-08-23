import React, { useEffect, useState } from "react";
import API from "../api/api";
import RecipeCard from "../components/RecipeCard";
import EditRecipeModal from "../pages/EditRecipe";
import ViewRecipeModal from "../components/ViewRecipeModal";
import AddRecipeModal from "../components/AddRecipeModal";


export default function MyRecipes({ currentUserId }) {
  const [recipes, setRecipes] = useState([]);
  const [pinned, setPinned] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingRecipeId, setEditingRecipeId] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [viewingRecipeId, setViewingRecipeId] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const { data } = await API.get("/recipes/my-recipes");
        setRecipes(data);
      } catch (err) {
        console.error(err.response?.data || err);
        alert("Error fetching your recipes");
      }
    };
    fetchRecipes();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;
    try {
      await API.delete(`/recipes/${id}`);
      setRecipes(recipes.filter(r => r._id !== id));
      alert("Recipe deleted successfully!");
    } catch (err) {
      alert("Error deleting recipe");
    }
  };

  const togglePin = (id) => {
    setPinned(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };

  const handleEdit = (recipe) => {
    setEditingRecipeId(recipe._id);
    setIsEditModalOpen(true);
  };

  const handleView = (recipe) => {
    setViewingRecipeId(recipe._id);
    setIsViewModalOpen(true);
  };

   const handleAdd = (newRecipe) => {
    setRecipes([newRecipe, ...recipes]);
  };

  if (recipes.length === 0) return <p className="p-6">You have no recipes yet.</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">My Recipes</h1>
        <button onClick={() => setIsAddModalOpen(true)} className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
          + Add Recipe
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes.map(recipe => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            pinned={pinned.includes(recipe._id)}
            togglePin={togglePin}
            handleDelete={handleDelete}
            onEdit={handleEdit}
            onView={handleView}
            currentUserId={currentUserId}
          />
        ))}
      </div>
      {isAddModalOpen && <AddRecipeModal onClose={() => setIsAddModalOpen(false)} onAdd={handleAdd} currentUserId={currentUserId} />}

      {isEditModalOpen && editingRecipeId && <EditRecipeModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} recipeId={editingRecipeId} onUpdate={(updatedRecipe) => {
              setRecipes(recipes.map(r => r._id === updatedRecipe._id ? updatedRecipe : r));
              setIsEditModalOpen(false);
            }} />}
            {isViewModalOpen && viewingRecipeId && <ViewRecipeModal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} recipeId={viewingRecipeId} />}
        
    </div>
  );
}
