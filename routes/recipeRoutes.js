const express = require("express");
const router = express.Router();
const {  getRecipes,createRecipe ,UpdateRecipe,GetRecipeById, DeleteRecipe} = require("../controllers/recipeController");  // استيراد الدوال من الـ controller

router.get("/", getRecipes);

router.post("/", createRecipe);

router.put("/:id",UpdateRecipe);

router.get("/:id",GetRecipeById);

router.delete("/:id", DeleteRecipe);

module.exports = router;
