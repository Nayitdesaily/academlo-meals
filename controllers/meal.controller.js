const { Meal } = require('../models/meal.model')
const { Restaurant } = require('../models/restaurant.model')

const { catchAsync } = require('../utils/catchAsync.util')
const { AppError } = require('../utils/appError.util')

const createMeal = catchAsync(async (req, res) => {
  const { id } = req.params
  const { name, price } = req.body

  const newMeal = await Meal.create({ name, price, restaurantId: id })

  res.status(201).json({
    status: 'success',
    data: { newMeal }
  })
})

const getAllMeals = catchAsync(async (req, res) => {

  const meals = await Meal.findAll({
    where: { status: 'active' },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: {
      model: Restaurant,
      attributes: { exclude: ['createdAt', 'updatedAt', 'status', 'rating'] }
    }
  })

  res.status(200).json({
    status: 'success',
    data: { meals }
  })
})

const getAllMealsById = catchAsync(async (req, res) => {

  const { id } = req.params

  const meal = await Meal.findOne({
    where: { id, status: 'active' },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: {
      model: Restaurant,
      attributes: { exclude: ['createdAt', 'updatedAt', 'status', 'rating'] }
    }
  })

  res.status(200).json({
    status: 'success',
    data: { meal }
  })
})

const updateMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const { name, price } = req.body

  const meal = await Meal.findOne({ where: { id } })

  if (!meal) {
    return next(new AppError('Meal not found', 404))
  }

  await meal.update({ name, price })

  res.status(200).json({
    status: 'success',
    data: { meal }
  })
})

const deleteMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params

  const meal = await Meal.findOne({ where: { id } })

  if (!meal) {
    return next(new AppError('Meal not found', 404))
  }

  await meal.update({ status: 'disabled' })

  res.status(200).json({
    status: 'success',
    data: { meal }
  })
})

module.exports = { createMeal, getAllMeals, getAllMealsById, updateMeal, deleteMeal }