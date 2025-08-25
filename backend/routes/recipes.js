const express = require("express");
const router = express.Router();
const multer = require("multer");
const recipeController = require("../controllers/recipeController");
const authMiddleware = require("../middleware/authMiddleware"); // import your auth middleware



// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Routes that require authentication
router.post("/", authMiddleware, upload.single("image"), recipeController.addRecipe);
router.put("/:id", authMiddleware, upload.single("image"), recipeController.updateRecipe);
router.delete("/:id", authMiddleware, recipeController.deleteRecipe);
router.get("/my-recipes", authMiddleware, recipeController.getMyRecipes);

// Public routes
router.get("/", recipeController.getRecipes);
router.get("/:id", recipeController.getRecipeById);



<<<<<<< HEAD
module.exports = rout;
=======
router.post("/:id/pin",authMiddleware , recipeController.pinRecipe);
router.post("/:id/unpin", authMiddleware, recipeController.unpinRecipe);
router.get("/pinned/me", authMiddleware,  recipeController.getPinnedRecipes);
module.exports = router;
>>>>>>> parent of 23d9e11 (update)
