"use strict";

const cakeRecipes = require("./cake-recipes.json");

function filterByAuthor(recipe, author) {
  if (!recipe.author) return false; // add this line to handle undefined author
  return recipe.author.toLowerCase().includes(author.toLowerCase());
}

function filterByIngredients(recipe, searchParams) {
  return (
    !searchParams.ingredients ||
    searchParams.ingredients.every((ingredient) =>
      recipe.ingredients.includes(ingredient)
    )
  );
}

function filterByNameOrDescription(recipe, searchParams) {
  const searchTerms =
    searchParams.searchTerms &&
    searchParams.searchTerms.toLowerCase().split(" ");

  return (
    !searchTerms ||
    searchTerms.every(
      (term) =>
        recipe.name.toLowerCase().includes(term) ||
        recipe.description.toLowerCase().includes(term)
    )
  );
}

function searchRecipes(recipes, searchParams) {
  return recipes.filter(
    (recipe) =>
      filterByAuthor(recipe, searchParams) &&
      filterByIngredients(recipe, searchParams) &&
      filterByNameOrDescription(recipe, searchParams)
  );
}

function printRecipes(recipes) {
  console.log(`Found ${recipes.length} recipes:`);
  recipes.forEach((recipe) => {
    console.log(`- ${recipe.name} by ${recipe.author}`);
    console.log(`  ${recipe.description}`);
    console.log(`  Ingredients: ${recipe.ingredients.join(", ")}`);
  });
}

const searchParams = {
  authors: ["best", "cook"],
  ingredients: ["syrup"],
  searchTerms: "brunch pancakes",
};

const searchResults = searchRecipes(cakeRecipes, searchParams);
printRecipes(searchResults);
