const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    ingredients: { type: [String], default: [] },
    instructions: { type: String, required: true },
    image: { type: String }, // filename or path
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // owner
    tags: { type: [String], default: [] },
    public: { type: Boolean, default: true } ,// true = public, false = private
    pinnedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
  },
  { timestamps: true } // automatically adds createdAt and updatedAt
);

module.exports = mongoose.model('Recipe', recipeSchema);