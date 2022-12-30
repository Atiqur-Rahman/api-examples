const searchBtn = document.getElementById('button-search');
const searchInput = document.getElementById('search-field');

searchInput.addEventListener('keypress', function (event) {
    // event.preventDefault();
    // console.log('keypress triggered', event.key);
    if (event.key == 'Enter') {
        // console.log('clicked');
        searchBtn.click();
    }
});

document.getElementById('error-message1').style.display = 'none';

const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
    document.getElementById('error-message1').style.display = 'none';

    if (searchText == '') {
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = '';
        const div = document.createElement('div');
        div.style.textAlign = 'center';
        div.style.color = 'red';
        div.innerHTML = `
            <p>Please write something to display.</p>
        `;
        errorMessage.appendChild(div);
    } else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        // load data
        fetch(url)
            .then((res) => res.json())
            .then((data) => displaySearchResult(data.meals))
            .catch((error) => displayError(error));
    }
};

const displayError = (error) => {
    document.getElementById('error-message1').style.display = 'block';
};

const displaySearchResult = (meals) => {
    const searchResult = document.getElementById('search-result');
    // searchResult.innerHTML = '';
    searchResult.textContent = '';
    // console.log(meals);

    if (meals == null) {
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = '';
        const div = document.createElement('div');
        div.style.textAlign = 'center';
        div.style.color = 'red';
        div.innerHTML = `
            <p>No results found.</p>
        `;
        errorMessage.appendChild(div);
    } else {
        meals.forEach((meal) => {
            // console.log(meal);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div onclick="loadMealDetail(${meal.idMeal})" class="card h-100">
                    <img src=${meal.strMealThumb} class="card-img-top" alt="..." />
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
                    </div>
                </div>
            `;
            searchResult.appendChild(div);
        });
    }
};

const loadMealDetail = async (mealId) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        displayMealDetail(data.meals[0]);
    } catch (error) {
        displayError(error);
    }
    /* fetch(url)
        .then((res) => res.json())
        .then((data) => displayMealDetail(data.meals[0])); */
};

const displayMealDetail = (meal) => {
    const mealDetail = document.getElementById('meal-detail');
    mealDetail.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src=${meal.strMealThumb} class="card-img-top" alt="..." />
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
            <a href=${meal.strYoutube} class="btn btn-primary">Go somewhere</a>
        </div>
    `;
    mealDetail.appendChild(div);
};
