import navbar from "../../-Food-Recipe-App/component/navbar.js";

let nav=document.getElementById("navbar");
nav.innerHTML=navbar();

document.getElementById('searchButton').addEventListener('click', function() {
    const query = document.getElementById('searchInput').value;
    searchRecipes(query);
});

function searchRecipes(query) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        .then(response => response.json())
        .then(data => {
            displayResults(data.meals);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayResults(recipes) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (recipes) {
        recipes.forEach((recipe) => {
            const recipeElement = document.createElement('div');
            recipeElement.className = 'recipe';

            recipeElement.innerHTML = `
                <h2>Recipe-Name: ${recipe.strMeal}</h2>
                <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
                <p>${recipe.strInstructions}</p>
            `;

            resultsContainer.appendChild(recipeElement);
        });
    } else {
        resultsContainer.innerHTML = '<p>No recipes found.</p>';
    }
}