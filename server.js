const express = require('express');
const db = require('./db.js');
const receipeRouter = require('./routes/recipes.routes.js')
const ingredientRouter = require('./routes/ingredients.routes.js')
const fullRecipesRouter = require('./routes/fullRecipes.routes.js')
const randomrouter = require('./routes/randomRecipe.routes.js')
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


app.use(express.json())


app.use('/recipes', receipeRouter)

app.use('/ingredients', ingredientRouter)

app.use('/fullRecipes', fullRecipesRouter)

app.use('/random', randomrouter)


app.listen(3000, () => {
    console.log('Server is running on port 3000')
});
