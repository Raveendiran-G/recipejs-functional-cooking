const RecipeApp = (function () {

    console.log("RecipeApp initializing...")

    // --------------------
    // DATA
    // --------------------

    const recipes = [

        {
            id: 1,
            title: "Spaghetti Carbonara",
            difficulty: "medium",
            time: 25,
            ingredients: ["Pasta", "Eggs", "Parmesan", "Bacon", "Pepper"],

            steps: [
                "Boil pasta",
                {
                    text: "Prepare sauce",
                    substeps: [
                        "Heat pan",
                        "Cook bacon",
                        {
                            text: "Mix egg mixture",
                            substeps: [
                                "Beat eggs",
                                "Add cheese"
                            ]
                        }
                    ]
                },
                "Combine pasta and sauce",
                "Serve hot"
            ]
        },

        {
            id: 2,
            title: "Grilled Cheese Sandwich",
            difficulty: "easy",
            time: 10,

            ingredients: ["Bread", "Butter", "Cheese"],

            steps: [
                "Butter bread",
                "Place cheese between slices",
                "Grill until golden"
            ]
        },

        {
            id: 3,
            title: "Chicken Curry",
            difficulty: "hard",
            time: 60,

            ingredients: ["Chicken", "Onion", "Tomato", "Spices", "Garlic"],

            steps: [
                "Marinate chicken",
                "Cook onions",
                "Add spices",
                "Add chicken",
                "Simmer 30 minutes"
            ]
        },

        {
            id: 4,
            title: "Pancakes",
            difficulty: "easy",
            time: 20,
            ingredients: ["Flour", "Milk", "Eggs", "Sugar", "Butter"],

            steps: [
                "Mix ingredients",
                "Heat pan",
                "Pour batter",
                "Flip pancake",
                "Serve with syrup"
            ]
        },

        {
            id: 5,
            title: "Vegetable Stir Fry",
            difficulty: "easy",
            time: 15,
            ingredients: ["Carrots", "Broccoli", "Soy sauce", "Garlic"],

            steps: [
                "Chop vegetables",
                "Heat oil",
                "Stir fry veggies",
                "Add sauce"
            ]
        },

        {
            id: 6,
            title: "Beef Steak",
            difficulty: "hard",
            time: 45,
            ingredients: ["Beef", "Salt", "Pepper", "Butter"],

            steps: [
                "Season steak",
                "Heat pan",
                "Cook each side",
                "Rest meat",
                "Serve"
            ]
        },

        {
            id: 7,
            title: "Caesar Salad",
            difficulty: "easy",
            time: 15,
            ingredients: ["Lettuce", "Croutons", "Parmesan", "Dressing"],

            steps: [
                "Wash lettuce",
                "Toss ingredients",
                "Add dressing"
            ]
        },

        {
            id: 8,
            title: "Lasagna",
            difficulty: "medium",
            time: 50,
            ingredients: ["Lasagna sheets", "Tomato sauce", "Cheese", "Beef"],

            steps: [
                "Cook meat",
                "Prepare sauce",
                "Layer pasta and sauce",
                "Bake 30 minutes"
            ]
        }

    ]

    // --------------------
    // STATE
    // --------------------

    let currentFilter = "all"
    let currentSort = "none"

    const recipeContainer = document.getElementById("recipe-container")
    const filterButtons = document.querySelectorAll("[data-filter]")
    const sortButtons = document.querySelectorAll("[data-sort]")

    // --------------------
    // RECURSIVE STEPS
    // --------------------

    const renderSteps = (steps, level = 0) => {

        let html = ""

        steps.forEach((step, index) => {

            if (typeof step === "string") {

                html += `<li class="steps-level-${level}">${step}</li>`

            } else {

                html += `<li class="steps-level-${level}">${step.text}`

                if (step.substeps) {
                    html += `<ul>${renderSteps(step.substeps, level + 1)}</ul>`
                }

                html += `</li>`

            }

        })

        return html

    }

    const createStepsHTML = (steps) => {

        return `
<ul>
${renderSteps(steps)}
</ul>
`

    }

    // --------------------
    // CARD
    // --------------------

    const createRecipeCard = (recipe) => {

        return `

<div class="recipe-card">

<h3>${recipe.title}</h3>

<div class="recipe-meta">
Difficulty: ${recipe.difficulty} | Time: ${recipe.time} mins
</div>

<button class="toggle-btn" data-toggle="ingredients" data-recipe-id="${recipe.id}">
Show Ingredients
</button>

<div class="ingredients-container" id="ingredients-${recipe.id}">
<ul>
${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}
</ul>
</div>

<button class="toggle-btn" data-toggle="steps" data-recipe-id="${recipe.id}">
Show Steps
</button>

<div class="steps-container" id="steps-${recipe.id}">
${createStepsHTML(recipe.steps)}
</div>

</div>

`

    }

    // --------------------
    // RENDER
    // --------------------

    const renderRecipes = (recipes) => {

        recipeContainer.innerHTML = recipes.map(createRecipeCard).join("")

    }

    // --------------------
    // FILTER
    // --------------------

    const applyFilter = (recipes, filter) => {

        switch (filter) {

            case "easy":
            case "medium":
            case "hard":
                return recipes.filter(r => r.difficulty === filter)

            case "quick":
                return recipes.filter(r => r.time < 30)

            default:
                return recipes

        }

    }

    // --------------------
    // SORT
    // --------------------

    const applySort = (recipes, sort) => {

        const copy = [...recipes]

        switch (sort) {

            case "name":
                return copy.sort((a, b) => a.title.localeCompare(b.title))

            case "time":
                return copy.sort((a, b) => a.time - b.time)

            default:
                return recipes

        }

    }

    // --------------------
    // UPDATE DISPLAY
    // --------------------

    const updateDisplay = () => {

        let result = [...recipes]

        result = applyFilter(result, currentFilter)

        result = applySort(result, currentSort)

        renderRecipes(result)

    }

    // --------------------
    // TOGGLE HANDLER
    // --------------------

    const handleToggleClick = (e) => {

        if (!e.target.classList.contains("toggle-btn")) return

        const recipeId = e.target.dataset.recipeId
        const toggleType = e.target.dataset.toggle

        const container = document.getElementById(`${toggleType}-${recipeId}`)

        container.classList.toggle("visible")

        e.target.textContent =
            container.classList.contains("visible")
                ? `Hide ${toggleType.charAt(0).toUpperCase() + toggleType.slice(1)}`
                : `Show ${toggleType.charAt(0).toUpperCase() + toggleType.slice(1)}`

    }

    // --------------------
    // EVENT LISTENERS
    // --------------------

    const setupEventListeners = () => {

        filterButtons.forEach(btn => {
            btn.addEventListener("click", (e) => {
                currentFilter = e.target.dataset.filter
                updateDisplay()
            })
        })

        sortButtons.forEach(btn => {
            btn.addEventListener("click", (e) => {
                currentSort = e.target.dataset.sort
                updateDisplay()
            })
        })

        recipeContainer.addEventListener("click", handleToggleClick)

        console.log("Event listeners attached!")

    }

    // --------------------
    // INIT
    // --------------------

    const init = () => {

        setupEventListeners()

        updateDisplay()

        console.log("RecipeApp ready!")

    }

    return {
        init,
        updateDisplay
    }

})()

RecipeApp.init()