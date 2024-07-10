import navbar from "../../-Food-Recipe-App/component/navbar.js";

let nav=document.getElementById("navbar");
nav.innerHTML=navbar();

document.addEventListener('DOMContentLoaded', function() {
    fetchRandomRecipes(5); // Fetch 5 random recipes
});

function fetchRandomRecipes(count) {
    const promises = [];

    for (let i = 0; i < count; i++) {
        promises.push(fetch('https://www.themealdb.com/api/json/v1/1/random.php').then(response => response.json()));
    }

    Promise.all(promises)
        .then(results => {
            const recipes = results.map(result => result.meals[0]);
            displayRandomRecipes(recipes);
        })
        .catch(error => {
            console.error('Error fetching random recipes:', error);
        });
}

function displayRandomRecipes(recipes) {
    const container = document.getElementById('randomRecipesContainer');
    container.innerHTML = '';

    recipes.forEach(recipe => {
        const recipeElement = document.createElement('div');
         recipeElement.className = 'recipe';

        recipeElement.innerHTML = `
            <h2>${recipe.strMeal}</h2>
            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
            <p>${recipe.strInstructions}</p>
        `;

        container.appendChild(recipeElement);
    });
}