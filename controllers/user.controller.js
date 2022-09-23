const { User } = require('../models/user.model')
const dotenv = require('dotenv')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

dotenv.config({ path: './config.env' })

const { catchAsync } = require('../utils/catchAsync.util')
const { AppError } = require('../utils/appError.util')

const createUser = catchAsync(async (req, res) => {
  const { name, email, password, role } = req.body

  if (role !== 'admin' && role !== 'normal') {
    return next(new AppError('Invalid Role', 403))
  }

  const salt = await bcrypt.genSalt(12)
  const hashedPassword = await bcrypt.hash(password, salt)

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  })
  newUser.password = undefined

  res.status(201).json({
    status: 'success',
    data: { newUser },
  })
})

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ where: { email, status: 'active' } })

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Wrong Credentials', 403))
  }
  user.password = undefined

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  })

  res.status(200).json({
    status: 'success',
    data: {
      user,
      token,
    },
  })
})

const updateUser = catchAsync(async (req, res, next) => {
  const { name, email } = req.body
  const { user } = req

  await user.update({ name, email })

  res.status(200).json({
    status: 'success',
    data: { user },
  })
})

const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req

  await user.update({ status: 'disabled' })

  res.status(204).json({ status: 'success' })
})

const getAllUsers = catchAsync(async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
  })

  res.status(200).json({
    status: 'success',
    data: { users },
  })
})





module.exports = { createUser, login, updateUser, getAllUsers, deleteUser }
