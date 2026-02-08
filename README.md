# Troop 242 GrubMaster 🏕️

A Progressive Web App for planning camping meals, managing recipes, and tracking food expenses for Scout troops.

## Features

### 1. **Food Planner** 📋
- Input number of scouts and camping dates (2-9 nights)
- Automatically generates meal plans with recipes
- Calculates total cost and per-scout cost
- Generates shopping lists with quantities and prices
- Save and view multiple trip plans

### 2. **Recipe Library** 🍳
- Browse pre-loaded Scout-friendly recipes
- View ingredients, costs, and cooking instructions
- Add your own custom recipes
- Search and filter by meal type (breakfast, lunch, dinner, snacks)
- Each recipe shows prep time and cost per serving

### 3. **Receipt Auditor** 🧾
- Compare planned costs vs actual spending
- Add receipts from shopping trips
- Track spending by store
- Get insights and suggestions for cost savings
- Analyze if you're over or under budget
- Smart recommendations for next camping trip

### 4. **Settings** ⚙️
- Customize troop name and default scout count
- Set target cost per scout per day
- Export all data as backup
- Import data from backup
- Install app on device

## Installation

### Option 1: Run Locally (Easiest)
1. Download all files to a folder on your computer
2. Open `index.html` in a web browser
3. That's it! The app runs entirely in your browser

### Option 2: Install as PWA (Recommended)
1. Upload all files to a web server (or use GitHub Pages)
2. Visit the website on your phone/tablet
3. You'll see an "Install App" prompt (or use browser menu → "Add to Home Screen")
4. The app will work offline once installed!

### Option 3: Simple HTTP Server (For Testing)
If you have Python installed:

```bash
# Navigate to the folder with the files
cd /path/to/grubmaster

# Start a simple web server
python -m http.server 8000

# Or if you have Python 2:
python -m SimpleHTTPServer 8000

# Then open http://localhost:8000 in your browser
```

## How to Use

### Creating Your First Meal Plan

1. **Go to Planner Tab**
   - Enter trip name (e.g., "Summer Camp 2026")
   - Enter number of scouts
   - Select start and end dates
   - Choose meals per day (2 or 3)
   - Click "Generate Meal Plan"

2. **Review the Plan**
   - See daily meal breakdown
   - View shopping list with quantities
   - Check total cost and per-scout cost
   - Click "Save Plan" to keep it

3. **Export Shopping List**
   - Click "Export Shopping List"
   - Downloads a text file you can print or share
   - Take it to the store!

### Using the Receipt Auditor

1. **Select a Saved Trip**
   - Go to Receipts tab
   - Choose a trip from the dropdown

2. **Add Your Receipts**
   - Enter store name
   - Enter date and amount
   - Add any notes
   - Click "Add Receipt"

3. **View Insights**
   - See planned vs actual costs
   - Get suggestions for saving money
   - Learn which stores had best prices
   - Get recommendations for next trip

### Adding Custom Recipes

1. **Go to Recipes Tab**
2. **Click "Add Custom Recipe"**
3. **Fill in Details**
   - Recipe name
   - Category (breakfast/lunch/dinner/snack)
   - Number of servings
   - Add ingredients (name, quantity, unit, cost)
   - Add cooking instructions
4. **Click "Save Recipe"**

Your custom recipe will now appear in the library and can be used in meal plans!

## Understanding the Receipt Auditor Insights

The app provides smart suggestions based on your spending:

### Budget Analysis
- **Over Budget**: Suggests bulk buying, coupons, or simpler recipes
- **Under Budget**: Confirms you're doing great and saved money
- **Daily Cost**: Compares against your target per scout per day

### Store Analysis
- Identifies where you spent the most
- Suggests comparing prices at different stores
- Helps you plan better for next trip

### Recipe Recommendations
- If over budget, suggests cheaper meal options
- Points to specific budget-friendly recipes in the library
- Based on actual recipe costs in the system

## Data Management

### Backing Up Your Data
1. Go to Settings
2. Click "Export All Data"
3. Save the JSON file somewhere safe
4. You can import it later to restore everything

### Clearing Data
- Settings → "Clear All Data"
- This deletes EVERYTHING (trips, custom recipes, receipts)
- Cannot be undone - make a backup first!

## Tips for Best Results

### Meal Planning
- Add a 10-15% buffer to ingredient quantities for picky eaters
- Include easy backup meals (hot dogs, PB&J supplies)
- Check for dietary restrictions before generating plan
- Save successful plans to reuse for similar trips

### Shopping
- Buy non-perishables in bulk to save money
- Shop sales and use coupons
- Compare prices at warehouse stores (Costco, Sam's Club)
- Split shopping among parents to spread the work

### Receipt Tracking
- Save all receipts during shopping
- Enter them right away (don't wait until after the trip)
- Add notes about sales or special deals you found
- Review insights before planning next trip

## Technical Details

### Technologies Used
- **HTML5** - Structure
- **CSS3** - Styling (mobile-first design)
- **Vanilla JavaScript** - No frameworks needed!
- **LocalStorage** - Saves data on your device
- **Service Worker** - Enables offline functionality
- **PWA Manifest** - Allows installation on devices

### Browser Compatibility
- ✅ Chrome/Edge (desktop & mobile)
- ✅ Safari (iOS & macOS)
- ✅ Firefox (desktop & mobile)
- ✅ Samsung Internet

### Data Storage
- All data stored locally on your device
- No server required
- No internet needed after initial load
- Data persists until you clear it

### Privacy
- No data sent to any server
- No tracking or analytics
- No accounts or login required
- Complete privacy

## Customization

### Adding More Recipes
Edit `app.js` and add to the `getDefaultRecipes()` array:

```javascript
{
    id: 'r9',
    name: 'Your Recipe Name',
    category: 'breakfast', // or lunch, dinner, snack
    servings: 10,
    ingredients: [
        { name: 'Ingredient 1', quantity: 2, unit: 'lbs', cost: 5.00 },
        // ... more ingredients
    ],
    instructions: 'Step by step instructions...',
    prepTime: '25 mins'
}
```

### Changing Colors
Edit `styles.css` and modify the `:root` variables:

```css
:root {
    --primary-color: #2c5f2d;  /* Scout green */
    --secondary-color: #d4af37; /* Gold */
    /* ... change these to your troop colors! */
}
```

## Troubleshooting

### App won't save data
- Make sure cookies/storage are enabled in your browser
- Try a different browser
- Check if you're in private/incognito mode (won't save)

### Can't install as app
- Make sure you're using HTTPS (required for PWA)
- Try on a different device
- Some browsers don't support PWA installation

### Recipes not showing
- Clear your browser cache
- Reload the page
- Check browser console for errors (F12)

## Future Enhancements (Ideas)

- [ ] Print-friendly shopping lists
- [ ] Meal plan sharing via QR code
- [ ] Integration with grocery store APIs for real-time pricing
- [ ] Nutrition information
- [ ] Allergen tracking
- [ ] Dutch oven cooking times
- [ ] Weather-based meal suggestions
- [ ] Parent volunteer coordination

## Support

This app was built for Troop 242. If you need help:
1. Check this README first
2. Try clearing your browser cache
3. Make sure you have the latest version of the files
4. Test in a different browser

## License

Free to use and modify for your Scout troop!

## Credits

Built with ❤️ for Scout camping adventures

---

**Have fun camping! 🏕️🔥**
