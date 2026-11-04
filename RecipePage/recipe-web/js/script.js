/* Plain JavaScript: no framework or build step required. */
'use strict';

const favoriteStorageKey = 'benders-kitchen-favorites';
let memoryFavorites = [];
let sessionFavoritesOnly = false;

function readFavorites() {
    if (sessionFavoritesOnly) return memoryFavorites;
    try {
        const saved = JSON.parse(localStorage.getItem(favoriteStorageKey) || '[]');
        return Array.isArray(saved) ? saved.filter(id => recipes.some(recipe => recipe.id === id)) : [];
    } catch {
        return memoryFavorites;
    }
}

function saveFavorites(ids) {
    memoryFavorites = ids;
    try {
        localStorage.setItem(favoriteStorageKey, JSON.stringify(ids));
        return true;
    } catch {
        sessionFavoritesOnly = true;
        return false;
    }
}

function normalizeText(value) {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

function filterRecipes(query, category, favoritesOnly) {
    const words = normalizeText(query).split(/\s+/).filter(Boolean);
    const favorites = readFavorites();
    return recipes.filter(recipe => {
        const text = normalizeText([recipe.name, recipe.description, categories[recipe.category], ...recipe.ingredients].join(' '));
        return words.every(word => text.includes(word)) &&
            (category === 'all' || recipe.category === category) &&
            (!favoritesOnly || favorites.includes(recipe.id));
    });
}

// Only locally defined recipe data is used in these templates.
function recipeCard(recipe) {
    return `<article class="todays_recipes_content_block">
        <div class="todays_recipes_content_block_image">
            <a href="recipe-detail.html?id=${recipe.id}" aria-label="View ${recipe.name}"><img src="${recipe.image}" alt="Random placeholder for ${recipe.name}" loading="lazy" width="600" height="400"></a>
        </div>
        <div class="todays_recipes_content_block_text">
            <div class="todays_recipes_content_block_text_top"><h3>${recipe.name}</h3><p>${recipe.description}</p></div>
            <div class="todays_recipes_content_block_text_bottom">
                <div data-category="${recipe.category}" class="todays_recipes_content_bottom_area">
                    <div class="todays_recipes_content_bottom_area_left"><p data-category="${recipe.category}">${categories[recipe.category]}</p><p>Recipe</p></div>
                    <div class="todays_recipes_content_bottom_area_right"><a class="button" href="recipe-detail.html?id=${recipe.id}">How to</a></div>
                </div>
            </div>
        </div>
    </article>`;
}

function setupNavigation() {
    const currentFile = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navigation a').forEach(link => {
        if (link.getAttribute('href') === currentFile) link.setAttribute('aria-current', 'page');
    });
}

function setupHome() {
    const list = document.querySelector('.todays_recipes_content');
    const featuredIds = ['craptacular', 'chicktastic', 'dessertalicious', 'spicy-meatabowl'];
    list.innerHTML = featuredIds.map(id => recipeCard(recipes.find(recipe => recipe.id === id))).join('');
}

function fillList(element, items) {
    element.replaceChildren(...items.map(text => {
        const li = document.createElement('li');
        li.textContent = text;
        return li;
    }));
}

function setupRecipe() {
    const id = new URLSearchParams(location.search).get('id') || 'lentil-soup';
    const recipe = recipes.find(item => item.id === id);
    if (!recipe) {
        const main = document.getElementById('main');
        main.innerHTML = '<section class="page-width empty-state"><h1>Recipe not found</h1><p>This recipe link does not exist. Choose a recipe from the search page.</p><a class="button" href="search.html">Browse recipes</a></section>';
        document.title = "Recipe not found | Bender's kitchen";
        return;
    }

    document.title = `${recipe.name} | Bender's kitchen`;
    const heading = document.getElementById('recipe-title');
    if (recipe.id === 'lentil-soup') {
        heading.innerHTML = 'Boozy brown <strong>Lentil soup</strong>';
    } else {
        heading.textContent = recipe.name;
    }
    document.getElementById('recipe-time').textContent = `◷ ${recipe.time} minutes`;
    document.getElementById('recipe-calories').textContent = `${recipe.calories} calories`;
    document.getElementById('recipe-level').textContent = recipe.level;
    const image = document.getElementById('recipe-image');
    image.src = recipe.image;
    image.alt = `Random placeholder for ${recipe.name}`;
    fillList(document.getElementById('ingredients'), recipe.ingredients);
    fillList(document.getElementById('bonus-ingredients'), recipe.ingredients);
    fillList(document.getElementById('instructions'), recipe.instructions);

    const checklist = document.getElementById('cooking-checklist');
    recipe.instructions.forEach((instruction, index) => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'checkbox';
        const text = document.createElement('span');
        text.textContent = `${index + 1}. ${instruction}`;
        label.append(input, text);
        checklist.append(label);
    });

    const favorite = document.getElementById('favorite-recipe');
    function updateFavorite() {
        const saved = readFavorites().includes(recipe.id);
        favorite.setAttribute('aria-pressed', String(saved));
        favorite.textContent = saved ? '♥ Favourited' : '♡ Favourite';
    }
    favorite.addEventListener('click', () => {
        const ids = readFavorites();
        const wasSaved = ids.includes(recipe.id);
        const stored = saveFavorites(wasSaved ? ids.filter(item => item !== recipe.id) : [...ids, recipe.id]);
        updateFavorite();
        document.getElementById('favorite-status').textContent = stored
            ? (wasSaved ? 'Removed from favourites.' : 'Saved. Find it in Search → Favourites only.')
            : 'Browser storage is unavailable. This change lasts only while this page is open.';
    });
    window.addEventListener('storage', updateFavorite);
    document.getElementById('print-recipe').addEventListener('click', () => window.print());
    updateFavorite();
}

function setupSearch() {
    const form = document.getElementById('recipe-search');
    const queryInput = document.getElementById('recipe-query');
    const favoritesInput = document.getElementById('favorites-only');
    const results = document.getElementById('search-results');
    const count = document.getElementById('results-count');

    function restoreFromUrl() {
        const params = new URLSearchParams(location.search);
        queryInput.value = params.get('q') || '';
        const category = params.get('category');
        const validCategory = Object.hasOwn(categories, category) ? category : 'all';
        form.querySelectorAll('[name="category"]').forEach(input => { input.checked = input.value === validCategory; });
        favoritesInput.checked = params.get('favorites') === '1';
    }

    function render(updateUrl) {
        const category = form.querySelector('[name="category"]:checked').value;
        const matches = filterRecipes(queryInput.value, category, favoritesInput.checked);
        count.textContent = `${matches.length} ${matches.length === 1 ? 'recipe' : 'recipes'} found`;
        if (!matches.length) {
            results.innerHTML = '<div class="empty-state"><h2>No recipes found</h2><p>Try a different word, select All recipes or turn off Favourites only.</p></div>';
        } else {
            results.innerHTML = matches.map(recipe => `<article class="search-result" data-category="${recipe.category}">
                <p class="result-category">Category: <a href="search.html?category=${recipe.category}" data-category="${recipe.category}">${categories[recipe.category]}</a></p>
                <h2><a href="recipe-detail.html?id=${recipe.id}">${recipe.name}</a></h2>
                <p>${recipe.description}</p><p class="result-meta">${recipe.time} minutes · ${recipe.level}</p>
            </article>`).join('');
        }
        if (updateUrl) {
            const params = new URLSearchParams();
            if (queryInput.value.trim()) params.set('q', queryInput.value.trim());
            if (category !== 'all') params.set('category', category);
            if (favoritesInput.checked) params.set('favorites', '1');
            // file:// sometimes blocks History API; searching still works.
            try { history.replaceState(null, '', location.pathname + (params.size ? `?${params}` : '') + location.hash); } catch { /* Local-file fallback. */ }
        }
    }

    form.addEventListener('submit', event => { event.preventDefault(); render(true); });
    queryInput.addEventListener('input', () => render(true));
    form.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(input => {
        input.addEventListener('change', () => render(true));
    });
    document.getElementById('reset-search').addEventListener('click', () => { form.reset(); render(true); queryInput.focus(); });
    window.addEventListener('popstate', () => { restoreFromUrl(); render(false); });
    window.addEventListener('storage', () => render(false));
    restoreFromUrl();
    render(false);
}

setupNavigation();
if (document.body.dataset.page === 'home') setupHome();
if (document.body.dataset.page === 'recipe') setupRecipe();
if (document.body.dataset.page === 'search') setupSearch();
