const express = require("express");

//Controllers
const { createMeal, getAllMeals, getAllMealsById, updateMeal, deleteMeal } = require('../controllers/meal.controller')

//Middleware
const { protectSession, protectAdmin } = require('../middlewares/auth.middleware')
const { mealValidator } = require('../middlewares/validator.middleware')

const mealsRouter = express.Router();


mealsRouter.get('/', getAllMeals)
mealsRouter.get('/:id', getAllMealsById)

mealsRouter.use(protectSession)

mealsRouter.post('/:id', mealValidator, createMeal)
mealsRouter.patch('/:id', protectAdmin, updateMeal)
mealsRouter.delete('/:id', protectAdmin, deleteMeal)



module.exports = { mealsRouter };
