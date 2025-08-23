import React, { useState, useEffect } from "react";
import API from "../api/api";

export default function EditRecipeOverlay({ recipeId, onClose, onUpdate }) {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isPublic, setIsPublic] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const { data } = await API.get(`/recipes/${recipeId}`);
        setTitle(data.title || "");
        setIngredients(data.ingredients ? data.ingredients.join(", ") : "");
        setInstructions(data.instructions || "");
        setTags(data.tags ? data.tags.join(", ") : "");
        setIsPublic(data.public ?? true);
        if (data.image) setPreview(`http://localhost:5000/${data.image}`);
      } catch (err) {
        console.error(err);
        alert("Error fetching recipe");
        onClose();
      } finally {
        setLoading(false);
      }
    };

    if (recipeId) fetchRecipe();
  }, [recipeId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User not logged in");

      const formData = new FormData();
      formData.append("title", title);
      formData.append(
        "ingredients",
        JSON.stringify(ingredients.split(",").map((i) => i.trim()))
      );
      formData.append("instructions", instructions);
      formData.append("tags", JSON.stringify(tags.split(",").map((t) => t.trim())));
      formData.append("public", isPublic);
      if (image) formData.append("image", image);

      const { data } = await API.put(`/recipes/${recipeId}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      onUpdate(data);
      onClose();
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Error updating recipe");
    }
  };

  if (loading) return <p className="text-center mt-5">Loading recipe...</p>;

  return (
    <div className="fixed inset-0 bg-black/25 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-xl font-bold"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          ✏️ Edit Recipe
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Recipe Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          <input
            type="text"
            placeholder="Ingredients (comma separated)"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          <textarea
            placeholder="Cooking Instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
            <label>Public Recipe</label>
          </div>

          <div className="flex flex-col items-start">
            <label className="cursor-pointer bg-black text-white px-4 py-2 rounded hover:bg-black/80">
              {image ? "Change Recipe Image" : "Upload Recipe Image"}
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-40 object-cover rounded mt-2"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white px-4 py-2 rounded hover:bg-black/80"
          >
            Update Recipe
          </button>
        </form>
      </div>
    </div>
  );
}
