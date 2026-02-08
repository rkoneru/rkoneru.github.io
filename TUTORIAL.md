# GrubMaster - Code Tutorial for Beginners 📚

Welcome! This guide will help you understand how the GrubMaster app works and how to customize it.

## 📁 File Structure

```
grubmaster/
├── index.html      - The main page (structure)
├── styles.css      - Makes it look pretty (styling)
├── app.js          - Makes it work (functionality)
├── manifest.json   - Allows installation as app
├── sw.js           - Makes it work offline
└── README.md       - Instructions for users
```

## 🧱 Understanding the Parts

### Part 1: HTML (index.html)

Think of HTML as the **skeleton** of your app. It creates all the buttons, forms, and sections.

#### Key Sections:

**Header** (Lines 13-17)
```html
<header class="app-header">
    <h1>🏕️ Troop 242 GrubMaster</h1>
    <p class="subtitle">Plan, Cook, Track</p>
</header>
```
- This is the title bar at the top
- Change "Troop 242" to your troop number!

**Navigation** (Lines 20-37)
```html
<nav class="bottom-nav">
    <button class="nav-btn active" data-page="planner">
```
- These are the 4 buttons at the bottom
- `data-page="planner"` tells JavaScript which page to show

**Pages** (Lines 42+)
- Each section (`<section id="planner-page">`) is a different page
- Only one page shows at a time
- JavaScript switches between them

#### How Forms Work:

```html
<form id="trip-form">
    <input type="text" id="trip-name" placeholder="e.g., Summer Camp 2026">
    <input type="number" id="num-scouts" min="1" value="15">
    <button type="submit">Generate Meal Plan</button>
</form>
```

- `id="trip-name"` - JavaScript uses this to get the value
- `type="number"` - Only allows numbers
- `type="submit"` - Triggers form submission (JavaScript catches this)

### Part 2: CSS (styles.css)

Think of CSS as the **clothes** for your app. It makes things look good.

#### Understanding CSS Selectors:

```css
.card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
}
```

- `.card` means "all elements with class='card'"
- `border-radius` makes rounded corners
- `padding` adds space inside

#### CSS Variables (Lines 7-19):

```css
:root {
    --primary-color: #2c5f2d;    /* Scout green */
    --secondary-color: #d4af37;   /* Gold */
}
```

**Want different colors? Change these values!**

Example colors:
- Red: `#ff0000`
- Blue: `#0000ff`
- Purple: `#800080`
- Your troop colors: Google "color picker" and get hex codes!

#### Responsive Design (Lines 571-584):

```css
@media (max-width: 600px) {
    .form-row {
        grid-template-columns: 1fr;
    }
}
```

This makes the app look good on phones by stacking things vertically when the screen is small.

### Part 3: JavaScript (app.js)

Think of JavaScript as the **brain** of your app. It makes everything work!

#### Understanding Classes:

```javascript
class DataStore {
    constructor() {
        this.data = this.load();
    }
    
    save() {
        localStorage.setItem('grubmaster_data', JSON.stringify(this.data));
    }
}
```

**What's happening?**
1. `class DataStore` - Creates a blueprint for storing data
2. `constructor()` - Runs when you create a new DataStore
3. `this.data` - Variables that belong to this DataStore
4. `save()` - A function (method) that saves data

#### How Data is Stored (LocalStorage):

```javascript
// Save data
localStorage.setItem('key', 'value');

// Get data back
const value = localStorage.getItem('key');

// Remove data
localStorage.removeItem('key');
```

**Important:** LocalStorage only stores text (strings). For complex data, we use JSON:

```javascript
// Save an object
const myData = { name: 'John', age: 25 };
localStorage.setItem('person', JSON.stringify(myData));

// Get it back
const retrieved = JSON.parse(localStorage.getItem('person'));
console.log(retrieved.name); // 'John'
```

#### Event Listeners (How buttons work):

```javascript
document.getElementById('save-plan').addEventListener('click', () => {
    this.savePlan();
});
```

**Breaking it down:**
1. `document.getElementById('save-plan')` - Find the button with id="save-plan"
2. `.addEventListener('click', ...)` - Watch for clicks
3. `() => { ... }` - When clicked, run this code (arrow function)
4. `this.savePlan()` - Call the savePlan function

#### Understanding the Meal Plan Generation:

```javascript
generateMealPlan() {
    // 1. Get values from form
    const numScouts = parseInt(document.getElementById('num-scouts').value);
    
    // 2. Calculate days
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    
    // 3. Generate plan
    const mealPlan = this.createMealPlan(days, numScouts, mealsPerDay);
    
    // 4. Display it
    this.displayMealPlan(mealPlan, ...);
}
```

**Math breakdown:**
- `(endDate - startDate)` gives milliseconds between dates
- `/ (1000 * 60 * 60 * 24)` converts to days
  - 1000 milliseconds = 1 second
  - 60 seconds = 1 minute
  - 60 minutes = 1 hour
  - 24 hours = 1 day
- `Math.ceil()` rounds up (2.3 days → 3 days)

## 🔧 Common Modifications

### Change Default Number of Scouts

**In app.js, line 168:**
```javascript
defaultScouts: 15,  // Change this number!
```

### Add a New Recipe

**In app.js, find getDefaultRecipes() (around line 33):**
```javascript
{
    id: 'r9',  // Unique ID (r9, r10, r11, etc.)
    name: 'Grilled Cheese Sandwiches',
    category: 'lunch',  // breakfast, lunch, dinner, or snack
    servings: 10,
    ingredients: [
        { name: 'Bread', quantity: 20, unit: 'slices', cost: 3.00 },
        { name: 'Cheese', quantity: 1, unit: 'lb', cost: 5.00 },
        { name: 'Butter', quantity: 0.25, unit: 'lb', cost: 1.50 }
    ],
    instructions: '1. Butter bread\n2. Add cheese\n3. Grill until golden\n4. Serve hot',
    prepTime: '15 mins'
}
```

**Pro tip:** Use `\n` for line breaks in instructions!

### Change App Name

**1. In index.html (line 14):**
```html
<h1>🏕️ Your Troop Name Here</h1>
```

**2. In manifest.json (lines 2-3):**
```json
"name": "Your Troop Name",
"short_name": "YourApp",
```

### Add More Meal Types

Currently: Breakfast, Lunch, Dinner, Snack

**To add "Dessert":**

**1. In index.html (around line 122):**
```html
<option value="dessert">Dessert</option>
```

**2. Add dessert recipes in app.js**

**3. Update meal plan generator to include desserts**

## 🐛 Debugging Tips

### How to See What's Happening

**Open Browser Console:**
- Chrome/Edge: Press F12 or Ctrl+Shift+J (Cmd+Option+J on Mac)
- Safari: Develop → Show JavaScript Console
- Firefox: F12 or Ctrl+Shift+K

**Add Console Logs:**
```javascript
generateMealPlan() {
    const numScouts = parseInt(document.getElementById('num-scouts').value);
    console.log('Number of scouts:', numScouts);  // Shows in console!
    
    const days = // ... calculation
    console.log('Number of days:', days);  // Debug values
}
```

### Common Errors

**1. "undefined is not a function"**
- Usually means you typed a function name wrong
- Check spelling and capitalization

**2. "Cannot read property 'value' of null"**
- The element doesn't exist
- Check if the ID in HTML matches what you're looking for
- Make sure JavaScript runs AFTER the HTML loads

**3. "Unexpected token"**
- Syntax error (missing comma, bracket, etc.)
- Count your opening and closing brackets: `{ } [ ]`

### Testing Checklist

When you make changes:
- [ ] Clear browser cache (Ctrl+Shift+Delete)
- [ ] Reload page (Ctrl+R or Cmd+R)
- [ ] Open console (F12) to check for errors
- [ ] Test all features that might be affected
- [ ] Try on phone/tablet too!

## 📱 Making It a Real App

### Testing Locally

**Method 1: Just open the file**
- Double-click `index.html`
- Works but PWA features won't work

**Method 2: Local server (RECOMMENDED)**

**If you have Python:**
```bash
# Navigate to your folder
cd /path/to/grubmaster

# Python 3:
python -m http.server 8000

# Python 2:
python -m SimpleHTTPServer 8000

# Visit: http://localhost:8000
```

**If you have Node.js:**
```bash
npm install -g http-server
http-server -p 8000
```

### Hosting for Free

**Option 1: GitHub Pages**
1. Create GitHub account
2. Create new repository
3. Upload all files
4. Go to Settings → Pages
5. Select main branch
6. Your app is live at `https://yourusername.github.io/repository-name`

**Option 2: Netlify**
1. Go to netlify.com
2. Drag your folder into the upload area
3. Done! You get a URL immediately

### Installing on Phone

Once hosted:
1. Visit the URL on your phone
2. **iOS:** Tap Share → Add to Home Screen
3. **Android:** Tap Menu → Install App
4. App appears on home screen like a real app!

## 🎨 Customization Ideas

### Easy Changes
- [ ] Change troop name and number
- [ ] Change colors (CSS variables)
- [ ] Add more default recipes
- [ ] Change default settings

### Medium Changes
- [ ] Add recipe images
- [ ] Add recipe ratings
- [ ] Add dietary restriction filters
- [ ] Add meal categories (vegan, etc.)

### Advanced Changes
- [ ] Add user accounts (requires backend)
- [ ] Sync across devices (requires backend)
- [ ] Export to PDF instead of text
- [ ] Connect to grocery store APIs for real prices

## 💡 Learning Resources

### Want to learn more?

**HTML & CSS:**
- MDN Web Docs: developer.mozilla.org
- FreeCodeCamp: freecodecamp.org

**JavaScript:**
- JavaScript.info (great tutorial)
- Eloquent JavaScript (free book)

**PWA Development:**
- web.dev/progressive-web-apps
- Google PWA Documentation

### Practice Exercises

**Beginner:**
1. Change the app colors to your troop's colors
2. Add your favorite camping recipe
3. Change the default number of scouts
4. Add emoji to recipe names

**Intermediate:**
1. Add a new meal category (like "Dessert")
2. Create a "Vegetarian" filter for recipes
3. Add serving size calculator to recipe view
4. Create a print-friendly CSS style

**Advanced:**
1. Add image upload for custom recipes
2. Create a weekly meal rotation system
3. Add nutrition information to recipes
4. Build a shopping list optimizer

## 🎯 Next Steps

1. **Get it working** - Just open index.html and play with it
2. **Customize it** - Change colors, add recipes, make it yours
3. **Host it** - Put it online so your whole troop can use it
4. **Share feedback** - What features would make it better?

## 🤝 Getting Help

**Stuck? Here's what to do:**

1. **Check the browser console** (F12) for error messages
2. **Read the error message carefully** - it usually tells you what's wrong
3. **Google the error** - someone else has probably had the same issue
4. **Check your code** - compare it to the original files
5. **Start simple** - comment out your changes and add them back one at a time

## 🚀 You've Got This!

Remember:
- Everyone makes mistakes - that's how you learn!
- Start with small changes
- Test after each change
- Don't be afraid to experiment
- You can always reload the page to undo changes
- Keep a backup copy of the working version

**Happy coding! 🏕️💻**
