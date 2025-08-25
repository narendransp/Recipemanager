import React from "react";

const RecipeCard = ({ recipe, pinned, togglePin, handleDelete, onEdit, onView, currentUserId }) => {
   
  
   console.log("RecipeCard props:", { recipe, currentUserId });
  const isOwner =
  recipe.user?.toString() === currentUserId?.toString() ||
  recipe.user?._id?.toString() === currentUserId?.toString();// Check if logged-in user owns the recipe

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform transform hover:scale-105 w-72 h-[500px] flex-shrink-0">
      {/* Recipe Image */}
      {recipe.image ? (
        <img
  src={`${import.meta.env.VITE_API_URL}${recipe.image}`}
  alt={recipe.title}
  className="h-40 w-full object-cover"
/>
      ) : (
        <div className="h-40 w-full bg-gray-200 flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold line-clamp-2">{recipe.title}</h3>
          <button
            onClick={() => togglePin(recipe._id)}
            className="text-sm text-gray-500 hover:text-gray-700"
            style={{ fontSize: "2rem" }}
          >
            {pinned ? "⮜" : "⌲"}
          </button>
        </div>

        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
        </p>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          <strong>Instructions:</strong> {recipe.instructions}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {recipe.tags?.map((tag, i) => (
            <span
              key={i}
              className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full"
            >
              #{tag.trim()}
            </span>
          ))}
        </div>

        {/* Action Buttons - always at bottom */}
        <div className="mt-auto flex gap-2">
          {/* View button (always enabled) */}
          <button
            onClick={() => onView(recipe)}
            className="flex-1 text-center px-3 py-2 bg-black text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            View
          </button>

          {/* Only show Edit/Delete if user is owner */}


          {isOwner && (
            <>

              <button
                onClick={() => onEdit(recipe)}
                className="flex-1 text-center px-3 py-2 bg-black text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(recipe._id)}
                className="flex-1 text-center px-3 py-2 bg-black text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
              </>
          )}

        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
