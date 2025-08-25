const Recipe = require("../models/Recipe");
const User = require("../models/User");

// Get all recipes: public for everyone + own private recipes
const getRecipes = async (req, res) => {
  try {
    const userId = req.user?._id;
    const recipes = await Recipe.find({
      $or: [
        { public: true },
        { user: userId } // use 'user' field
      ]
    });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add new recipe
const addRecipe = async (req, res) => {
   console.log('req.user:', req.user);
  try {
    const recipe = new Recipe({
      title: req.body.title,
      instructions: req.body.instructions,
      ingredients: req.body.ingredients ? JSON.parse(req.body.ingredients) : [],
      tags: req.body.tags ? JSON.parse(req.body.tags) : [],
      image: req.file ? `/uploads/${req.file.filename}` : null,
      public: req.body.public === "true" || req.body.public === true,
      user: req.user._id // use 'user' here
    });

    await recipe.save();
    res.status(201).json(recipe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get a recipe by ID


const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateRecipe = async (req, res) => {
  try {
    // Build update data
    const updateData = {
      title: req.body.title,
      instructions: req.body.instructions,
      ingredients: req.body.ingredients ? JSON.parse(req.body.ingredients) : [],
      tags: req.body.tags ? JSON.parse(req.body.tags) : []
    };

    // ✅ Only update image if new file is uploaded
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json(updatedRecipe);
  } catch (err) {
    console.error("Error in updateRecipe:", err);
    res.status(500).json({ error: err.message });
  }
};


// Delete a recipe (only owner)
const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    // Debugging log
    console.log("User from token:", req.user);

    if (recipe.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this recipe" });
    }

    // Use deleteOne instead of remove
    await recipe.deleteOne();
    res.json({ message: "Recipe deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: err.message });
  }
};


// Get only recipes of the logged-in user
const getMyRecipes = async (req, res) => {
  try {
    console.log("User from token:", req.user);
    const userId = req.user._id;
    const recipes = await Recipe.find({ user: userId }); // use 'user' here
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};





const getPinnedRecipes = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("pinnedRecipes");
    res.json(user.pinnedRecipes || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Toggle pin/unpin recipe
const togglePinnedRecipe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const recipeId = req.params.id;

    if (user.pinnedRecipes.includes(recipeId)) {
      user.pinnedRecipes = user.pinnedRecipes.filter(r => r.toString() !== recipeId);
    } else {
      user.pinnedRecipes.unshift(recipeId);
    }

    await user.save();
    res.json(user.pinnedRecipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




module.exports = {
  getRecipes,
  addRecipe,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  getMyRecipes,
  getPinnedRecipes,
  togglePinnedRecipe
};
