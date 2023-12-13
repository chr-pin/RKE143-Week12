const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
    const ingredient = await db.query('SELECT * FROM ingredient;');
    res.json(ingredient.rows)
})


router.post('/', async (req, res) => {
    const {ingredientname} = req.body

    const data = db.query('SELECT * FROM ingredient WHERE ingredientname = $1', [ingredientname])

    if((await data).rows.length !== 0) {
        res.json({message: 'ingredient already exists'})
    } else {

        try  {
            const result = await db.query('INSERT INTO ingredient (ingredientname) VALUES ($1)', [ingredientname])
            res.json({message: `${result.rowCount} rows was added`})
        }
        catch(error) {

            console.log(error)

        }
    }
        

})


router.delete('/', async (req, res) => {
    const {ingredientname}  = req.body;
    const data = db.query('SELECT * FROM ingredient WHERE ingredientname = $1', [ingredientname])

    if((await data).rows.length === 0) {
        res.json({message: 'there is no such ingredient'})
    } else {
        try {
            const result = await db.query('DELETE FROM ingredient WHERE ingredientname = $1', [ingredientname])
            res.json({message: `${result.rowCount} rows was deleted`})
        }
        catch(error) {
            console.log(error)

        }
    }

    



})

module.exports = router