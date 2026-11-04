/* Shared recipe data for Home, Search and the recipe detail.
   Add a new object here to add another searchable recipe. */
const categories = {
    veg: 'Vegetarian',
    seafood: 'Seafood',
    pasta: 'Pasta',
    chicken: 'Chicken',
    misc: 'Snacks',
    meats: 'Beef/Pork',
    dessert: 'Dessert'
};

const recipes = [
    {
        id: 'lentil-soup', name: 'Boozy brown lentil soup', category: 'veg',
        description: 'A warming bowl of brown lentils, tomatoes and vegetables. Simple, hearty and full of flavour.',
        image: 'https://picsum.photos/700/700?random=10', time: 40, calories: 230, level: 'Beginner',
        ingredients: [
            '¼ cup extra virgin olive oil', '1 medium onion, chopped', '2 carrots, peeled and chopped',
            '4 garlic cloves, minced', '2 teaspoons ground cumin', '1 teaspoon curry powder',
            '½ teaspoon dried thyme', '1 large can (28 ounces) diced tomatoes, lightly drained',
            '1 cup brown or green lentils, rinsed', '4 cups vegetable broth', '2 cups water',
            '1 teaspoon salt, or to taste', 'Pinch of red pepper flakes', 'Freshly ground black pepper',
            '1 cup chopped collard greens or kale, tough ribs removed', '1–2 tablespoons lemon juice'
        ],
        instructions: [
            'Warm the olive oil in a large Dutch oven or pot over medium heat. Once the oil is shimmering, add the chopped onion and carrots.',
            'Cook, stirring often, until the onion has softened and is turning translucent, about 5 minutes.',
            'Add the garlic, cumin, curry powder and thyme. Cook while stirring constantly, about 30 seconds. Pour in the drained diced tomatoes and cook for a few more minutes.',
            'Pour in the lentils, broth and water. Add the salt, a pinch of red pepper flakes and black pepper. Bring to a boil, then partially cover and reduce the heat. Simmer for 25–30 minutes, until the lentils are tender.',
            'For a thicker soup, carefully transfer 2 cups to a heat-safe blender. Follow the blender instructions for hot liquids, blend until smooth, then return the blended soup to the pot. You can also use an immersion blender in the pot.',
            'Add the chopped greens and cook for 5 more minutes, until softened. Remove from the heat and stir in the lemon juice. Taste and adjust the seasoning.',
            'Serve warm. Cool leftovers promptly and keep them covered in the refrigerator for up to 4 days, or freeze for later.'
        ]
    },
    {
        id: 'craptacular', name: 'Crap’tacular', category: 'seafood',
        description: 'Garlic and lemon prawns in a quick tomato sauce. Serve with crusty bread.',
        image: 'https://picsum.photos/600/400?random=11', time: 20, calories: 320, level: 'Beginner',
        ingredients: ['300 g peeled prawns', '1 tablespoon olive oil', '2 garlic cloves, minced', '400 g chopped tomatoes', '½ lemon', 'Fresh parsley', 'Salt and pepper', 'Bread, to serve'],
        instructions: ['Heat the oil in a frying pan over medium heat. Add the garlic and stir for 30 seconds.', 'Add the tomatoes and simmer for 10 minutes, stirring occasionally.', 'Add the prawns and cook for 3–5 minutes until opaque and cooked through.', 'Add lemon juice, parsley, salt and pepper. Serve straight away with bread.']
    },
    {
        id: 'chicktastic', name: 'Chick’tastic', category: 'chicken',
        description: 'Golden oven-baked chicken with lemon, herbs and roasted vegetables.',
        image: 'https://picsum.photos/600/400?random=12', time: 45, calories: 480, level: 'Beginner',
        ingredients: ['2 chicken breasts', '2 carrots', '1 courgette', '2 tablespoons olive oil', '1 lemon', '1 teaspoon dried thyme', 'Salt and pepper'],
        instructions: ['Heat the oven to 200°C. Cut the vegetables into even pieces and place on a baking tray.', 'Coat the chicken and vegetables with oil, lemon juice, thyme, salt and pepper.', 'Roast for about 25–35 minutes. Check that the thickest part of the chicken reaches 74°C with a food thermometer.', 'Let the chicken rest for 5 minutes, then slice and serve with the vegetables.']
    },
    {
        id: 'dessertalicious', name: 'Dessert’alicious', category: 'dessert',
        description: 'A creamy yoghurt dessert layered with berries and crunchy biscuits.',
        image: 'https://picsum.photos/600/400?random=13', time: 10, calories: 260, level: 'Beginner',
        ingredients: ['300 g Greek yoghurt', '150 g mixed berries', '4 digestive biscuits', '1 tablespoon honey', '½ teaspoon vanilla extract'],
        instructions: ['Mix the yoghurt with honey and vanilla.', 'Crush the biscuits into small pieces.', 'Layer biscuits, yoghurt and berries in two glasses.', 'Serve immediately for a crunchy dessert, or chill until ready to eat.']
    },
    {
        id: 'spicy-meatabowl', name: 'Spicy meat’abowl', category: 'meats',
        description: 'A rich beef and tomato bowl with beans, chilli and rice.',
        image: 'https://picsum.photos/600/400?random=14', time: 35, calories: 540, level: 'Beginner',
        ingredients: ['250 g minced beef', '1 onion, chopped', '1 tablespoon oil', '400 g chopped tomatoes', '1 can kidney beans, drained and rinsed', '1 teaspoon cumin', '½ teaspoon chilli powder', '150 g rice', 'Salt and pepper'],
        instructions: ['Cook the rice following the packet instructions.', 'Heat oil in a large pan. Soften the onion for 5 minutes, then add the beef and break it up with a spoon.', 'Cook the minced beef through, then add cumin, chilli, tomatoes and beans.', 'Simmer for 15–20 minutes. Season to taste and serve with the rice.']
    },
    {
        id: 'tomato-pasta', name: 'Tomato twist pasta', category: 'pasta',
        description: 'An easy tomato and basil pasta for a quick weeknight dinner.',
        image: 'https://picsum.photos/600/400?random=15', time: 20, calories: 410, level: 'Beginner',
        ingredients: ['200 g pasta', '1 tablespoon olive oil', '2 garlic cloves', '400 g chopped tomatoes', 'A handful of fresh basil', 'Grated cheese, optional', 'Salt and pepper'],
        instructions: ['Boil the pasta in salted water following the packet instructions. Save a small cup of cooking water before draining.', 'Heat the oil and gently cook the chopped garlic for 30 seconds.', 'Add tomatoes and simmer for 10 minutes. Season with salt and pepper.', 'Toss the pasta with the sauce, adding a splash of pasta water if needed. Finish with basil and optional cheese.']
    },
    {
        id: 'crunchy-toast', name: 'Crunchy avocado toast', category: 'misc',
        description: 'Crisp toast topped with avocado, lemon and a pinch of chilli.',
        image: 'https://picsum.photos/600/400?random=16', time: 10, calories: 290, level: 'Beginner',
        ingredients: ['2 slices of bread', '1 ripe avocado', '½ lemon', 'A pinch of chilli flakes', 'Salt and pepper'],
        instructions: ['Toast the bread until golden.', 'Mash the avocado with lemon juice, salt and pepper.', 'Spread over the warm toast and sprinkle with chilli flakes.', 'Serve immediately.']
    }
];
