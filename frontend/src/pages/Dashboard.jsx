import React, { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import AddRecipeModal from "../components/AddRecipeModal";
import EditRecipeModal from "../pages/EditRecipe";
import ViewRecipeModal from "../components/ViewRecipeModal";
import API from "../api/api";

export default function Dashboard({ currentUserId }) {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [pinned, setPinned] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRecipeId, setEditingRecipeId] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingRecipeId, setViewingRecipeId] = useState(null);

  // Fetch recipes & pinned recipes
  useEffect(() => {
<<<<<<< HEAD
    const fetchData = async () => {
      try {
        const { data: recipesData } = await API.get("/recipes");
        setRecipes(
          recipesData.filter((r) => r.public || r.userId === currentUserId)
        );

        const token = localStorage.getItem("token");
        const { data: pinnedData } = await API.get("/users/pinned", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPinned(pinnedData.map((r) => r._id)); // only store IDs
      } catch (err) {
        console.error(err.response?.data || err);
        alert("Error fetching recipes");
      }
    };
=======
    fetchRecipes();
    fetchPinnedRecipes()
  }, []);

  const fetchRecipes = async () => {
    try {
      const { data } = await API.get("/recipes");
      // Show public recipes or recipes owned by current user
      setRecipes(data.filter(r => r.public || r.userId === currentUserId));
    } catch (err) {
      alert("Error fetching recipes");
    }
  };


  const fetchPinnedRecipes = async () => {
  try {
    const { data } = await API.get("/recipes/pinned"); // backend route
    setPinned(data.map(r => r._id)); // store only IDs
  } catch (err) {
    console.error("Error fetching pinned recipes", err);
  }
};
>>>>>>> parent of 23d9e11 (update)

    fetchData();
  }, [currentUserId]);

  // Delete a recipe
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;
    try {
      await API.delete(`/recipes/${id}`);
      setRecipes(recipes.filter((r) => r._id !== id));
      alert("Recipe deleted successfully!");
    } catch (err) {
      alert("Error deleting recipe");
    }
  };

<<<<<<< HEAD
  // Toggle pinned state
  const togglePin = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const { data: updatedPins } = await API.patch(
        `/users/pinned/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedPinIds = updatedPins.map((r) => r._id || r);

      setPinned(updatedPinIds);

      // Re-sort recipes (pinned first)
      setRecipes((prev) => [
        ...prev.filter((r) => updatedPinIds.includes(r._id)),
        ...prev.filter((r) => !updatedPinIds.includes(r._id)),
      ]);
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Error pinning recipe");
    }
  };
=======
  const togglePin = async (id) => {
  try {
    const { data } = await API.post(`/recipes/${id}/pin`);
    setPinned(data.pinned);
  } catch (err) {
    console.error("Error pinning recipe", err);
  }
};
>>>>>>> parent of 23d9e11 (update)

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

  const filteredRecipes = recipes.filter((r) => {
    const term = search.toLowerCase();
    return (
      r.title.toLowerCase().includes(term) ||
      r.ingredients.join(", ").toLowerCase().includes(term) ||
      r.instructions.toLowerCase().includes(term)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Public Recipes</h1>
        <input
          type="text"
          placeholder="🔍 Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full md:w-1/3"
        />
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          + Add Recipe
        </button>
      </div>

      {/* Pinned Recipes Section */}
      {pinned.length > 0 && (
        <div className="mt-10 relative">
          <h2 className="text-xl font-bold mb-4">➤ Saved Recipes</h2>

          {/* Left Arrow */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 color-black rounded-full p-2"
            onClick={() =>
              document
                .getElementById("pinnedSlider")
                .scrollBy({ left: -300, behavior: "smooth" })
            }
          >
            ◀
          </button>

          {/* Slider */}
          <div
            id="pinnedSlider"
            className="flex flex-nowrap space-x-4 overflow-x-auto px-10 scrollbar-hide scroll-smooth"
          >
            {recipes
              .filter((r) => pinned.includes(r._id))
              .map((r) => (
                <div key={r._id} className="min-w-[280px] flex-shrink-0 flex-grow-0">
                  <RecipeCard
                    recipe={r}
                    pinned={true}
                    togglePin={togglePin}
                    handleDelete={handleDelete}
                    onEdit={handleEdit}
                    onView={handleView}
                    currentUserId={currentUserId}
                  />
                </div>
              ))}
          </div>

          {/* Right Arrow */}
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full p-2"
            onClick={() =>
              document
                .getElementById("pinnedSlider")
                .scrollBy({ left: 300, behavior: "smooth" })
            }
          >
            ▶
          </button>
        </div>
      )}

      {/* Recipes Grid */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-10">Recipes</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredRecipes.map((r) => (
          <RecipeCard
            key={r._id}
            recipe={r}
            pinned={pinned.includes(r._id)}
            togglePin={togglePin}
            handleDelete={handleDelete}
            onEdit={handleEdit}
            onView={handleView}
            currentUserId={currentUserId}
          />
        ))}
      </div>

      {/* Modals */}
      {isAddModalOpen && (
        <AddRecipeModal
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAdd}
          currentUserId={currentUserId}
        />
      )}
      {isEditModalOpen && editingRecipeId && (
        <EditRecipeModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          recipeId={editingRecipeId}
          onUpdate={(updatedRecipe) => {
            setRecipes(
              recipes.map((r) =>
                r._id === updatedRecipe._id ? updatedRecipe : r
              )
            );
            setIsEditModalOpen(false);
          }}
        />
      )}
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
