// GrubMaster App - Main JavaScript

// ==================== DATA STORAGE ====================

class DataStore {
    constructor() {
        this.storageKey = 'grubmaster_data';
        this.data = this.load();
    }

    load() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
            return JSON.parse(saved);
        }
        return {
            trips: [],
            recipes: this.getDefaultRecipes(),
            receipts: {},
            settings: {
                troopName: 'Troop 242',
                defaultScouts: 6,
                targetCostPerScoutPerDay: 6.00
            }
        };
    }

    save() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    }

    getDefaultRecipes() {
        // Recipes are now imported from recipes.js
        return DEFAULT_RECIPES;
    }

    // Trip methods
    saveTrip(trip) {
        trip.id = 'trip_' + Date.now();
        this.data.trips.push(trip);
        this.data.receipts[trip.id] = [];
        this.save();
        return trip;
    }

    getTrips() {
        return this.data.trips;
    }

    getTrip(id) {
        return this.data.trips.find(t => t.id === id);
    }

    deleteTrip(id) {
        this.data.trips = this.data.trips.filter(t => t.id !== id);
        delete this.data.receipts[id];
        this.save();
    }

    // Recipe methods
    getRecipes() {
        return this.data.recipes;
    }

    getRecipe(id) {
        return this.data.recipes.find(r => r.id === id);
    }

    addRecipe(recipe) {
        recipe.id = 'custom_' + Date.now();
        this.data.recipes.push(recipe);
        this.save();
        return recipe;
    }
    // Receipt methods
    addReceipt(tripId, receipt) {
        if (!this.data.receipts[tripId]) {
            this.data.receipts[tripId] = [];
        }
        receipt.id = 'receipt_' + Date.now();
        receipt.tripId = tripId;
        this.data.receipts[tripId].push(receipt);
        this.save();
        return receipt;
    }

    getReceipts(tripId) {
        return this.data.receipts[tripId] || [];
    }

    deleteReceipt(tripId, receiptId) {
        if (this.data.receipts[tripId]) {
            this.data.receipts[tripId] = this.data.receipts[tripId].filter(r => r.id !== receiptId);
            this.save();
        }
    }

    // Settings methods
    getSettings() {
        return this.data.settings;
    }

    clearAll() {
        this.data = {
            trips: [],
            recipes: this.getDefaultRecipes(),
            receipts: {},
            settings: {
                troopName: 'Troop 242',
                defaultScouts: 6,
                targetCostPerScoutPerDay: 6.00
            }
        };
        this.save();
    }
}


// ==================== SERVICE LAYER (Microservices) ====================

/**
 * RecipeService - Handles all recipe-related operations
 */
class RecipeService {
    constructor(dataStore) {
        this.store = dataStore;
    }

    getAllRecipes() {
        return this.store.getRecipes();
    }

    getRecipeById(id) {
        return this.store.getRecipe(id);
    }

    getRecipesByCategory(category) {
        return this.getAllRecipes().filter(r => r.category === category);
    }

    addRecipe(recipe) {
        return this.store.addRecipe(recipe);
    }

    scaleRecipe(recipe, targetServings) {
        const scale = targetServings / recipe.servings;
        return recipe.ingredients.map(ing => ({
            ...ing,
            quantity: ing.quantity * scale,
            cost: ing.cost * scale
        }));
    }

    getRecipesByQuery(query) {
        const q = (query || '').toLowerCase();
        return this.getAllRecipes().filter(r =>
            r.name.toLowerCase().includes(q) ||
            r.ingredients.some(ing => ing.name.toLowerCase().includes(q))
        );
    }

    getRecipeCategories() {
        const categories = new Set();
        this.getAllRecipes().forEach(r => categories.add(r.category));
        return Array.from(categories);
    }

    calculateRecipeCost(recipe) {
        return recipe.ingredients.reduce((sum, ing) => sum + ing.cost, 0);
    }

    // API endpoint
    toJSON() {
        return {
            recipes: this.getAllRecipes(),
            totalRecipes: this.getAllRecipes().length,
            categories: this.getRecipeCategories()
        };
    }
}

/**
 * TripService - Handles meal plan and trip management
 */
class TripService {
    constructor(dataStore, recipeService) {
        this.store = dataStore;
        this.recipeService = recipeService;
    }

    getAllTrips() {
        return this.store.getTrips();
    }

    getTripById(id) {
        return this.store.getTrip(id);
    }

    saveTrip(tripData) {
        return this.store.saveTrip(tripData);
    }

    deleteTrip(id) {
        this.store.deleteTrip(id);
    }

    calculateTotalCost(trip) {
        return trip.totalCost || 0;
    }

    calculatePerScoutCost(trip) {
        return this.calculateTotalCost(trip) / trip.numScouts;
    }

    calculatePerScoutPerDayCost(trip) {
        const perScout = this.calculatePerScoutCost(trip);
        return perScout / Math.max(1, trip.days);
    }

    aggregateShoppingList(mealPlan) {
        const shoppingList = {};
        mealPlan.forEach(dayPlan => {
            dayPlan.meals.forEach(meal => {
                meal.scaledIngredients.forEach(ing => {
                    if (!shoppingList[ing.name]) {
                        shoppingList[ing.name] = { quantity: 0, unit: ing.unit, cost: 0 };
                    }
                    shoppingList[ing.name].quantity += ing.quantity;
                    shoppingList[ing.name].cost += ing.cost;
                });
            });
        });
        return shoppingList;
    }

    // API endpoint
    toJSON() {
        return {
            totalTrips: this.getAllTrips().length,
            trips: this.getAllTrips().map(t => ({
                id: t.id,
                tripName: t.tripName,
                numScouts: t.numScouts,
                days: t.days,
                totalCost: this.calculateTotalCost(t),
                perScoutCost: this.calculatePerScoutCost(t),
                perScoutPerDayCost: this.calculatePerScoutPerDayCost(t)
            }))
        };
    }
}

/**
 * AuditService - Handles receipts and budget tracking
 */
class AuditService {
    constructor(dataStore) {
        this.store = dataStore;
    }

    addReceipt(tripId, receipt) {
        return this.store.addReceipt(tripId, receipt);
    }

    getReceiptsByTrip(tripId) {
        return this.store.getReceipts(tripId);
    }

    deleteReceipt(tripId, receiptId) {
        this.store.deleteReceipt(tripId, receiptId);
    }

    calculateTotalSpent(tripId) {
        const receipts = this.getReceiptsByTrip(tripId);
        return receipts.reduce((sum, r) => sum + parseFloat(r.amount), 0);
    }

    calculateBudgetDifference(tripId, plannedCost) {
        return this.calculateTotalSpent(tripId) - plannedCost;
    }

    isOverBudget(tripId, plannedCost) {
        return this.calculateBudgetDifference(tripId, plannedCost) > 0;
    }

    generateAuditReport(trip) {
        const totalSpent = this.calculateTotalSpent(trip.id);
        const difference = this.calculateBudgetDifference(trip.id, trip.totalCost);
        const percentDiff = trip.totalCost > 0 ? (difference / trip.totalCost * 100) : 0;

        return {
            tripId: trip.id,
            tripName: trip.tripName,
            plannedCost: trip.totalCost,
            actualSpent: totalSpent,
            difference,
            percentDifference: percentDiff,
            isOverBudget: this.isOverBudget(trip.id, trip.totalCost),
            receiptsCount: this.getReceiptsByTrip(trip.id).length,
            perScoutActual: totalSpent / trip.numScouts
        };
    }

    // API endpoint
    toJSON(tripId) {
        return {
            receipts: this.getReceiptsByTrip(tripId),
            totalSpent: this.calculateTotalSpent(tripId),
            receiptsCount: this.getReceiptsByTrip(tripId).length
        };
    }
}

/**
 * SettingsService - Handles app configuration
 */
class SettingsService {
    constructor(dataStore) {
        this.store = dataStore;
    }

    getSettings() {
        return this.store.getSettings();
    }

    updateSettings(settings) {
        this.store.updateSettings(settings);
    }

    getSetting(key) {
        const settings = this.getSettings();
        return settings[key];
    }

    setSetting(key, value) {
        const settings = this.getSettings();
        settings[key] = value;
        this.updateSettings(settings);
    }

    getTargetCostPerDay() {
        return this.getSetting('targetCostPerScoutPerDay') || 6.00;
    }

    getTroopName() {
        return this.getSetting('troopName') || 'Troop 242';
    }

    getDefaultScouts() {
        return this.getSetting('defaultScouts') || 6;
    }

    // API endpoint
    toJSON() {
        return this.getSettings();
    }
}

/**
 * APILayer - Unified API for external microservices consumption
 */
class APILayer {
    constructor(recipeService, tripService, auditService, settingsService) {
        this.recipes = recipeService;
        this.trips = tripService;
        this.audit = auditService;
        this.settings = settingsService;
    }

    // Recipes API
    api_getRecipes() {
        return this.recipes.toJSON();
    }

    api_getRecipesByCategory(category) {
        return {
            category,
            recipes: this.recipes.getRecipesByCategory(category),
            count: this.recipes.getRecipesByCategory(category).length
        };
    }

    api_searchRecipes(query) {
        return {
            query,
            results: this.recipes.getRecipesByQuery(query),
            count: this.recipes.getRecipesByQuery(query).length
        };
    }

    // Trips API
    api_getTrips() {
        return this.trips.toJSON();
    }

    api_getTripById(tripId) {
        const trip = this.trips.getTripById(tripId);
        if (!trip) return { error: 'Trip not found' };
        return trip;
    }

    api_createTrip(tripData) {
        return this.trips.saveTrip(tripData);
    }

    api_deleteTrip(tripId) {
        this.trips.deleteTrip(tripId);
        return { success: true, message: 'Trip deleted' };
    }

    // Audit API
    api_getAuditReport(tripId) {
        const trip = this.trips.getTripById(tripId);
        if (!trip) return { error: 'Trip not found' };
        return this.audit.generateAuditReport(trip);
    }

    api_addReceipt(tripId, receipt) {
        return this.audit.addReceipt(tripId, receipt);
    }

    api_getReceipts(tripId) {
        return this.audit.toJSON(tripId);
    }

    // Settings API
    api_getSettings() {
        return this.settings.toJSON();
    }

    api_updateSettings(settings) {
        this.settings.updateSettings(settings);
        return { success: true, settings: this.settings.toJSON() };
    }

    // Health/Status
    api_status() {
        return {
            status: 'healthy',
            timestamp: new Date().toISOString(),
            recipes: this.recipes.getAllRecipes().length,
            trips: this.trips.getAllTrips().length,
            settings: this.settings.getSettings()
        };
    }
}

// ==================== APP CONTROLLER ====================

class GrubMasterApp {
    constructor() {
        this.store = new DataStore();
        this.currentPage = 'planner';
        this.filterTimeouts = {};
        this.filterStates = {};
        this.isAuthenticated = localStorage.getItem('grubmaster_auth') === 'true';

        // Initialize service layer (Dependency Injection)
        this.recipeService = new RecipeService(this.store);
        this.tripService = new TripService(this.store, this.recipeService);
        this.auditService = new AuditService(this.store);
        this.settingsService = new SettingsService(this.store);

        // Initialize API layer for microservices
        this.api = new APILayer(this.recipeService, this.tripService, this.auditService, this.settingsService);

        // Export API globally for external access
        window.grubmasterAPI = this.api;

        this.init();
    }

    debounce(func, wait, key) {
        return (...args) => {
            clearTimeout(this.filterTimeouts[key]);
            this.filterTimeouts[key] = setTimeout(() => func(...args), wait);
        };
    }

    getMealCategory(meal) {
        if (!meal) return '';

        const type = (meal.type || '').toLowerCase();
        const typeMap = {
            'breakfast': 'breakfast',
            'lunch': 'lunch',
            'dinner': 'dinner',
            'cracker barrel': 'snack',
            'snack': 'snack',
            'dessert': 'dessert'
        };

        if (typeMap[type]) return typeMap[type];
        if (meal.recipe && meal.recipe.category) return meal.recipe.category;
        if (meal.recipes && meal.recipes.length > 0) return meal.recipes[0].category;
        return type;
    }

    getMealSelectedRecipes(meal) {
        if (!meal) return [];
        if (Array.isArray(meal.recipes) && meal.recipes.length > 0) return meal.recipes;
        if (meal.recipe) return [meal.recipe];
        return [];
    }

    parsePrepTimeToMinutes(prepTime) {
        if (!prepTime || typeof prepTime !== 'string') return null;
        const text = prepTime.toLowerCase();
        const hrMatch = text.match(/(\d+(?:\.\d+)?)\s*hr/);
        const minMatch = text.match(/(\d+)\s*min/);
        const hours = hrMatch ? parseFloat(hrMatch[1]) : 0;
        const mins = minMatch ? parseInt(minMatch[1], 10) : 0;

        if (!hrMatch && !minMatch) return null;

        return Math.round(hours * 60 + mins);
    }

    formatMinutes(totalMinutes) {
        if (totalMinutes == null || Number.isNaN(totalMinutes)) return '';
        if (totalMinutes < 60) return `${totalMinutes} mins`;

        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        if (minutes === 0) return `${hours} hr${hours === 1 ? '' : 's'}`;
        return `${hours} hr${hours === 1 ? '' : 's'} ${minutes} mins`;
    }

    getMealPrepTimeText(meal) {
        const recipes = this.getMealSelectedRecipes(meal);
        if (recipes.length === 0) return 'Prep time varies by selection';

        const times = recipes
            .map(r => this.parsePrepTimeToMinutes(r.prepTime))
            .filter(t => t != null);

        if (times.length === 0) return 'Prep time varies by selection';

        const min = Math.min(...times);
        const max = Math.max(...times);
        if (min === max) return this.formatMinutes(min);
        return `${this.formatMinutes(min)} - ${this.formatMinutes(max)}`;
    }

    getMealTypeIcon(mealType) {
        const key = (mealType || '').toLowerCase();
        const map = {
            'breakfast': '☕',
            'lunch': '🍽️',
            'dinner': '🔥',
            'cracker barrel': '🍪'
        };
        return map[key] || '🍽️';
    }

    getRecipeDescription(recipe) {
        if (!recipe) return '';
        if (recipe.description) return recipe.description;

        const category = (recipe.category || '').toLowerCase();
        const categoryText = {
            breakfast: 'A hearty start for the day',
            lunch: 'A quick, scout-friendly midday meal',
            dinner: 'A satisfying camp dinner',
            snack: 'A simple cracker barrel favorite',
            dessert: 'A sweet camp treat'
        }[category] || 'A scout-tested camp recipe';

        return `${categoryText} featuring ${recipe.name.toLowerCase()}.`;
    }

    getRecipeSteps(instructions) {
        if (!instructions) return [];
        return instructions
            .split('\n')
            .map(step => step.replace(/^\s*\d+\.\s*/, '').trim())
            .filter(Boolean);
    }

    init() {
        this.setupLandingPage();
        this.setupNavigation();
        this.setupPlannerPage();
        this.setupRecipesPage();
        this.setupAuditorPage();
        this.setupSettingsPage();
        this.setupLogout();
        this.loadSavedPlans();
        this.loadDonePlans();
        this.loadSettings();

        const initialPage = window.location.hash.replace('#', '') || 'planner';
        this.navigateTo(initialPage);
    }

    setupLandingPage() {
        const landing = document.getElementById('landing-page');
        const appShell = document.getElementById('app-shell');
        const form = document.getElementById('login-form');
        const errorEl = document.getElementById('login-error');
        const getStartedBtn = document.getElementById('get-started-btn');

        if (!landing || !appShell || !form) return;

        const showLanding = () => {
            landing.style.display = 'flex';
            appShell.classList.add('hidden');
        };

        const showApp = () => {
            landing.style.display = 'none';
            appShell.classList.remove('hidden');
            this.navigateTo('planner');
        };

        this.showLanding = showLanding;
        this.showApp = showApp;

        if (this.isAuthenticated) {
            showApp();
        } else {
            showLanding();
        }

        if (getStartedBtn) {
            getStartedBtn.addEventListener('click', () => {
                form.scrollIntoView({ behavior: 'smooth', block: 'center' });
                const nameInput = document.getElementById('login-name');
                if (nameInput) nameInput.focus();
            });
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('login-name');
            const password = document.getElementById('login-password');
            const nameValue = name ? name.value.trim() : '';
            const passValue = password ? password.value.trim() : '';

            if (!nameValue || !passValue) {
                if (errorEl) errorEl.textContent = 'Enter your name and troop passcode to continue.';
                return;
            }

            if (passValue !== 'Troop242') {
                if (errorEl) errorEl.textContent = 'Incorrect passcode. Please try again.';
                return;
            }

            if (errorEl) errorEl.textContent = '';
            localStorage.setItem('grubmaster_auth', 'true');
            localStorage.setItem('grubmaster_user', nameValue);
            this.isAuthenticated = true;
            showApp();
        });
    }

    setupLogout() {
        const logoutBtn = document.getElementById('logout-btn');
        if (!logoutBtn) return;

        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('grubmaster_auth');
            localStorage.removeItem('grubmaster_user');
            this.isAuthenticated = false;
            if (this.showLanding) {
                this.showLanding();
            }
        });
    }

    // Navigation
    setupNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const page = btn.dataset.page;
                this.navigateTo(page);
                window.location.hash = page;
            });
        });

        window.addEventListener('hashchange', () => {
            const page = window.location.hash.replace('#', '') || 'planner';
            this.navigateTo(page);
        });
    }

    navigateTo(page) {
        // Update nav buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.page === page);
        });

        // Update pages
        document.querySelectorAll('.page').forEach(p => {
            p.classList.toggle('active', p.id === page + '-page');
        });

        this.currentPage = page;

        // Refresh data when navigating to certain pages
        if (page === 'auditor') {
            this.updateAuditTripSelect();
        }
    }

    // ==================== PLANNER PAGE ====================

    setupPlannerPage() {
        const form = document.getElementById('trip-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.generateMealPlan();
        });

        const donePlanningBtn = document.getElementById('done-planning');
        if (donePlanningBtn) {
            donePlanningBtn.addEventListener('click', () => {
                this.openDonePlanningModal();
            });
        }

        const doneModal = document.getElementById('done-planning-modal');
        if (doneModal) {
            doneModal.addEventListener('click', (e) => {
                const actionBtn = e.target.closest('button[data-done-action]');
                if (!actionBtn) return;
                const action = actionBtn.dataset.doneAction;
                if (!action) return;

                if (action === 'export') {
                    this.exportShoppingList();
                    this.recordDonePlan('Export');
                }

                if (action === 'print') {
                    this.printShoppingList();
                    this.recordDonePlan('Print');
                }

                doneModal.style.display = 'none';
            });
        }

        const attachDatePicker = (inputId) => {
            const input = document.getElementById(inputId);
            if (!input) return;
            const wrapper = input.closest('.form-group');
            if (!wrapper) return;

            wrapper.classList.add('date-picker-group');

            const openPicker = () => {
                if (typeof input.showPicker === 'function') {
                    input.showPicker();
                }
            };

            wrapper.addEventListener('click', () => {
                input.focus();
                openPicker();
            });

            input.addEventListener('focus', () => {
                input.focus();
            });

            input.addEventListener('click', (e) => {
                e.stopPropagation();
                openPicker();
            });
        };

        attachDatePicker('start-date');
        attachDatePicker('end-date');

        const savedPlansList = document.getElementById('saved-plans-list');
        if (savedPlansList) {
            savedPlansList.addEventListener('click', (e) => {
                const actionBtn = e.target.closest('button[data-action]');
                if (!actionBtn) return;

                const tripId = actionBtn.dataset.tripId;
                const action = actionBtn.dataset.action;
                if (!tripId || !action) return;

                if (action === 'view') {
                    this.viewPlan(tripId);
                }

                if (action === 'delete') {
                    this.deletePlan(tripId);
                }
            });
        }

        document.getElementById('save-plan').addEventListener('click', () => {
            this.savePlan();
        });

        document.getElementById('export-shopping-list').addEventListener('click', () => {
            this.exportShoppingList();
        });
    }

    generateMealPlan() {
        const tripName = document.getElementById('trip-name').value;
        const numScouts = parseInt(document.getElementById('num-scouts').value);
        const startDate = new Date(document.getElementById('start-date').value);
        startDate.setDate(startDate.getDate() + 1); // Add one day to start date
        const endDate = new Date(document.getElementById('end-date').value);
        const mealsPerDay = parseInt(document.getElementById('meals-per-day').value);

        // Calculate number of days
        const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 2; // Add 2 days to include both start and end date and account for first day with no meals

        // Generate meal plan
        const mealPlan = this.createMealPlan(days, numScouts, mealsPerDay);

        // Display meal plan
        this.displayMealPlan(mealPlan, tripName, numScouts, startDate, days);

        // Show the meal plan container
        document.getElementById('meal-plan-container').classList.remove('hidden');
    }

    createMealPlan(days, scouts, mealsPerDay) {
        const recipes = this.recipeService.getAllRecipes();
        const breakfasts = recipes.filter(r => r.category === 'breakfast');
        const lunches = recipes.filter(r => r.category === 'lunch');
        const dinners = recipes.filter(r => r.category === 'dinner');
        const snacks = recipes.filter(r => r.category === 'snack');

        const plan = [];

        for (let day = 1; day <= days; day++) {
            const dayPlan = { day, meals: [] };

            // Add breakfast
            if(day !== 1 && mealsPerDay >= 2)            { // Always exclude breakfast on first day and only include on last day if 3 or 4 meals per day
                const breakfast = breakfasts[Math.floor(Math.random() * breakfasts.length)];
                dayPlan.meals.push({
                    type: 'Breakfast',
                    recipe: breakfast,
                    scaledIngredients: this.recipeService.scaleRecipe(breakfast, scouts)
                });
            }
            // Add lunch 
            if (day !== 1 && mealsPerDay > 2 && day !== days) { // Exclude lunch on first day and only include if 3 or 4 meals per day
                const lunch = lunches[Math.floor(Math.random() * lunches.length)];
                dayPlan.meals.push({
                    type: 'Lunch',
                    recipe: lunch,
                    scaledIngredients: this.recipeService.scaleRecipe(lunch, scouts)
                });
            }
          
            // Add dinner
             if (day !== 1 && mealsPerDay >= 2 && day !== days) { // Exclude dinner on first day and only include if 3 or 4 meals per day
                const dinner = dinners[Math.floor(Math.random() * dinners.length)];
                dayPlan.meals.push({
                    type: 'Dinner',
                    recipe: dinner,
                    scaledIngredients: this.recipeService.scaleRecipe(dinner, scouts)
                });
            }
             // Add Snacks if 4 meals
            if (mealsPerDay === 4 && day === 1) { // Only include snacks if 4 meals per day and only include on first day to provide snacks for the day since no breakfast, lunch, or dinner
                const snack = snacks[Math.floor(Math.random() * snacks.length)];
                dayPlan.meals.push({
                    type: 'Cracker Barrel',
                    recipe: snack,
                    scaledIngredients: this.recipeService.scaleRecipe(snack, scouts)
                });
            }

            plan.push(dayPlan);
        }

        return plan;
    }

    displayMealPlan(plan, tripName, scouts, startDate, days) {
        const container = document.getElementById('meal-plan-content');
        let html = '';
        let totalCost = 0;
        const shoppingList = {};

        const allRecipes = this.recipeService.getAllRecipes();

        plan.forEach(dayPlan => {
            const date = new Date(startDate);
            date.setDate(date.getDate() + dayPlan.day - 1);

            html += `<div class="meal-day">
                <h4>Day ${dayPlan.day} - ${date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</h4>`;
            dayPlan.meals.forEach((meal, mealIndex) => {
                const mealCost = meal.scaledIngredients.reduce((sum, ing) => sum + ing.cost, 0);

                totalCost += mealCost;

                // Build options for this meal's category
                const category = this.getMealCategory(meal);
                const categoryRecipes = category ? allRecipes.filter(r => r.category === category) : allRecipes;
                const prepTimeText = this.getMealPrepTimeText(meal);
                // Build checkboxes for multiple selections
                let checkboxesHtml = '';
                const selectedRecipeIds = (meal.recipes && Array.isArray(meal.recipes)) 
                    ? meal.recipes.map(r => r.id) 
                    : (meal.recipe ? [meal.recipe.id] : []);
                
                categoryRecipes.forEach(r => {
                    const checked = selectedRecipeIds.includes(r.id) ? 'checked' : '';
                    checkboxesHtml += `<div class="recipe-checkbox">
                        <input type="checkbox" class="meal-checkbox" value="${r.id}" ${checked} data-day="${dayPlan.day}" data-meal-index="${mealIndex}">
                        <label>${r.name} ($${r.ingredients.reduce((s, i) => s + i.cost, 0).toFixed(2)})</label>
                    </div>`;
                });

                const filterKey = `day${dayPlan.day}_meal${mealIndex}`;
                const currentFilter = this.filterStates[filterKey] || '';

                const mealIcon = this.getMealTypeIcon(meal.type);

                html += `<div class="meal-item">
                    <div class="meal-item-content">
                        <div class="meal-title"><strong>${mealIcon} ${meal.type}:</strong></div>
                            <div class="meal-section">
                                <div class="meal-section-title">Recipe Choices</div>
                                <input type="text" class="meal-filter" placeholder="Filter recipes..." data-day="${dayPlan.day}" data-meal-index="${mealIndex}" value="${currentFilter}">
                                <div class="filter-match-count" data-day="${dayPlan.day}" data-meal-index="${mealIndex}">Recipes: ${categoryRecipes.length}</div>
                                <div class="recipe-list" data-day="${dayPlan.day}" data-meal-index="${mealIndex}">
                                    ${checkboxesHtml}
                                </div>
                            </div>
                        </div>
                  </div>
                   
                    <div class="meal-item">
                        <div class="meal-prep-block">
                            <div class="meal-section-title">Prep Time</div>
                            <small id="prep-time-${dayPlan.day}-${mealIndex}">${prepTimeText}</small>
                        </div>
                        <div class="meal-cost-block">
                            <div class="meal-section-title">Estimated Cost</div>
                            <div class="meal-cost" id="meal-cost-${dayPlan.day}-${mealIndex}">$${mealCost.toFixed(2)}</div>
                        </div>
                </div>`;

                // Aggregate shopping list
                meal.scaledIngredients.forEach(ing => {
                    if (!shoppingList[ing.name]) {
                        shoppingList[ing.name] = { quantity: 0, unit: ing.unit, cost: 0 };
                    }
                    shoppingList[ing.name].quantity += ing.quantity;
                    shoppingList[ing.name].cost += ing.cost;
                });
            });

            html += '</div>';
        });

        container.innerHTML = html;

        // Attach change handlers for checkboxes for multiple selections
        container.querySelectorAll('.meal-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => this.onMealCheckboxChange(e));
        });

        // Attach input handlers for filters with debounce
        container.querySelectorAll('.meal-filter').forEach(input => {
            const debouncedFilter = this.debounce((e) => {
                const q = (e.target.value || '').toLowerCase();
                const day = parseInt(e.target.dataset.day);
                const mealIndex = parseInt(e.target.dataset.mealIndex);
                const filterKey = `day${day}_meal${mealIndex}`;
                this.filterStates[filterKey] = q;

                const recipeList = container.querySelector(`.recipe-list[data-day="${day}"][data-meal-index="${mealIndex}"]`);
                const countDiv = container.querySelector(`.filter-match-count[data-day="${day}"][data-meal-index="${mealIndex}"]`);
                if (!recipeList || !countDiv) return;

                // Determine category for this meal from the current plan
                const mealObj = plan[day - 1] && plan[day - 1].meals[mealIndex];
                const category = this.getMealCategory(mealObj);
                const categoryRecipes = category ? allRecipes.filter(r => r.category === category) : allRecipes;
                const filtered = categoryRecipes.filter(r => {
                    return r.name.toLowerCase().includes(q) || r.ingredients.some(ing => ing.name.toLowerCase().includes(q));
                });

                const selectedRecipeIds = (mealObj && mealObj.recipes && Array.isArray(mealObj.recipes)) 
                    ? mealObj.recipes.map(r => r.id) 
                    : (mealObj && mealObj.recipe ? [mealObj.recipe.id] : []);

                let checkboxesHtml = '';
                filtered.forEach(r => {
                    const checked = selectedRecipeIds.includes(r.id) ? 'checked' : '';
                    checkboxesHtml += `<div class="recipe-checkbox">
                        <input type="checkbox" class="meal-checkbox" value="${r.id}" ${checked} data-day="${day}" data-meal-index="${mealIndex}">
                        <label>${r.name} ($${r.ingredients.reduce((s, i) => s + i.cost, 0).toFixed(2)})</label>
                    </div>`;
                });

                recipeList.innerHTML = checkboxesHtml;
                countDiv.textContent = `Recipes: ${filtered.length}/${categoryRecipes.length}`;

                // Re-attach checkbox handlers
                recipeList.querySelectorAll('.meal-checkbox').forEach(checkbox => {
                    checkbox.addEventListener('change', (e) => this.onMealCheckboxChange(e));
                });
            }, 300, `filter_day_meal`);

            input.addEventListener('input', debouncedFilter);
        });

        // Display shopping summary
        this.displayShoppingSummary(shoppingList, totalCost, scouts, days);

        // Store current plan for saving (include startDate so we can re-render)
        this.currentPlan = {
            tripName,
            numScouts: scouts,
            days,
            plan,
            shoppingList,
            totalCost,
            startDate: (startDate instanceof Date) ? startDate.toISOString() : new Date(startDate).toISOString()
        };
    }

    onMealCheckboxChange(e) {
        const checkbox = e.target;
        const day = parseInt(checkbox.dataset.day);
        const mealIndex = parseInt(checkbox.dataset.mealIndex);
        const recipeId = checkbox.value;

        if (!this.currentPlan || !this.currentPlan.plan) return;

        const plan = this.currentPlan.plan;
        const meal = plan[day - 1].meals[mealIndex];
        const recipe = this.recipeService.getRecipeById(recipeId);
        if (!recipe) return;

        // Initialize recipes array if needed
        if (!meal.recipes || !Array.isArray(meal.recipes)) {
            meal.recipes = meal.recipe ? [meal.recipe] : [];
            delete meal.recipe; // Remove old single recipe
        }

        // Add or remove recipe from selections
        if (checkbox.checked) {
            if (!meal.recipes.find(r => r.id === recipeId)) {
                meal.recipes.push(recipe);
            }
        } else {
            meal.recipes = meal.recipes.filter(r => r.id !== recipeId);
        }

        // Recalculate scaled ingredients for all selected recipes
        meal.scaledIngredients = [];
        meal.recipes.forEach(r => {
            const scaled = this.recipeService.scaleRecipe(r, this.currentPlan.numScouts);
            meal.scaledIngredients = meal.scaledIngredients.concat(scaled);
        });

        // Re-render the plan using stored metadata
        this.displayMealPlan(plan, this.currentPlan.tripName, this.currentPlan.numScouts, new Date(this.currentPlan.startDate), this.currentPlan.days);
    }

    displayShoppingSummary(shoppingList, totalCost, scouts, days = 1) {
        const container = document.getElementById('shopping-summary');
        let html = '';

        Object.entries(shoppingList).forEach(([name, data]) => {
            html += `<div class="shopping-item">
                <span>${name} (${data.quantity.toFixed(1)} ${data.unit})</span>
                <span>$${data.cost.toFixed(2)}</span>
            </div>`;
        });

        container.innerHTML = html;
        document.getElementById('total-cost').textContent = `$${totalCost.toFixed(2)}`;

        const perScoutTotal = totalCost / scouts;
        const perScoutPerDay = perScoutTotal / Math.max(1, days);

        const perScoutEl = document.getElementById('per-scout-cost');
        perScoutEl.textContent = perScoutTotal.toFixed(2);

        // Compare against user's target (which is a per-day target) and toggle a CSS class if exceeded
        try {
            const settings = this.settingsService.getSettings();
            const targetPerDay = parseFloat(settings.targetCostPerScoutPerDay) || 0;
            if (perScoutPerDay > targetPerDay) {
                perScoutEl.classList.add('over-target');
            } else {
                perScoutEl.classList.remove('over-target');
            }
        } catch (e) {
            perScoutEl.classList.remove('over-target');
        }
    }

    savePlan() {
        if (!this.currentPlan) return;

        const trip = this.tripService.saveTrip(this.currentPlan);
        alert('Meal plan saved successfully!');
        this.loadSavedPlans();
    }

    exportShoppingList() {
        if (!this.currentPlan) return;

        const text = this.getShoppingListText();

        // Create download
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.currentPlan.tripName.replace(/\s+/g, '_')}_shopping_list.txt`;
        a.click();
    }

    printShoppingList() {
        if (!this.currentPlan) return;
        const text = this.getShoppingListText();
        const printWindow = window.open('', '_blank');
        if (!printWindow) return;
        printWindow.document.write(`<pre style="font-family: Arial, sans-serif; white-space: pre-wrap;">${text}</pre>`);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    }

    getShoppingListText() {
        if (!this.currentPlan) return '';

        let text = `${this.currentPlan.tripName} - Shopping List\n`;
        text += `Number of Scouts: ${this.currentPlan.numScouts}\n`;
        text += `Days: ${this.currentPlan.days}\n\n`;
        text += `SHOPPING LIST:\n`;
        text += `=============\n\n`;

        Object.entries(this.currentPlan.shoppingList).forEach(([name, data]) => {
            text += `☐ ${name}: ${data.quantity.toFixed(1)} ${data.unit} ($${data.cost.toFixed(2)})\n`;
        });

        text += `\n=============\n`;
        text += `Total Estimated Cost: $${this.currentPlan.totalCost.toFixed(2)}\n`;
        text += `Cost per Scout: $${(this.currentPlan.totalCost / this.currentPlan.numScouts).toFixed(2)}\n`;
        return text;
    }

    openDonePlanningModal() {
        const modal = document.getElementById('done-planning-modal');
        if (!modal) return;
        if (!this.currentPlan) {
            alert('Generate a meal plan before finishing.');
            return;
        }
        modal.style.display = 'block';
    }

    recordDonePlan(action) {
        if (!this.currentPlan) return;
        const tripId = this.resolveTripIdForDonePlan();
        const donePlans = this.getDonePlans();
        donePlans.unshift({
            tripId,
            tripName: this.currentPlan.tripName,
            numScouts: this.currentPlan.numScouts,
            days: this.currentPlan.days,
            totalCost: this.currentPlan.totalCost,
            action,
            completedAt: new Date().toISOString()
        });
        localStorage.setItem('grubmaster_done_plans', JSON.stringify(donePlans));
        this.loadDonePlans();
    }

    resolveTripIdForDonePlan() {
        if (this.currentPlan && this.currentPlan.id) return this.currentPlan.id;
        const trips = this.tripService.getAllTrips();
        const match = trips.find(trip => trip.tripName === this.currentPlan.tripName && trip.days === this.currentPlan.days);
        return match ? match.id : null;
    }

    getDonePlans() {
        try {
            const raw = localStorage.getItem('grubmaster_done_plans');
            const parsed = raw ? JSON.parse(raw) : [];
            return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
            return [];
        }
    }

    loadDonePlans() {
        const container = document.getElementById('done-plans-list');
        const card = document.getElementById('done-plans');
        if (!container) return;
        const donePlans = this.getDonePlans();

        if (donePlans.length === 0) {
            if (card) {
                card.classList.add('hidden');
            }
            container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">✅</div><p>No completed plans yet</p></div>';
            return;
        }

        if (card) {
            card.classList.remove('hidden');
        }

        let html = '';
        donePlans.forEach(plan => {
            const date = new Date(plan.completedAt).toLocaleDateString();
            html += `<div class="done-plan-item">
                <div>
                    <strong>${plan.tripName}</strong>
                    <div class="done-plan-meta">${plan.numScouts} scouts • ${plan.days} days • $${plan.totalCost.toFixed(2)}</div>
                </div>
                <div class="done-plan-meta">${plan.action} • ${date}</div>
            </div>`;
        });

        container.innerHTML = html;
    }

    loadSavedPlans() {
        const trips = this.tripService.getAllTrips();
        const container = document.getElementById('saved-plans-list');
        const card = document.getElementById('saved-plans');

        if (trips.length === 0) {
            if (card) {
                card.classList.add('hidden');
            }
            container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📦</div><p>No saved plans yet</p></div>';
            return;
        }

        if (card) {
            card.classList.remove('hidden');
        }

        let html = '';
        trips.forEach(trip => {
            html += `<div class="saved-plan-item">
                <div class="saved-plan-info">
                    <h5>${trip.tripName}</h5>
                    <p>${trip.numScouts} scouts • ${trip.days} days • $${trip.totalCost.toFixed(2)}</p>
                </div>
                <div class="saved-plan-actions">
                    <button class="btn btn-small btn-secondary" data-action="view" data-trip-id="${trip.id}" type="button">View</button>
                    <button class="btn btn-small btn-danger" data-action="delete" data-trip-id="${trip.id}" type="button">Delete</button>
                </div>
            </div>`;
        });

        container.innerHTML = html;
    }

    viewPlan(id) {
        const trip = this.tripService.getTripById(id);
        if (!trip) return;

        this.currentPlan = trip;
        // Use saved startDate when available so the original dates persist
        const startDate = trip.startDate ? new Date(trip.startDate) : new Date();
        this.displayMealPlan(trip.plan, trip.tripName, trip.numScouts, startDate, trip.days);
        document.getElementById('meal-plan-container').classList.remove('hidden');
        window.scrollTo(0, 0);
    }

    deletePlan(id) {
        if (confirm('Are you sure you want to delete this plan?')) {
            this.tripService.deleteTrip(id);
            this.loadSavedPlans();
        }
    }

    // ==================== RECIPES PAGE ====================

    setupRecipesPage() {
        this.displayRecipes();

        const recipesContainer = document.getElementById('recipes-container');
        if (recipesContainer) {
            recipesContainer.addEventListener('click', (e) => {
                const card = e.target.closest('.recipe-card');
                if (!card) return;
                const recipeId = card.dataset.recipeId;
                if (recipeId) {
                    this.showRecipeDetail(recipeId);
                }
            });
        }

        document.getElementById('recipe-search').addEventListener('input', (e) => {
            this.filterRecipes();
        });

        document.getElementById('recipe-filter').addEventListener('change', () => {
            this.filterRecipes();
        });

        document.getElementById('add-recipe-btn').addEventListener('click', () => {
            this.openAddRecipeModal();
        });

        // Modal close buttons
        document.querySelectorAll('.close').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.closest('.modal').style.display = 'none';
            });
        });

        // Close modal on outside click
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        });
    }

    displayRecipes(recipesToShow = null) {
        const recipes = recipesToShow || this.recipeService.getAllRecipes();
        const container = document.getElementById('recipes-container');

        if (recipes.length === 0) {
            container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🍳</div><p>No recipes found</p></div>';
            return;
        }

        let html = '';
        recipes.forEach(recipe => {
            const totalCost = recipe.ingredients.reduce((sum, ing) => sum + ing.cost, 0);
            html += `<div class="recipe-card" data-recipe-id="${recipe.id}">
                <div class="recipe-card-header">
                    <h4>${recipe.name}</h4>
                    <span class="recipe-category">${recipe.category}</span>
                </div>
                <div class="recipe-meta">
                    <span>👥 ${recipe.servings} servings</span>
                    <span>⏱️ ${recipe.prepTime}</span>
                    <span class="recipe-cost">💰 $${totalCost.toFixed(2)}</span>
                </div>
            </div>`;
        });

        container.innerHTML = html;
    }

    filterRecipes() {
        const searchTerm = document.getElementById('recipe-search').value.toLowerCase();
        const category = document.getElementById('recipe-filter').value;
        const recipes = this.recipeService.getAllRecipes();

        const filtered = recipes.filter(recipe => {
            const matchesSearch = recipe.name.toLowerCase().includes(searchTerm) ||
                                recipe.ingredients.some(ing => ing.name.toLowerCase().includes(searchTerm));
            const matchesCategory = category === 'all' || recipe.category === category;
            return matchesSearch && matchesCategory;
        });

        this.displayRecipes(filtered);
    }

    showRecipeDetail(id) {
        const recipe = this.recipeService.getRecipeById(id);
        if (!recipe) return;

        const modal = document.getElementById('recipe-modal');
        const container = document.getElementById('recipe-detail');

        const totalCost = recipe.ingredients.reduce((sum, ing) => sum + ing.cost, 0);

        const description = this.getRecipeDescription(recipe);
        const steps = this.getRecipeSteps(recipe.instructions);

        let html = `
            <div class="recipe-detail-header">
                <h3>${recipe.name}</h3>
                <span class="recipe-category">${recipe.category}</span>
            </div>
            <p class="recipe-description">${description}</p>
            <div class="recipe-meta">
                <span>👥 Servings: ${recipe.servings}</span>
                <span>⏱️ Prep Time: ${recipe.prepTime}</span>
                <span class="recipe-cost">💰 Cost: $${totalCost.toFixed(2)} ($${(totalCost / recipe.servings).toFixed(2)} per serving)</span>
            </div>
            <h4>Ingredients:</h4>
            <ul class="ingredient-list">`;

        recipe.ingredients.forEach(ing => {
            html += `<li>${ing.quantity} ${ing.unit} ${ing.name} - $${ing.cost.toFixed(2)}</li>`;
        });

        html += `</ul>
            <h4>Steps:</h4>
            <ol class="instruction-steps">
                ${steps.length ? steps.map(step => `<li>${step}</li>`).join('') : '<li>Steps not provided.</li>'}
            </ol>`;

        container.innerHTML = html;
        modal.style.display = 'block';
    }

    openAddRecipeModal() {
        const modal = document.getElementById('add-recipe-modal');
        modal.style.display = 'block';

        // Reset form
        document.getElementById('custom-recipe-form').reset();
        document.getElementById('custom-ingredients-list').innerHTML = '';
        
        // Add one ingredient field
        this.addIngredientField();

        // Setup form submission
        document.getElementById('custom-recipe-form').onsubmit = (e) => {
            e.preventDefault();
            this.saveCustomRecipe();
        };

        document.getElementById('add-ingredient-btn').onclick = () => {
            this.addIngredientField();
        };
    }

    addIngredientField() {
        const container = document.getElementById('custom-ingredients-list');
        const div = document.createElement('div');
        div.className = 'ingredient-input-group';
        div.innerHTML = `
            <input type="text" placeholder="Ingredient name" required>
            <input type="number" step="0.01" placeholder="Quantity" required>
            <input type="text" placeholder="Unit" required>
            <input type="number" step="0.01" placeholder="Cost $" required>
            <button type="button" class="remove-ingredient-btn" onclick="this.parentElement.remove()">×</button>
        `;
        container.appendChild(div);
    }

    saveCustomRecipe() {
        const name = document.getElementById('custom-recipe-name').value;
        const category = document.getElementById('custom-recipe-category').value;
        const servings = parseInt(document.getElementById('custom-recipe-servings').value);
        const instructions = document.getElementById('custom-recipe-instructions').value;

        const ingredients = [];
        document.querySelectorAll('#custom-ingredients-list .ingredient-input-group').forEach(group => {
            const inputs = group.querySelectorAll('input');
            ingredients.push({
                name: inputs[0].value,
                quantity: parseFloat(inputs[1].value),
                unit: inputs[2].value,
                cost: parseFloat(inputs[3].value)
            });
        });

        const recipe = {
            name,
            category,
            servings,
            ingredients,
            instructions,
            prepTime: 'Custom'
        };

        this.recipeService.addRecipe(recipe);
        document.getElementById('add-recipe-modal').style.display = 'none';
        this.displayRecipes();
        alert('Recipe added successfully!');
    }

    // ==================== AUDITOR PAGE ====================

    setupAuditorPage() {
        document.getElementById('audit-trip-select').addEventListener('change', (e) => {
            const tripId = e.target.value;
            if (tripId === 'all_done') {
                this.loadAllDoneReceipts();
                return;
            }
            if (tripId) {
                this.loadTripForAudit(tripId);
            } else {
                document.getElementById('audit-container').classList.add('hidden');
            }
        });

        const receiptCard = document.getElementById('receipt-card');
        const toggleReceiptBtn = document.getElementById('toggle-receipt-card');
        if (receiptCard && toggleReceiptBtn) {
            toggleReceiptBtn.addEventListener('click', () => {
                receiptCard.classList.toggle('is-collapsed');
                toggleReceiptBtn.textContent = receiptCard.classList.contains('is-collapsed') ? 'Maximize' : 'Minimize';
            });
        }

        document.getElementById('receipt-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addReceipt();
        });
    }

    updateAuditTripSelect() {
        const trips = this.tripService.getAllTrips();
        const doneTripIds = this.getDonePlanTripIds(trips);
        const select = document.getElementById('audit-trip-select');
        
        select.innerHTML = '<option value="">-- Select a Completed trip --</option>';

        if (doneTripIds.size > 0) {
            const allOption = document.createElement('option');
            allOption.value = 'all_done';
            allOption.textContent = 'All Done Plans';
            select.appendChild(allOption);
        }

        trips.filter(trip => doneTripIds.has(trip.id)).forEach(trip => {
            const option = document.createElement('option');
            option.value = trip.id;
            option.textContent = `${trip.tripName} (${trip.numScouts} scouts, ${trip.days} days)`;
            select.appendChild(option);
        });
    }

    loadAllDoneReceipts() {
        const trips = this.tripService.getAllTrips();
        const doneTripIds = this.getDonePlanTripIds(trips);
        const doneTrips = trips.filter(trip => doneTripIds.has(trip.id));

        document.getElementById('audit-container').classList.remove('hidden');
        document.getElementById('cost-comparison').innerHTML = '<p>Showing receipts for all done plans.</p>';
        document.getElementById('insights-content').innerHTML = '<p>Select a specific trip to see cost insights.</p>';

        this.displayAllDoneReceipts(doneTrips);
    }

    displayAllDoneReceipts(trips) {
        const container = document.getElementById('receipts-list');
        const allReceipts = [];

        trips.forEach(trip => {
            const receipts = this.auditService.getReceiptsByTrip(trip.id);
            receipts.forEach(receipt => {
                allReceipts.push({
                    ...receipt,
                    tripName: trip.tripName
                });
            });
        });

        if (allReceipts.length === 0) {
            container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🧾</div><p>No receipts added yet</p></div>';
            return;
        }

        let html = '';
        allReceipts.forEach(receipt => {
            html += `<div class="receipt-item">
                <div class="receipt-header">
                    <div>
                        <div class="receipt-store">${receipt.store}</div>
                        <div class="receipt-meta">${receipt.tripName} • ${new Date(receipt.date).toLocaleDateString()}</div>
                        ${receipt.notes ? `<div class="receipt-meta">${receipt.notes}</div>` : ''}
                    </div>
                    <div class="receipt-amount">$${receipt.amount.toFixed(2)}</div>
                </div>
            </div>`;
        });

        container.innerHTML = html;
    }

    getDonePlanTripIds(trips) {
        const donePlans = this.getDonePlans();
        const ids = new Set();

        donePlans.forEach(plan => {
            if (plan.tripId) {
                ids.add(plan.tripId);
                return;
            }

            const match = trips.find(trip => trip.tripName === plan.tripName && trip.days === plan.days);
            if (match) ids.add(match.id);
        });

        return ids;
    }

    loadTripForAudit(tripId) {
        const trip = this.tripService.getTripById(tripId);
        if (!trip) return;

        this.currentAuditTrip = trip;
        const receiptDateInput = document.getElementById('receipt-date');
        if (receiptDateInput && trip.startDate) {
            const maxDate = new Date(trip.startDate).toISOString().split('T')[0];
            receiptDateInput.max = maxDate;
        }
        document.getElementById('audit-container').classList.remove('hidden');
        
        this.displayCostComparison(trip);
        this.displayReceipts(tripId);
        this.generateInsights(trip);
    }

    displayCostComparison(trip) {
        const receipts = this.auditService.getReceiptsByTrip(trip.id);
        const totalSpent = this.auditService.calculateTotalSpent(trip.id);
        const planned = trip.totalCost;
        const difference = totalSpent - planned;
        const percentDiff = planned > 0 ? (difference / planned * 100) : 0;

        const container = document.getElementById('cost-comparison');
        const overBudget = difference > 0;

        container.innerHTML = `
            <div class="cost-comparison-item">
                <span class="cost-label">Planned Cost:</span>
                <span class="cost-value">$${planned.toFixed(2)}</span>
            </div>
            <div class="cost-comparison-item">
                <span class="cost-label">Actual Spent:</span>
                <span class="cost-value ${overBudget ? 'cost-over-budget' : 'cost-under-budget'}">$${totalSpent.toFixed(2)}</span>
            </div>
            <div class="cost-comparison-item">
                <span class="cost-label">Difference:</span>
                <span class="cost-value ${overBudget ? 'cost-over-budget' : 'cost-under-budget'}">
                    ${overBudget ? '+' : ''}$${difference.toFixed(2)} (${percentDiff > 0 ? '+' : ''}${percentDiff.toFixed(1)}%)
                </span>
            </div>
            <div class="cost-comparison-item">
                <span class="cost-label">Per Scout (Actual):</span>
                <span class="cost-value">$${(totalSpent / trip.numScouts).toFixed(2)}</span>
            </div>
        `;
    }

    addReceipt() {
        if (!this.currentAuditTrip) return;

        const store = document.getElementById('receipt-store').value;
        const date = document.getElementById('receipt-date').value;
        const amount = parseFloat(document.getElementById('receipt-amount').value);
        const notes = document.getElementById('receipt-notes').value;

        if (this.currentAuditTrip.startDate && date) {
            const maxDate = new Date(this.currentAuditTrip.startDate).toISOString().split('T')[0];
            if (date > maxDate) {
                alert('Purchase date must be on or before the trip start date.');
                return;
            }
        }

        const receipt = { store, date, amount, notes };
        this.auditService.addReceipt(this.currentAuditTrip.id, receipt);

        // Clear form
        document.getElementById('receipt-form').reset();

        const receiptCard = document.getElementById('receipt-card');
        const toggleReceiptBtn = document.getElementById('toggle-receipt-card');
        if (receiptCard && toggleReceiptBtn) {
            receiptCard.classList.add('is-collapsed');
            toggleReceiptBtn.textContent = 'Maximize';
        }

        // Refresh display
        this.displayCostComparison(this.currentAuditTrip);
        this.displayReceipts(this.currentAuditTrip.id);
        this.generateInsights(this.currentAuditTrip);
    }

    displayReceipts(tripId) {
        const receipts = this.auditService.getReceiptsByTrip(tripId);
        const container = document.getElementById('receipts-list');

        if (receipts.length === 0) {
            container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🧾</div><p>No receipts added yet</p></div>';
            return;
        }

        let html = '';
        receipts.forEach(receipt => {
            html += `<div class="receipt-item">
                <div class="receipt-header">
                    <div>
                        <div class="receipt-store">${receipt.store}</div>
                        <div class="receipt-meta">${new Date(receipt.date).toLocaleDateString()}</div>
                        ${receipt.notes ? `<div class="receipt-meta">${receipt.notes}</div>` : ''}
                    </div>
                    <div class="receipt-amount">$${receipt.amount.toFixed(2)}</div>
                </div>
            </div>`;
        });

        container.innerHTML = html;
    }

    generateInsights(trip) {
        const receipts = this.auditService.getReceiptsByTrip(trip.id);
        const totalSpent = this.auditService.calculateTotalSpent(trip.id);
        const planned = trip.totalCost;
        const difference = totalSpent - planned;
        const perScoutActual = totalSpent / trip.numScouts;
        const settings = this.settingsService.getSettings();
        const targetPerDay = settings.targetCostPerScoutPerDay;
        const actualPerDay = perScoutActual / trip.days;

        const container = document.getElementById('insights-content');
        let insights = [];

        // Budget insights
        if (difference > 0) {
            const percent = (difference / planned * 100).toFixed(1);
            insights.push(`<div class="insight-item">
                <strong>⚠️ Over Budget</strong>
                You spent $${difference.toFixed(2)} (${percent}%) more than planned. Consider shopping at bulk stores or using coupons for next trip.
            </div>`);
        } else if (difference < 0) {
            insights.push(`<div class="insight-item">
                <strong>✅ Under Budget</strong>
                Great job! You saved $${Math.abs(difference).toFixed(2)}. This could be allocated to other troop activities.
            </div>`);
        }

        // Per-day cost insights
        if (actualPerDay > targetPerDay) {
            insights.push(`<div class="insight-item">
                <strong>📊 Above Daily Target</strong>
                Your actual cost of $${actualPerDay.toFixed(2)} per scout per day exceeds your target of $${targetPerDay.toFixed(2)}. Try simpler recipes or buying in bulk.
            </div>`);
        }

        // Store analysis
        if (receipts.length > 1) {
            const storeSpending = {};
            receipts.forEach(r => {
                storeSpending[r.store] = (storeSpending[r.store] || 0) + r.amount;
            });
            const topStore = Object.entries(storeSpending).sort((a, b) => b[1] - a[1])[0];
            insights.push(`<div class="insight-item">
                <strong>🏪 Top Spending</strong>
                You spent the most at ${topStore[0]} ($${topStore[1].toFixed(2)}). Consider comparing prices with other stores for better deals.
            </div>`);
        }

        // Recipe suggestions
        if (difference > 0) {
            insights.push(`<div class="insight-item">
                <strong>💡 Next Time</strong>
                Consider these budget-friendly options: Hot Dogs & Chips for lunch, Pancakes instead of Bacon & Eggs, or Spaghetti for dinner.
            </div>`);
        }

        container.innerHTML = insights.length > 0 ? insights.join('') : '<p>Add receipts to see insights and suggestions.</p>';
    }

    // ==================== SETTINGS PAGE ====================

    setupSettingsPage() {
        document.getElementById('troop-name').addEventListener('change', () => this.saveSettings());
        document.getElementById('default-scouts').addEventListener('change', () => this.saveSettings());
        document.getElementById('target-cost').addEventListener('change', () => this.saveSettings());

        document.getElementById('export-data').addEventListener('click', () => this.exportData());
        document.getElementById('import-data').addEventListener('click', () => {
            document.getElementById('import-file').click();
        });
        document.getElementById('import-file').addEventListener('change', (e) => this.importData(e));
        document.getElementById('clear-data').addEventListener('click', () => this.clearData());

        // Install app button
        let deferredPrompt;
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            document.getElementById('install-app').style.display = 'block';
        });

        document.getElementById('install-app').addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                deferredPrompt = null;
            }
        });
    }

    loadSettings() {
        const settings = this.settingsService.getSettings();
        document.getElementById('troop-name').value = settings.troopName;
        document.getElementById('default-scouts').value = settings.defaultScouts;
        document.getElementById('target-cost').value = settings.targetCostPerScoutPerDay;
    }

    saveSettings() {
        const settings = {
            troopName: document.getElementById('troop-name').value,
            defaultScouts: parseInt(document.getElementById('default-scouts').value),
            targetCostPerScoutPerDay: parseFloat(document.getElementById('target-cost').value)
        };
        this.settingsService.updateSettings(settings);
    }

    exportData() {
        const data = this.store.exportData();
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'grubmaster_data_backup.json';
        a.click();
    }

    importData(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const success = this.store.importData(event.target.result);
            if (success) {
                alert('Data imported successfully!');
                location.reload();
            } else {
                alert('Failed to import data. Please check the file format.');
            }
        };
        reader.readAsText(file);
    }

    clearData() {
        if (confirm('Are you sure you want to clear all data? This cannot be undone!')) {
            if (confirm('Really? This will delete all trips, custom recipes, and receipts!')) {
                this.store.clearAll();
                localStorage.removeItem(this.store.storageKey);
                localStorage.removeItem('grubmaster_done_plans');
                this.currentPlan = null;
                this.currentAuditTrip = null;
                this.loadSavedPlans();
                this.loadDonePlans();
                this.updateAuditTripSelect();
                const receiptsList = document.getElementById('receipts-list');
                if (receiptsList) {
                    receiptsList.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🧾</div><p>No receipts added yet</p></div>';
                }
                const donePlansList = document.getElementById('done-plans-list');
                if (donePlansList) {
                    donePlansList.innerHTML = '<div class="empty-state"><div class="empty-state-icon">✅</div><p>No completed plans yet</p></div>';
                    const donePlansCard = document.getElementById('done-plans');
                    if (donePlansCard) {
                        donePlansCard.classList.add('is-collapsed');
                    }
                }
                const savedPlansList = document.getElementById('saved-plans-list');
                if (savedPlansList) {
                    savedPlansList.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📦</div><p>No saved plans yet</p></div>';
                    const savedPlansCard = document.getElementById('saved-plans');
                    if (savedPlansCard) {
                        savedPlansCard.classList.add('is-collapsed');
                    }
                }
                const mealPlanContainer = document.getElementById('meal-plan-container');
                if (mealPlanContainer) {
                    mealPlanContainer.classList.add('hidden');
                }
                const mealPlanContent = document.getElementById('meal-plan-content');
                if (mealPlanContent) {
                    mealPlanContent.innerHTML = '';
                }
                const shoppingSummary = document.getElementById('shopping-summary');
                if (shoppingSummary) {
                    shoppingSummary.innerHTML = '';
                }
                const totalCost = document.getElementById('total-cost');
                if (totalCost) {
                    totalCost.textContent = '$0.00';
                }
                const perScoutCost = document.getElementById('per-scout-cost');
                if (perScoutCost) {
                    perScoutCost.textContent = '0.00';
                    perScoutCost.classList.remove('over-target');
                }
                alert('All data cleared!');
                location.reload();
            }
        }
    }
}

// ==================== INITIALIZE APP ====================

let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new GrubMasterApp();
    window.app = app;
});

// Register Service Worker for PWA functionality
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('Service Worker registered'))
        .catch(err => console.log('Service Worker registration failed:', err));
}
