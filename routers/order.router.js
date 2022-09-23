const express = require("express");

const ordersRouter = express.Router();

//Middleware
const { mealExistInOrder, orderExist } = require('../middlewares/order.middleware')
const { protectSession, protectOrderAccount } = require('../middlewares/auth.middleware')


//Controller
const { createOrder, updateOrder, deleteOrder, getOrdersbyUserId } = require('../controllers/order.controller')

ordersRouter.use(protectSession)

ordersRouter.post('/', mealExistInOrder, createOrder)

ordersRouter.get('/me', getOrdersbyUserId)

ordersRouter.patch('/:id', orderExist, protectOrderAccount, updateOrder)

ordersRouter.delete('/:id', orderExist, protectOrderAccount, deleteOrder)

module.exports = { ordersRouter };
