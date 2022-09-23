const { Order } = require('../models/order.model')
const { Meal } = require('../models/meal.model')
const { Restaurant } = require('../models/restaurant.model')


const { catchAsync } = require('../utils/catchAsync.util')
const { AppError } = require('../utils/appError.util')

const createOrder = catchAsync(async (req, res,) => {

  const { mealId, quantity } = req.body
  const { sessionUser, meal } = req

  const newOrder = await Order.create({ quantity, mealId, userId: sessionUser.id, totalPrice: quantity * meal.price })

  res.status(201).json({
    status: 'success',
    data: { newOrder }
  })
})

const getOrdersbyUserId = catchAsync(async (req, res) => {

  const { sessionUser } = req

  const orders = await Order.findAll({
    where: { userId: sessionUser.id },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: {
      model: Meal,
      attributes: { exclude: ['createdAt', 'updatedAt', 'status'] },
      include: {
        model: Restaurant,
        attributes: { exclude: ['createdAt', 'updatedAt', 'status', 'rating '] }
      }
    }
  })

  res.status(201).json({
    status: 'success',
    data: { orders }
  })
})

const getOrdersbyId = catchAsync(async (req, res, next) => {

  const { id } = req.params

  const order = await Order.findOne({
    where: { id },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: {
      model: Meal,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: { model: Restaurant, attributes: { exclude: ['createdAt', 'updatedAt', 'rating'] } }
    }
  })

  if (!order) {
    return next(new AppError('Order do not found', 404))
  }

  res.status(201).json({
    status: 'success',
    data: { order }
  })
})

const updateOrder = catchAsync(async (req, res,) => {

  const { order } = req

  await order.update({ status: 'completed' })

  res.status(201).json({
    status: 'success',
    data: { order }
  })
})

const deleteOrder = catchAsync(async (req, res,) => {

  const { order } = req

  await order.update({ status: 'cancelled' })

  res.status(204).json({
    status: 'success'
  })
})




module.exports = { createOrder, updateOrder, deleteOrder, getOrdersbyUserId, getOrdersbyId }