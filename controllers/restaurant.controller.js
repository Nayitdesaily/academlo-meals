const { Restaurant } = require('../models/restaurant.model')
const { Review } = require('../models/review.model')

const { catchAsync } = require('../utils/catchAsync.util')
const { AppError } = require('../utils/appError.util')

const createRestaurant = catchAsync(async (req, res) => {
  const { name, address, rating } = req.body

  const newRestaurant = await Restaurant.create({ name, address, rating })

  res.status(201).json({
    status: 'success',
    data: { newRestaurant }
  })
})

const getAllRestaurant = catchAsync(async (req, res) => {
  const restaurants = await Restaurant.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    where: { status: 'active' },
    include: {
      model: Review
    }
  })

  res.status(200).json({
    status: 'success',
    data: { restaurants }
  })
})

const getRestaurantById = catchAsync(async (req, res) => {
  const { id } = req.params

  const restaurant = await Restaurant.findOne({
    where: { id },
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  })

  if (!restaurant) {
    return next(new AppError('Restaurant not found', 404))
  }

  res.status(200).json({
    status: 'success',
    data: { restaurant }
  })
})

const updateRestaurant = catchAsync(async (req, res) => {
  const { id } = req.params
  const { name, address } = req.body

  const restaurant = await Restaurant.findOne({ where: { id } })

  if (!restaurant) {
    return next(new AppError('Restaurant is not found', 404))
  }

  await restaurant.update({ name, address })

  res.status(200).json({
    status: 'success',
    data: { restaurant }
  })

})

const deleteRestaurant = catchAsync(async (req, res) => {
  const { id } = req.params

  const restaurant = await Restaurant.findOne({ where: { id } })

  if (!restaurant) {
    return next(new AppError('Restaurant is not found', 404))
  }

  await restaurant.update({ status: 'disabled' })

  res.status(204).json({ status: 'success' })
})

module.exports = { createRestaurant, getAllRestaurant, getRestaurantById, updateRestaurant, deleteRestaurant }