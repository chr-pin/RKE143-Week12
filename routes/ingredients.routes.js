const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
    const ingredient = await db.query('SELECT * FROM ingredient;');
    res.json(ingredient.rows)
})


module.exports = router