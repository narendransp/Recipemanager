import React, { useEffect, useState } from "react";
import API from "../api/api";
import RecipeCard from "../components/RecipeCard";
import EditRecipeModal from "../pages/EditRecipe";
import ViewRecipeModal from "../components/ViewRecipeModal";
import AddRecipeModal from "../components/AddRecipeModal";

export default function MyRecipes({ currentUserId }) {
  const [recipes, setRecipes] = useState([]);
  const [pinned, setPinned] = useState([]); // now synced with backend
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingRecipeId, setEditingRecipeId] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingRecipeId, setViewingRecipeId] = useState(null);

  // Fetch recipes + pinned on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // ✅ Fetch all my recipes
        const { data: recipesData } = await API.get("/recipes/my-recipes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecipes(recipesData);

        // ✅ Fetch pinned recipes
        const { data: pinnedData } = await API.get("/users/pinned", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPinned(pinnedData.map((r) => r._id)); // store IDs
      } catch (err) {
        console.error(err.response?.data || err);
        alert("Error fetching your recipes");
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/recipes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setRecipes(recipes.filter((r) => r._id !== id));
      setPinned((prev) => prev.filter((p) => p !== id)); // also remove from pinned
      alert("Recipe deleted successfully!");
    } catch (err) {
      alert("Error deleting recipe");
    }
  };

  // ✅ Toggle pin synced with backend
  const togglePin = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await API.patch(`/users/pinned/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // API returns updated pinned list
      setPinned(data.map((r) => r.toString()));
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Error updating pinned recipes");
    }
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

  // ✅ Sort recipes: pinned first
  const sortedRecipes = [
    ...recipes.filter((r) => pinned.includes(r._id)), // pinned on top
    ...recipes.filter((r) => !pinned.includes(r._id)), // others
  ];

  if (recipes.length === 0)
    return <p className="p-6">You have no recipes yet.</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">My Recipes</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          + Add Recipe
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedRecipes.map((recipe) => (
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

      {/* Add Modal */}
      {isAddModalOpen && (
        <AddRecipeModal
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAdd}
          currentUserId={currentUserId}
        />
      )}

      {/* Edit Modal */}
      {isEditModalOpen && editingRecipeId && (
        <EditRecipeModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          recipeId={editingRecipeId}
          onUpdate={(updatedRecipe) => {
            setRecipes(
              recipes.map((r) => (r._id === updatedRecipe._id ? updatedRecipe : r))
            );
            setIsEditModalOpen(false);
          }}
        />
      )}

      {/* View Modal */}
      {isViewModalOpen && viewingRecipeId && (
        <ViewRecipeModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          recipeId={viewingRecipeId}
        />
      )}
    </div>
  );
}
