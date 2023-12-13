const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
    const recipes = await db.query('SELECT * FROM receipe;');
    console.log(recipes.rows)
    res.json(recipes.rows)
})


router.post('/', async (req, res) => {
    const {recipename} = req.body

    const data = db.query('SELECT * FROM receipe WHERE recipename = $1', [recipename])

    if((await data).rows.length !== 0) {
        res.json({message: 'recipe already exists'})
    } else {

        try  {
            const result = await db.query('INSERT INTO receipe (recipename) VALUES ($1);', [recipename])
            res.json({message: `${result.rowCount} rows was added`})
        }
        catch(error) {

            console.log(error)

        }
    }
        

})

router.put('/', async (req, res) => {
    const {recipename, instructions}  = req.body;

    const data = db.query('SELECT * FROM receipe WHERE recipename = $1', [recipename])
    if((await data).rows.length === 0) {
        res.json({message: 'there is no such recipe'})
    } else {
        try {
            const result = await db.query('UPDATE receipe SET instructions = $1 WHERE recipename = $2;', [instructions, recipename])
            res.json({message: `${result.rowCount} rows was updated`})
        }
        catch(error) {
            console.log(error)

        }
    }
})


router.delete('/', async (req, res) => {
    const {recipename}  = req.body;
    const data = db.query('SELECT * FROM receipe WHERE recipename = $1', [recipename])

    if((await data).rows.length === 0) {
        res.json({message: 'there is no such recipe'})
    } else {
        try {
            const result = await db.query('DELETE FROM receipe WHERE recipename = $1', [recipename])
            res.json({message: `${result.rowCount} rows was deleted`})
        }
        catch(error) {
            console.log(error)

        }
    }

})


router.post('/addingredientsinrecipe', async (req, res) => {
    const {recipename, ingredientname}  = req.body;
    const data = await db.query("SELECT a.recipeName, b.ingredientName FROM receipe a INNER JOIN IngredientInRecipe c ON a.id = c.recipeId INNER JOIN ingredient b ON b.id = c.ingredientId WHERE a.recipeName = $1 AND b.ingredientName = $2;", [recipename, ingredientname]);
    if((await data).rows.length !== 0) {
        res.json({message: 'record already exists'})
    } else {

        try  {
            const result = await db.query("INSERT INTO ingredientinrecipe (recipeid, ingredientid) SELECT a.id, b.id FROM receipe a JOIN ingredient b ON a.recipeName = $1 AND b.ingredientname = $2;", [recipename, ingredientname])
            res.json({message: `${result.rowCount} rows was added`})
        }
        catch(error) {

            console.log(error)

        }
    }
      
})

module.exports = router