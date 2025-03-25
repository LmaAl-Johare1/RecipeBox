const Recipe = require("../models/recipeModel");

const createRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, image } = req.body;

    if (!title || !ingredients || !instructions ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newRecipe = new Recipe(req.body);
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const UpdateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json({ updatedRecipe, message: "Recipe updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const GetRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const DeleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecipe = await Recipe.findByIdAndDelete(id);
    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createRecipe, getRecipes, UpdateRecipe, GetRecipeById, DeleteRecipe };
