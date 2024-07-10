import navbar from "../../-Food-Recipe-App/component/navbar.js";

let nav=document.getElementById("navbar");
nav.innerHTML=navbar();
async function fetchRandomMeal() {
    const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.meals[0];
    } catch (error) {
        console.error('Error fetching random meal:', error);
        return null;
    }
}

function displayMeal(meal) {
    const container = document.getElementById('mealContainer');
    container.innerHTML = '';
    if (meal) {
        const mealElement = document.createElement('div');
        mealElement.className = 'meal';

        mealElement.innerHTML = `
            <h3>${meal.strMeal}</h3>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <p>${meal.strInstructions}</p>
        `;
        container.appendChild(mealElement);
    } else {
        container.innerHTML = '<p>No meal found.</p>';
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const meal = await fetchRandomMeal();
    displayMeal(meal);
});