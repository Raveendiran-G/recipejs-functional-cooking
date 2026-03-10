// ----------------------------
// Recipe Data
// ----------------------------
const recipes = [
{
title:"Spaghetti Carbonara",
difficulty:"medium",
time:25,
description:"Classic Italian pasta with eggs, cheese and bacon"
},
{
title:"Grilled Cheese Sandwich",
difficulty:"easy",
time:10,
description:"Simple toasted sandwich with melted cheese"
},
{
title:"Chicken Curry",
difficulty:"hard",
time:60,
description:"Spicy chicken curry with rich gravy"
},
{
title:"Pancakes",
difficulty:"easy",
time:20,
description:"Fluffy breakfast pancakes with syrup"
},
{
title:"Vegetable Stir Fry",
difficulty:"easy",
time:15,
description:"Quick healthy veggies stir fried with sauce"
},
{
title:"Beef Steak",
difficulty:"hard",
time:45,
description:"Juicy grilled steak with seasoning"
},
{
title:"Caesar Salad",
difficulty:"easy",
time:15,
description:"Fresh salad with lettuce and dressing"
},
{
title:"Lasagna",
difficulty:"medium",
time:50,
description:"Layered pasta with cheese and meat sauce"
}
];

// ----------------------------
// State Management
// ----------------------------
let currentFilter = "all";
let currentSort = "none";

const recipeContainer = document.getElementById("recipe-container");
const filterButtons = document.querySelectorAll("[data-filter]");
const sortButtons = document.querySelectorAll("[data-sort]");

// ----------------------------
// Render Recipes
// ----------------------------
function renderRecipes(recipesArray){

recipeContainer.innerHTML = "";

recipesArray.forEach(recipe=>{

const card=document.createElement("div");
card.className="recipe-card";

card.innerHTML=`
<h3>${recipe.title}</h3>
<div class="recipe-meta">
Difficulty: ${recipe.difficulty} | Time: ${recipe.time} mins
</div>
<p class="recipe-desc">${recipe.description}</p>
`;

recipeContainer.appendChild(card);

});

}

// ----------------------------
// Filter Functions (PURE)
// ----------------------------
const filterByDifficulty = (recipes,difficulty)=>{
return recipes.filter(recipe=>recipe.difficulty===difficulty);
};

const filterByTime = (recipes,time)=>{
return recipes.filter(recipe=>recipe.time<time);
};

function applyFilter(recipesArray,filterType){

switch(filterType){

case "easy":
case "medium":
case "hard":
return filterByDifficulty(recipesArray,filterType);

case "quick":
return filterByTime(recipesArray,30);

default:
return recipesArray;

}

}

// ----------------------------
// Sort Functions (PURE)
// ----------------------------
const sortByName = (recipes)=>{
return [...recipes].sort((a,b)=>a.title.localeCompare(b.title));
};

const sortByTime = (recipes)=>{
return [...recipes].sort((a,b)=>a.time-b.time);
};

function applySort(recipesArray,sortType){

switch(sortType){

case "name":
return sortByName(recipesArray);

case "time":
return sortByTime(recipesArray);

default:
return recipesArray;

}

}

// ----------------------------
// Update Display
// ----------------------------
function updateDisplay(){

let recipesToDisplay=[...recipes];

recipesToDisplay=applyFilter(recipesToDisplay,currentFilter);

recipesToDisplay=applySort(recipesToDisplay,currentSort);

renderRecipes(recipesToDisplay);

console.log(`Displaying ${recipesToDisplay.length} recipes (Filter: ${currentFilter}, Sort: ${currentSort})`);

}

// ----------------------------
// Update Active Buttons
// ----------------------------
function updateActiveButtons(){

filterButtons.forEach(btn=>{
btn.classList.remove("active");
if(btn.dataset.filter===currentFilter){
btn.classList.add("active");
}
});

sortButtons.forEach(btn=>{
btn.classList.remove("active");
if(btn.dataset.sort===currentSort){
btn.classList.add("active");
}
});

}

// ----------------------------
// Event Handlers
// ----------------------------
function handleFilterClick(e){

currentFilter=e.target.dataset.filter;

updateActiveButtons();

updateDisplay();

}

function handleSortClick(e){

currentSort=e.target.dataset.sort;

updateActiveButtons();

updateDisplay();

}

// ----------------------------
// Setup Event Listeners
// ----------------------------
function setupEventListeners(){

filterButtons.forEach(btn=>{
btn.addEventListener("click",handleFilterClick);
});

sortButtons.forEach(btn=>{
btn.addEventListener("click",handleSortClick);
});

}

// ----------------------------
// Initialization
// ----------------------------
setupEventListeners();
updateDisplay();