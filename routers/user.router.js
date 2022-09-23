const express = require('express')

//Controllers
const {
  createUser,
  login,
  updateUser,
  getAllUsers,
} = require('../controllers/user.controller')

const { getOrdersbyUserId, getOrdersbyId } = require('../controllers/order.controller')

//Middlewares
const {
  protectSession,
  protectUserAccount,
  protectAdmin,
} = require('../middlewares/auth.middleware')

const { userExist } = require('../middlewares/user.middleware')

const { userValidator } = require('../middlewares/validator.middleware')

const usersRouter = express.Router()

usersRouter.post('/', userValidator, createUser)
usersRouter.post('/login', login)

//Protect below endpoints
usersRouter.use(protectSession)

usersRouter.patch('/:id', userExist, protectUserAccount, updateUser)
usersRouter.delete('/:id', userExist, protectUserAccount, updateUser)
usersRouter.get('/', protectAdmin, getAllUsers)

usersRouter.get('/orders', getOrdersbyUserId)
usersRouter.get('/orders/:id', getOrdersbyId)


module.exports = { usersRouter }
