// GrubMaster - Default Recipes Database

const DEFAULT_RECIPES = [
    {
        id: 'r1',
        name: 'Scrambled Eggs & Bacon',
        category: 'breakfast',
        servings: 10,
        ingredients: [
            { name: 'Eggs', quantity: 20, unit: 'eggs', cost: 6.00 },
            { name: 'Bacon', quantity: 2, unit: 'lbs', cost: 12.00 },
            { name: 'Butter', quantity: 0.25, unit: 'lb', cost: 1.50 },
            { name: 'Toast bread', quantity: 20, unit: 'slices', cost: 3.00 }
        ],
        instructions: '1. Cook bacon in large skillet until crispy\n2. Remove bacon and cook scrambled eggs in bacon fat\n3. Toast bread\n4. Serve hot with butter',
        prepTime: '20 mins'
    },
    {
        id: 'r2',
        name: 'Pancakes with Syrup',
        category: 'breakfast',
        servings: 10,
        ingredients: [
            { name: 'Pancake mix', quantity: 3, unit: 'cups', cost: 4.00 },
            { name: 'Eggs', quantity: 6, unit: 'eggs', cost: 2.00 },
            { name: 'Milk', quantity: 2, unit: 'cups', cost: 1.50 },
            { name: 'Syrup', quantity: 2, unit: 'cups', cost: 6.00 },
            { name: 'Butter', quantity: 0.5, unit: 'lb', cost: 3.00 }
        ],
        instructions: '1. Mix pancake mix, eggs, and milk\n2. Heat griddle with butter\n3. Pour 1/4 cup batter per pancake\n4. Flip when bubbles form\n5. Serve with butter and syrup',
        prepTime: '30 mins'
    },
    {
        id: 'r3',
        name: 'Walking Tacos',
        category: 'lunch',
        servings: 10,
        ingredients: [
            { name: 'Ground beef', quantity: 3, unit: 'lbs', cost: 15.00 },
            { name: 'Taco seasoning', quantity: 3, unit: 'packets', cost: 3.00 },
            { name: 'Doritos bags', quantity: 10, unit: 'bags', cost: 12.00 },
            { name: 'Shredded cheese', quantity: 2, unit: 'lbs', cost: 8.00 },
            { name: 'Lettuce', quantity: 1, unit: 'head', cost: 2.00 },
            { name: 'Tomatoes', quantity: 4, unit: 'tomatoes', cost: 3.00 },
            { name: 'Sour cream', quantity: 1, unit: 'container', cost: 3.00 }
        ],
        instructions: '1. Brown ground beef and drain fat\n2. Add taco seasoning with water per packet\n3. Chop lettuce and tomatoes\n4. Open Doritos bags\n5. Let scouts add beef and toppings to their bag',
        prepTime: '25 mins'
    },
    {
        id: 'r4',
        name: 'Hot Dogs & Chips',
        category: 'lunch',
        servings: 10,
        ingredients: [
            { name: 'Hot dogs', quantity: 20, unit: 'hot dogs', cost: 8.00 },
            { name: 'Hot dog buns', quantity: 20, unit: 'buns', cost: 6.00 },
            { name: 'Chips', quantity: 2, unit: 'bags', cost: 8.00 },
            { name: 'Ketchup', quantity: 1, unit: 'bottle', cost: 3.00 },
            { name: 'Mustard', quantity: 1, unit: 'bottle', cost: 3.00 }
        ],
        instructions: '1. Boil water in large pot\n2. Add hot dogs and cook 5-7 minutes\n3. Warm buns if desired\n4. Serve with condiments and chips',
        prepTime: '15 mins'
    },
    {
        id: 'r5',
        name: 'Spaghetti with Meat Sauce',
        category: 'dinner',
        servings: 10,
        ingredients: [
            { name: 'Spaghetti pasta', quantity: 2, unit: 'lbs', cost: 4.00 },
            { name: 'Ground beef', quantity: 2, unit: 'lbs', cost: 10.00 },
            { name: 'Pasta sauce', quantity: 3, unit: 'jars', cost: 9.00 },
            { name: 'Garlic bread', quantity: 2, unit: 'loaves', cost: 6.00 },
            { name: 'Parmesan cheese', quantity: 1, unit: 'container', cost: 4.00 }
        ],
        instructions: '1. Boil large pot of salted water\n2. Brown ground beef and drain\n3. Add pasta sauce to beef and simmer\n4. Cook spaghetti until al dente\n5. Warm garlic bread\n6. Serve pasta with sauce and cheese',
        prepTime: '35 mins'
    },
    {
        id: 'r6',
        name: 'Campfire Chili',
        category: 'dinner',
        servings: 10,
        ingredients: [
            { name: 'Ground beef', quantity: 3, unit: 'lbs', cost: 15.00 },
            { name: 'Kidney beans', quantity: 4, unit: 'cans', cost: 4.00 },
            { name: 'Diced tomatoes', quantity: 4, unit: 'cans', cost: 4.00 },
            { name: 'Chili seasoning', quantity: 3, unit: 'packets', cost: 3.00 },
            { name: 'Onion', quantity: 2, unit: 'onions', cost: 2.00 },
            { name: 'Shredded cheese', quantity: 1, unit: 'lb', cost: 4.00 },
            { name: 'Tortilla chips', quantity: 2, unit: 'bags', cost: 6.00 }
        ],
        instructions: '1. Brown ground beef with diced onions\n2. Add beans, tomatoes, and seasoning\n3. Simmer for 20-30 minutes\n4. Serve in bowls with cheese and chips',
        prepTime: '45 mins'
    },
    {
        id: 'r7',
        name: 'Foil Packet Chicken & Vegetables',
        category: 'dinner',
        servings: 10,
        ingredients: [
            { name: 'Chicken breasts', quantity: 10, unit: 'breasts', cost: 20.00 },
            { name: 'Potatoes', quantity: 5, unit: 'lbs', cost: 5.00 },
            { name: 'Carrots', quantity: 2, unit: 'lbs', cost: 3.00 },
            { name: 'Onions', quantity: 3, unit: 'onions', cost: 3.00 },
            { name: 'Italian dressing', quantity: 1, unit: 'bottle', cost: 3.00 },
            { name: 'Aluminum foil', quantity: 1, unit: 'roll', cost: 5.00 }
        ],
        instructions: '1. Cut vegetables into chunks\n2. Place chicken and veggies on foil\n3. Drizzle with Italian dressing\n4. Seal foil packets\n5. Cook on campfire coals for 25-30 mins\n6. Check chicken is fully cooked',
        prepTime: '40 mins'
    },
    {
        id: 'r8',
        name: "S'mores",
        category: 'snack',
        servings: 10,
        ingredients: [
            { name: 'Graham crackers', quantity: 2, unit: 'boxes', cost: 6.00 },
            { name: 'Marshmallows', quantity: 2, unit: 'bags', cost: 6.00 },
            { name: 'Chocolate bars', quantity: 10, unit: 'bars', cost: 15.00 }
        ],
        instructions: '1. Roast marshmallows over campfire\n2. Place between graham crackers with chocolate\n3. Enjoy!',
        prepTime: '10 mins'
    },
    {
        id: 'r9',
        name: 'Oatmeal & Fruit',
        category: 'breakfast',
        servings: 10,
        ingredients: [
            { name: 'Rolled oats', quantity: 5, unit: 'cups', cost: 4.00 },
            { name: 'Milk', quantity: 4, unit: 'cups', cost: 3.00 },
            { name: 'Mixed dried fruit', quantity: 2, unit: 'cups', cost: 5.00 },
            { name: 'Brown sugar', quantity: 0.5, unit: 'cups', cost: 1.00 }
        ],
        instructions: '1. Cook oats with milk until soft\n2. Stir in fruit and sugar\n3. Serve warm',
        prepTime: '10 mins'
    },
    {
        id: 'r10',
        name: 'Breakfast Burritos',
        category: 'breakfast',
        servings: 10,
        ingredients: [
            { name: 'Tortillas', quantity: 10, unit: 'large', cost: 4.00 },
            { name: 'Eggs', quantity: 15, unit: 'eggs', cost: 5.00 },
            { name: 'Cheese', quantity: 1, unit: 'lb', cost: 4.00 },
            { name: 'Salsa', quantity: 2, unit: 'cups', cost: 3.00 }
        ],
        instructions: '1. Scramble eggs\n2. Fill tortillas with eggs, cheese, and salsa\n3. Roll and serve',
        prepTime: '20 mins'
    },
    {
        id: 'r11',
        name: 'French Toast',
        category: 'breakfast',
        servings: 10,
        ingredients: [
            { name: 'Bread slices', quantity: 20, unit: 'slices', cost: 3.00 },
            { name: 'Eggs', quantity: 6, unit: 'eggs', cost: 2.00 },
            { name: 'Milk', quantity: 1, unit: 'cup', cost: 0.75 },
            { name: 'Syrup', quantity: 2, unit: 'cups', cost: 6.00 }
        ],
        instructions: '1. Whisk eggs and milk\n2. Dip bread and fry until golden\n3. Serve with syrup',
        prepTime: '25 mins'
    },
    {
        id: 'r12',
        name: 'Bagels & Cream Cheese',
        category: 'breakfast',
        servings: 10,
        ingredients: [
            { name: 'Bagels', quantity: 10, unit: 'bagels', cost: 8.00 },
            { name: 'Cream cheese', quantity: 2, unit: 'tubs', cost: 6.00 },
            { name: 'Butter', quantity: 0.5, unit: 'lb', cost: 3.00 }
        ],
        instructions: '1. Toast bagels if desired\n2. Spread cream cheese or butter\n3. Serve',
        prepTime: '10 mins'
    },
    {
        id: 'r13',
        name: 'Granola & Yogurt',
        category: 'breakfast',
        servings: 10,
        ingredients: [
            { name: 'Granola', quantity: 4, unit: 'cups', cost: 6.00 },
            { name: 'Yogurt', quantity: 10, unit: 'cups', cost: 8.00 },
            { name: 'Honey', quantity: 0.5, unit: 'cups', cost: 2.00 }
        ],
        instructions: '1. Spoon yogurt into bowls\n2. Top with granola and honey\n3. Serve chilled',
        prepTime: '5 mins'
    },
    {
        id: 'r14',
        name: 'BLT Sandwiches',
        category: 'lunch',
        servings: 10,
        ingredients: [
            { name: 'Bread slices', quantity: 20, unit: 'slices', cost: 3.00 },
            { name: 'Bacon', quantity: 2, unit: 'lbs', cost: 12.00 },
            { name: 'Lettuce', quantity: 2, unit: 'heads', cost: 4.00 },
            { name: 'Tomatoes', quantity: 4, unit: 'tomatoes', cost: 3.00 },
            { name: 'Mayonnaise', quantity: 1, unit: 'jar', cost: 3.00 }
        ],
        instructions: '1. Cook bacon until crispy\n2. Assemble sandwiches with lettuce and tomato\n3. Serve',
        prepTime: '20 mins'
    },
    {
        id: 'r15',
        name: 'Grilled Cheese',
        category: 'lunch',
        servings: 10,
        ingredients: [
            { name: 'Bread slices', quantity: 20, unit: 'slices', cost: 3.00 },
            { name: 'Cheddar cheese', quantity: 2, unit: 'lbs', cost: 8.00 },
            { name: 'Butter', quantity: 0.5, unit: 'lb', cost: 3.00 }
        ],
        instructions: '1. Butter bread and add cheese\n2. Grill until golden and cheese melts\n3. Serve hot',
        prepTime: '15 mins'
    },
    {
        id: 'r16',
        name: 'Turkey Wraps',
        category: 'lunch',
        servings: 10,
        ingredients: [
            { name: 'Tortillas', quantity: 10, unit: 'large', cost: 4.00 },
            { name: 'Sliced turkey', quantity: 2, unit: 'lbs', cost: 12.00 },
            { name: 'Lettuce', quantity: 1, unit: 'head', cost: 2.00 },
            { name: 'Cheese', quantity: 1, unit: 'lb', cost: 4.00 }
        ],
        instructions: '1. Lay out tortillas and add turkey, lettuce, and cheese\n2. Roll tightly and slice in half\n3. Serve',
        prepTime: '10 mins'
    },
    {
        id: 'r17',
        name: 'Chicken Caesar Salad',
        category: 'lunch',
        servings: 10,
        ingredients: [
            { name: 'Romaine lettuce', quantity: 3, unit: 'heads', cost: 6.00 },
            { name: 'Cooked chicken', quantity: 3, unit: 'lbs', cost: 15.00 },
            { name: 'Caesar dressing', quantity: 1, unit: 'bottle', cost: 4.00 },
            { name: 'Croutons', quantity: 1, unit: 'bag', cost: 3.00 },
            { name: 'Parmesan', quantity: 1, unit: 'container', cost: 4.00 }
        ],
        instructions: '1. Chop lettuce and toss with dressing\n2. Add chicken, croutons, and parmesan\n3. Serve chilled',
        prepTime: '15 mins'
    },
    {
        id: 'r18',
        name: 'Quesadillas',
        category: 'lunch',
        servings: 10,
        ingredients: [
            { name: 'Tortillas', quantity: 10, unit: 'large', cost: 4.00 },
            { name: 'Cheese', quantity: 2, unit: 'lbs', cost: 8.00 },
            { name: 'Chicken (optional)', quantity: 2, unit: 'lbs', cost: 10.00 }
        ],
        instructions: '1. Fill tortillas with cheese and chicken\n2. Cook on griddle until golden\n3. Slice and serve with salsa',
        prepTime: '20 mins'
    },
    {
        id: 'r19',
        name: 'Sloppy Joes',
        category: 'lunch',
        servings: 10,
        ingredients: [
            { name: 'Ground beef', quantity: 3, unit: 'lbs', cost: 15.00 },
            { name: 'Sloppy Joe sauce', quantity: 2, unit: 'jars', cost: 6.00 },
            { name: 'Buns', quantity: 10, unit: 'buns', cost: 4.00 }
        ],
        instructions: '1. Brown beef and add sauce\n2. Simmer 10 minutes\n3. Serve on buns',
        prepTime: '25 mins'
    },
    {
        id: 'r20',
        name: 'Mac & Cheese',
        category: 'dinner',
        servings: 10,
        ingredients: [
            { name: 'Macaroni', quantity: 3, unit: 'lbs', cost: 6.00 },
            { name: 'Cheese sauce', quantity: 3, unit: 'cups', cost: 8.00 },
            { name: 'Breadcrumbs', quantity: 1, unit: 'cup', cost: 2.00 }
        ],
        instructions: '1. Cook macaroni\n2. Mix with cheese sauce\n3. Top with breadcrumbs and bake if desired',
        prepTime: '30 mins'
    },
    {
        id: 'r21',
        name: 'BBQ Chicken',
        category: 'dinner',
        servings: 10,
        ingredients: [
            { name: 'Chicken pieces', quantity: 10, unit: 'pieces', cost: 18.00 },
            { name: 'BBQ sauce', quantity: 2, unit: 'bottles', cost: 6.00 },
            { name: 'Corn on the cob', quantity: 10, unit: 'ears', cost: 8.00 }
        ],
        instructions: '1. Grill chicken and baste with BBQ sauce\n2. Cook corn and serve',
        prepTime: '40 mins'
    },
    {
        id: 'r22',
        name: 'Beef Stew',
        category: 'dinner',
        servings: 10,
        ingredients: [
            { name: 'Stew beef', quantity: 4, unit: 'lbs', cost: 20.00 },
            { name: 'Potatoes', quantity: 5, unit: 'lbs', cost: 5.00 },
            { name: 'Carrots', quantity: 3, unit: 'lbs', cost: 4.00 },
            { name: 'Beef broth', quantity: 6, unit: 'cups', cost: 4.00 }
        ],
        instructions: '1. Brown beef\n2. Add vegetables and broth\n3. Simmer until tender',
        prepTime: '2 hrs'
    },
    {
        id: 'r23',
        name: 'Veggie Stir Fry',
        category: 'dinner',
        servings: 10,
        ingredients: [
            { name: 'Mixed vegetables', quantity: 6, unit: 'lbs', cost: 12.00 },
            { name: 'Soy sauce', quantity: 1, unit: 'bottle', cost: 3.00 },
            { name: 'Rice', quantity: 5, unit: 'lbs', cost: 6.00 }
        ],
        instructions: '1. Stir fry vegetables with soy sauce\n2. Serve over rice',
        prepTime: '30 mins'
    },
    {
        id: 'r24',
        name: 'Rice & Beans',
        category: 'dinner',
        servings: 10,
        ingredients: [
            { name: 'Rice', quantity: 5, unit: 'lbs', cost: 6.00 },
            { name: 'Black beans', quantity: 6, unit: 'cans', cost: 6.00 },
            { name: 'Onion', quantity: 2, unit: 'onions', cost: 2.00 }
        ],
        instructions: '1. Cook rice\n2. Heat beans with seasoning\n3. Serve together',
        prepTime: '25 mins'
    },
    {
        id: 'r25',
        name: 'Potato Hash',
        category: 'breakfast',
        servings: 10,
        ingredients: [
            { name: 'Potatoes', quantity: 8, unit: 'lbs', cost: 8.00 },
            { name: 'Onions', quantity: 3, unit: 'onions', cost: 3.00 },
            { name: 'Bell peppers', quantity: 3, unit: 'peppers', cost: 4.00 },
            { name: 'Eggs', quantity: 10, unit: 'eggs', cost: 3.00 }
        ],
        instructions: '1. Dice and fry potatoes with onions and peppers\n2. Top with fried or poached eggs',
        prepTime: '35 mins'
    },
    {
        id: 'r26',
        name: 'Chicken Fajitas',
        category: 'dinner',
        servings: 10,
        ingredients: [
            { name: 'Chicken strips', quantity: 4, unit: 'lbs', cost: 18.00 },
            { name: 'Bell peppers', quantity: 4, unit: 'peppers', cost: 5.00 },
            { name: 'Onions', quantity: 3, unit: 'onions', cost: 3.00 },
            { name: 'Tortillas', quantity: 20, unit: 'large', cost: 8.00 }
        ],
        instructions: '1. Sauté chicken with peppers and onions\n2. Serve with tortillas and toppings',
        prepTime: '30 mins'
    },
    {
        id: 'r27',
        name: 'Fish Tacos',
        category: 'lunch',
        servings: 10,
        ingredients: [
            { name: 'White fish', quantity: 3, unit: 'lbs', cost: 18.00 },
            { name: 'Tortillas', quantity: 20, unit: 'small', cost: 6.00 },
            { name: 'Cabbage', quantity: 1, unit: 'head', cost: 2.00 },
            { name: 'Lime', quantity: 4, unit: 'limes', cost: 2.00 }
        ],
        instructions: '1. Cook fish with light seasoning\n2. Serve in tortillas with cabbage and lime',
        prepTime: '25 mins'
    },
    {
        id: 'r28',
        name: 'Pulled Pork Sandwiches',
        category: 'dinner',
        servings: 10,
        ingredients: [
            { name: 'Pulled pork', quantity: 6, unit: 'lbs', cost: 30.00 },
            { name: 'Buns', quantity: 10, unit: 'buns', cost: 4.00 },
            { name: 'Coleslaw', quantity: 2, unit: 'lbs', cost: 6.00 }
        ],
        instructions: '1. Heat pulled pork with BBQ sauce\n2. Serve on buns with coleslaw',
        prepTime: '3 hrs (if slow-cooked)'
    },
    {
        id: 'r29',
        name: 'Meatball Subs',
        category: 'lunch',
        servings: 10,
        ingredients: [
            { name: 'Meatballs', quantity: 30, unit: 'pieces', cost: 15.00 },
            { name: 'Sub rolls', quantity: 10, unit: 'rolls', cost: 8.00 },
            { name: 'Marinara sauce', quantity: 3, unit: 'cups', cost: 6.00 },
            { name: 'Mozzarella', quantity: 1, unit: 'lb', cost: 4.00 }
        ],
        instructions: '1. Heat meatballs in sauce\n2. Place in rolls and top with cheese\n3. Serve warm',
        prepTime: '30 mins'
    },
    {
        id: 'r30',
        name: 'Chili Dogs',
        category: 'lunch',
        servings: 10,
        ingredients: [
            { name: 'Hot dogs', quantity: 20, unit: 'hot dogs', cost: 8.00 },
            { name: 'Buns', quantity: 20, unit: 'buns', cost: 6.00 },
            { name: 'Chili', quantity: 4, unit: 'cups', cost: 8.00 }
        ],
        instructions: '1. Cook hot dogs\n2. Top with chili and serve',
        prepTime: '20 mins'
    },
    {
        id: 'r31',
        name: 'Baked Ziti',
        category: 'dinner',
        servings: 10,
        ingredients: [
            { name: 'Ziti pasta', quantity: 3, unit: 'lbs', cost: 6.00 },
            { name: 'Ricotta', quantity: 2, unit: 'lbs', cost: 8.00 },
            { name: 'Pasta sauce', quantity: 4, unit: 'jars', cost: 12.00 },
            { name: 'Mozzarella', quantity: 2, unit: 'lbs', cost: 8.00 }
        ],
        instructions: '1. Cook pasta and mix with ricotta and sauce\n2. Top with mozzarella and bake',
        prepTime: '45 mins'
    },
    {
        id: 'r32',
        name: 'Stuffed Peppers',
        category: 'dinner',
        servings: 10,
        ingredients: [
            { name: 'Bell peppers', quantity: 10, unit: 'peppers', cost: 10.00 },
            { name: 'Ground beef', quantity: 3, unit: 'lbs', cost: 15.00 },
            { name: 'Rice', quantity: 2, unit: 'cups', cost: 2.00 },
            { name: 'Tomato sauce', quantity: 2, unit: 'cups', cost: 3.00 }
        ],
        instructions: '1. Mix beef, rice, and sauce\n2. Stuff into peppers and bake until tender',
        prepTime: '1 hr'
    },
    {
        id: 'r33',
        name: 'Lentil Soup',
        category: 'dinner',
        servings: 10,
        ingredients: [
            { name: 'Lentils', quantity: 4, unit: 'cups', cost: 6.00 },
            { name: 'Carrots', quantity: 2, unit: 'lbs', cost: 3.00 },
            { name: 'Celery', quantity: 1, unit: 'bunch', cost: 2.00 },
            { name: 'Vegetable broth', quantity: 8, unit: 'cups', cost: 6.00 }
        ],
        instructions: '1. Sauté veggies, add lentils and broth\n2. Simmer until lentils are tender',
        prepTime: '40 mins'
    },
    {
        id: 'r34',
        name: 'Pasta Salad',
        category: 'lunch',
        servings: 10,
        ingredients: [
            { name: 'Pasta', quantity: 3, unit: 'lbs', cost: 6.00 },
            { name: 'Cherry tomatoes', quantity: 2, unit: 'lbs', cost: 6.00 },
            { name: 'Italian dressing', quantity: 1, unit: 'bottle', cost: 3.00 },
            { name: 'Olives', quantity: 1, unit: 'jar', cost: 3.00 }
        ],
        instructions: '1. Cook pasta and cool\n2. Toss with veggies and dressing\n3. Chill before serving',
        prepTime: '25 mins'
    },
    {
        id: 'r35',
        name: 'Tuna Salad Sandwiches',
        category: 'lunch',
        servings: 10,
        ingredients: [
            { name: 'Canned tuna', quantity: 6, unit: 'cans', cost: 9.00 },
            { name: 'Mayonnaise', quantity: 1, unit: 'jar', cost: 3.00 },
            { name: 'Bread', quantity: 20, unit: 'slices', cost: 3.00 }
        ],
        instructions: '1. Mix tuna with mayo\n2. Spread on bread and serve',
        prepTime: '10 mins'
    },
    {
        id: 'r36',
        name: 'Greek Salad',
        category: 'lunch',
        servings: 10,
        ingredients: [
            { name: 'Cucumber', quantity: 4, unit: 'pcs', cost: 4.00 },
            { name: 'Tomatoes', quantity: 6, unit: 'pcs', cost: 4.00 },
            { name: 'Feta cheese', quantity: 1, unit: 'lb', cost: 6.00 },
            { name: 'Olives', quantity: 1, unit: 'jar', cost: 3.00 }
        ],
        instructions: '1. Chop veggies and toss with feta and olives\n2. Dress lightly and serve',
        prepTime: '15 mins'
    },
    {
        id: 'r37',
        name: 'Couscous & Veggies',
        category: 'dinner',
        servings: 10,
        ingredients: [
            { name: 'Couscous', quantity: 4, unit: 'cups', cost: 6.00 },
            { name: 'Mixed vegetables', quantity: 6, unit: 'lbs', cost: 12.00 },
            { name: 'Olive oil', quantity: 0.5, unit: 'cup', cost: 2.00 }
        ],
        instructions: '1. Cook couscous and sauté vegetables\n2. Mix together and serve',
        prepTime: '25 mins'
    },
    {
        id: 'r38',
        name: 'PB&J Sandwiches',
        category: 'snack',
        servings: 10,
        ingredients: [
            { name: 'Bread slices', quantity: 20, unit: 'slices', cost: 3.00 },
            { name: 'Peanut butter', quantity: 1, unit: 'jar', cost: 3.00 },
            { name: 'Jam', quantity: 1, unit: 'jar', cost: 3.00 }
        ],
        instructions: '1. Spread peanut butter and jam on bread\n2. Cut and serve',
        prepTime: '5 mins'
    },
    {
        id: 'r39',
        name: 'Dutch Oven Casserole',
        category: 'dinner',
        servings: 10,
        ingredients: [
            { name: 'Ground beef', quantity: 3, unit: 'lbs', cost: 15.00 },
            { name: 'Egg noodles', quantity: 2, unit: 'lbs', cost: 4.00 },
            { name: 'Cream of mushroom soup', quantity: 4, unit: 'cans', cost: 6.00 },
            { name: 'Cheese', quantity: 1.5, unit: 'lbs', cost: 6.00 }
        ],
        instructions: '1. Brown ground beef in Dutch oven\n2. Cook noodles and mix with soup\n3. Combine with beef and cheese\n4. Bake in Dutch oven over coals for 30 minutes',
        prepTime: '45 mins'
    },
    {
        id: 'r40',
        name: 'Camp Breakfast Pizza',
        category: 'breakfast',
        servings: 10,
        ingredients: [
            { name: 'English muffins', quantity: 10, unit: 'muffins', cost: 6.00 },
            { name: 'Cream cheese', quantity: 1, unit: 'tub', cost: 3.00 },
            { name: 'Jam or berries', quantity: 2, unit: 'cups', cost: 4.00 }
        ],
        instructions: '1. Toast English muffins\n2. Spread cream cheese on each\n3. Top with jam or fresh berries\n4. Serve warm',
        prepTime: '10 mins'
    },
    {
        id: 'r41',
        name: 'Bananas with S\'mores Filling',
        category: 'snack',
        servings: 10,
        ingredients: [
            { name: 'Bananas', quantity: 10, unit: 'bananas', cost: 3.00 },
            { name: 'Chocolate chips', quantity: 2, unit: 'cups', cost: 6.00 },
            { name: 'Marshmallows', quantity: 1, unit: 'bag', cost: 3.00 }
        ],
        instructions: '1. Slice banana lengthwise without peeling completely\n2. Fill with chocolate and marshmallows\n3. Wrap in foil\n4. Heat over campfire 5-7 minutes\n5. Scoop out with spoon and enjoy',
        prepTime: '15 mins'
    },
    {
        id: 'r42',
        name: 'Foil Packet Burritos',
        category: 'lunch',
        servings: 10,
        ingredients: [
            { name: 'Flour tortillas', quantity: 10, unit: 'large', cost: 4.00 },
            { name: 'Ground beef', quantity: 2, unit: 'lbs', cost: 10.00 },
            { name: 'Refried beans', quantity: 3, unit: 'cans', cost: 3.00 },
            { name: 'Shredded cheese', quantity: 2, unit: 'lbs', cost: 8.00 }
        ],
        instructions: '1. Brown ground beef with seasonings\n2. Assemble burritos with beef, beans, and cheese\n3. Wrap individually in foil\n4. Heat on campfire coals for 10-15 minutes',
        prepTime: '30 mins'
    },
    {
        id: 'r43',
        name: 'Campfire Tin Pie',
        category: 'dessert',
        servings: 10,
        ingredients: [
            { name: 'Pie filling (canned)', quantity: 2, unit: 'cans', cost: 6.00 },
            { name: 'Crescent roll dough', quantity: 2, unit: 'tubes', cost: 4.00 },
            { name: 'Butter', quantity: 0.25, unit: 'lb', cost: 1.50 }
        ],
        instructions: '1. Line aluminum tin with crescent dough\n2. Add pie filling\n3. Top with crescent dough\n4. Cover with foil and place on coals\n5. Cook 15-20 minutes',
        prepTime: '30 mins'
    },
    {
        id: 'r44',
        name: 'Hobo Pack Meals',
        category: 'dinner',
        servings: 10,
        ingredients: [
            { name: 'Ground beef', quantity: 3, unit: 'lbs', cost: 15.00 },
            { name: 'Potatoes', quantity: 5, unit: 'lbs', cost: 5.00 },
            { name: 'Cabbage', quantity: 2, unit: 'heads', cost: 4.00 },
            { name: 'Onion', quantity: 3, unit: 'onions', cost: 3.00 }
        ],
        instructions: '1. Dice all vegetables and brown beef\n2. Place ingredients on aluminum foil\n3. Seal foil packets tightly\n4. Cook on campfire coals for 20-25 minutes',
        prepTime: '35 mins'
    },
    {
        id: 'r45',
        name: 'Breakfast Sandwiches',
        category: 'breakfast',
        servings: 10,
        ingredients: [
            { name: 'English muffins', quantity: 10, unit: 'muffins', cost: 6.00 },
            { name: 'Eggs', quantity: 12, unit: 'eggs', cost: 4.00 },
            { name: 'Canadian bacon', quantity: 1, unit: 'lb', cost: 8.00 },
            { name: 'Cheese', quantity: 0.5, unit: 'lb', cost: 2.00 }
        ],
        instructions: '1. Fry eggs and cook bacon\n2. Toast English muffins\n3. Stack egg, bacon, and cheese on muffin\n4. Serve warm',
        prepTime: '25 mins'
    },
    {
        id: 'r46',
        name: 'Campfire Nachos',
        category: 'snack',
        servings: 10,
        ingredients: [
            { name: 'Tortilla chips', quantity: 3, unit: 'bags', cost: 9.00 },
            { name: 'Ground beef', quantity: 2, unit: 'lbs', cost: 10.00 },
            { name: 'Shredded cheese', quantity: 2, unit: 'lbs', cost: 8.00 },
            { name: 'Jalapeños', quantity: 1, unit: 'jar', cost: 3.00 }
        ],
        instructions: '1. Brown ground beef and season\n2. Layer chips, beef, and cheese on foil\n3. Heat over campfire 5-10 minutes until cheese melts\n4. Add jalapeños and serve',
        prepTime: '20 mins'
    },
    {
        id: 'r47',
        name: 'Campfire Soup',
        category: 'dinner',
        servings: 10,
        ingredients: [
            { name: 'Beef broth', quantity: 8, unit: 'cups', cost: 4.00 },
            { name: 'Mixed vegetables', quantity: 4, unit: 'lbs', cost: 8.00 },
            { name: 'Beef cubes', quantity: 2, unit: 'lbs', cost: 10.00 }
        ],
        instructions: '1. Bring broth to boil in large pot\n2. Add beef and vegetables\n3. Simmer over campfire for 45-60 minutes\n4. Season to taste and serve',
        prepTime: '1.5 hrs'
    },
    {
        id: 'r48',
        name: 'Toast & Camp Jam',
        category: 'breakfast',
        servings: 10,
        ingredients: [
            { name: 'Bread', quantity: 1, unit: 'loaf', cost: 3.00 },
            { name: 'Butter', quantity: 0.5, unit: 'lb', cost: 3.00 },
            { name: 'Jam', quantity: 1, unit: 'jar', cost: 3.00 }
        ],
        instructions: '1. Toast bread over campfire on sticks\n2. Spread with butter and jam\n3. Serve immediately',
        prepTime: '15 mins'
    },
    {
        id: 'r49',
        name: 'Campfire Chili Ramen',
        category: 'lunch',
        servings: 10,
        ingredients: [
            { name: 'Ramen noodles', quantity: 10, unit: 'packages', cost: 5.00 },
            { name: 'Canned chili', quantity: 5, unit: 'cans', cost: 10.00 },
            { name: 'Cheese', quantity: 1, unit: 'lb', cost: 4.00 }
        ],
        instructions: '1. Cook ramen in boiling water\n2. Heat chili in separate pot\n3. Combine ramen and chili\n4. Top with cheese and serve',
        prepTime: '15 mins'
    },
    {
        id: 'r50',
        name: 'Scout Trail Mix',
        category: 'snack',
        servings: 10,
        ingredients: [
            { name: 'Mixed nuts', quantity: 2, unit: 'lbs', cost: 12.00 },
            { name: 'Dried fruit', quantity: 2, unit: 'lbs', cost: 10.00 },
            { name: 'Chocolate chips', quantity: 1, unit: 'cup', cost: 3.00 }
        ],
        instructions: '1. Mix nuts, fruit, and chocolate chips\n2. Package in individual portions\n3. Perfect for hiking and outdoor activities',
        prepTime: '5 mins'
    },
    {
        id: 'r51',
        name: 'Campfire Hot Chocolate',
        category: 'snack',
        servings: 10,
        ingredients: [
            { name: 'Milk', quantity: 4, unit: 'gallons', cost: 12.00 },
            { name: 'Hot chocolate mix', quantity: 2, unit: 'boxes', cost: 6.00 },
            { name: 'Marshmallows', quantity: 2, unit: 'bags', cost: 6.00 }
        ],
        instructions: '1. Heat milk in large pot over campfire\n2. Stir in hot chocolate mix\n3. Top with marshmallows\n4. Serve warm',
        prepTime: '15 mins'
    },
    {
        id: 'r52',
        name: 'Breakfast Baked Beans',
        category: 'breakfast',
        servings: 10,
        ingredients: [
            { name: 'Baked beans', quantity: 6, unit: 'cans', cost: 6.00 },
            { name: 'Bacon', quantity: 2, unit: 'lbs', cost: 12.00 },
            { name: 'Eggs', quantity: 10, unit: 'eggs', cost: 3.00 }
        ],
        instructions: '1. Cook bacon in Dutch oven\n2. Add beans and heat through\n3. Fry eggs and serve on top\n4. Great campfire meal for hearty appetites',
        prepTime: '30 mins'
    },
    {
        id: 'r53',
        name: 'Taco Bar',
        category: 'dinner',
        servings: 10,
        ingredients: [
            { name: 'Ground beef', quantity: 4, unit: 'lbs', cost: 20.00 },
            { name: 'Taco shells', quantity: 20, unit: 'shells', cost: 4.00 },
            { name: 'Lettuce', quantity: 2, unit: 'heads', cost: 4.00 },
            { name: 'Tomatoes', quantity: 6, unit: 'tomatoes', cost: 4.00 },
            { name: 'Cheese', quantity: 2, unit: 'lbs', cost: 8.00 }
        ],
        instructions: '1. Brown ground beef with taco seasoning\n2. Prepare all toppings\n3. Set up taco bar for scouts to build their own\n4. Everyone loves making their perfect taco',
        prepTime: '30 mins'
    },
    {
        id: 'r54',
        name: 'Campfire Cornbread',
        category: 'breakfast',
        servings: 10,
        ingredients: [
            { name: 'Cornbread mix', quantity: 3, unit: 'boxes', cost: 5.00 },
            { name: 'Eggs', quantity: 6, unit: 'eggs', cost: 2.00 },
            { name: 'Milk', quantity: 2, unit: 'cups', cost: 1.50 },
            { name: 'Butter', quantity: 0.5, unit: 'lb', cost: 3.00 }
        ],
        instructions: '1. Mix cornbread batter\n2. Pour into greased Dutch oven or cast iron\n3. Bake over coals for 25-30 minutes\n4. Serve warm with butter and jam',
        prepTime: '40 mins'
    },
    {
        id: 'r55',
        name: 'Easy Camping Pasta',
        category: 'dinner',
        servings: 10,
        ingredients: [
            { name: 'Pasta', quantity: 3, unit: 'lbs', cost: 6.00 },
            { name: 'Marinara sauce', quantity: 3, unit: 'jars', cost: 9.00 },
            { name: 'Ground beef', quantity: 2, unit: 'lbs', cost: 10.00 },
            { name: 'Bread', quantity: 1, unit: 'loaf', cost: 3.00 }
        ],
        instructions: '1. Boil pasta in large pot\n2. Brown beef and mix with sauce\n3. Combine pasta with sauce\n4. Toast bread slices and serve alongside',
        prepTime: '35 mins'
    }
];
