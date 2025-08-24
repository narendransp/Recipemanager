const Recipe = require("../models/Recipe");

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
      public: req.body.public ?? true,
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

    if (!recipe.public && recipe.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to view this recipe" });
    }

    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a recipe (only owner)
const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    if (recipe.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this recipe" });
    }

    recipe.title = req.body.title;
    recipe.instructions = req.body.instructions;
    recipe.ingredients = req.body.ingredients ? JSON.parse(req.body.ingredients) : [];
    recipe.tags = req.body.tags ? JSON.parse(req.body.tags) : [];
    if (req.file) recipe.image = `/uploads/${req.file.filename}`;
    recipe.public = req.body.public ?? recipe.public;

    await recipe.save();
    res.json(recipe);
  } catch (err) {
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
    const userId = req.user._id;
    const recipes = await Recipe.find({ user: userId }); // use 'user' here
    res.json(recipes);
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
};
