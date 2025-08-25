const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

// Get all pinned recipes of logged-in user
router.get("/pinned", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("pinnedRecipes");
    res.json(user.pinnedRecipes || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Toggle pin/unpin recipe
router.patch("/pinned/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const recipeId = req.params.id;

    if (user.pinnedRecipes.includes(recipeId)) {
      // Unpin
      user.pinnedRecipes = user.pinnedRecipes.filter(
        (r) => r.toString() !== recipeId
      );
    } else {
      // Pin (add to front, avoid duplicates)
      if (!user.pinnedRecipes.includes(recipeId)) {
        user.pinnedRecipes.unshift(recipeId);
      }
    }

    await user.save();
    await user.populate("pinnedRecipes");
    res.json(user.pinnedRecipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;