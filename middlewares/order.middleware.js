const { Meal } = require('../models/meal.model')
const { Order } = require('../models/order.model')

const { catchAsync } = require('../utils/catchAsync.util')
const { AppError } = require('../utils/appError.util')

const mealExistInOrder = catchAsync(async (req, res, next) => {

  const { mealId } = req.body

  const meal = await Meal.findOne({ where: { id: mealId, status: 'active' } })

  if (!meal) {
    return next(new AppError('Meal do not found', 404))
  }

  req.meal = meal
  next()
})

const orderExist = catchAsync(async (req, res, next) => {
  const { id } = req.params

  const order = await Order.findOne({ where: { id, status: 'active' }, attributes: { exclude: ['createdAt', 'updatedAt'] } })

  if (!order) {
    return next(new AppError('Order do not found', 403))
  }

  req.order = order

  next()
})


module.exports = { mealExistInOrder, orderExist }