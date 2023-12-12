const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {

    try {

        const receipeQuery = 'SELECT id, recipeName, instructions FROM receipe ORDER BY RANDOM() LIMIT 1;'

        const receipeResult = await db.query(receipeQuery);
        const selectedRecipe = receipeResult.rows[0];

        const ingredientsQuery = 'SELECT b.ingredientName FROM ingredient b INNER JOIN IngredientInRecipe c ON b.id = c.ingredientId WHERE c.recipeId = $1;'

        const ingredientRwsult =  await db.query(ingredientsQuery, [selectedRecipe.id]);

        const ingredients = ingredientRwsult.rows.map(element => element.ingredientname)



        const randomRecipe = {
        recipe : selectedRecipe,
        ingredients: ingredients
    }

    res.json(randomRecipe)

    }

    catch(error) {

        res.status(500).json({error: 'Internal serves error.'})

    }
    
    

})


module.exports = router