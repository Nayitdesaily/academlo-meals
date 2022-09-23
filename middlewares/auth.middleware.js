const { User } = require('../models/user.model')
const jwt = require('jsonwebtoken')

const { catchAsync } = require('../utils/catchAsync.util')
const { AppError } = require('../utils/appError.util')

const protectSession = catchAsync(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return next(new AppError('Invalid role', 403))

  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET)

  const user = await User.findOne({
    where: { id: decoded.id, status: 'active' },
  })

  if (!user) {
    return next(new AppError('The owner of the session is no loner active', 403))
  }

  req.sessionUser = user
  next()
})

const protectUserAccount = (req, res, next) => {
  try {
    const { sessionUser, user } = req

    if (sessionUser.id !== user.id) {
      return next(new AppError('You are not owner of this account', 403))
    }
    next()
  } catch (error) {
    console.log(error)
  }
}

const protectAdmin = (req, res, next) => {
  try {
    const { sessionUser } = req

    if (sessionUser.role !== 'admin') {
      return next(new AppError('You do not have the right access level', 403))
    }
    next()
  } catch (error) {
    console.log(error)
  }
}

const protectOrderAccount = (req, res, next) => {
  try {
    const { sessionUser, order } = req

    if (sessionUser.id !== order.userId) {
      return next(new AppError('You are not owner of this order', 403))
    }
    next()
  } catch (error) {
    console.log(error)
  }
}

const protectReview = (req, res, next) => {
  try {
    const { review, sessionUser } = req

    if (sessionUser.id !== review.userId) {
      return next(new AppError('You are not owner of this review', 403))
    }
    next()
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  protectSession,
  protectUserAccount,
  protectAdmin,
  protectOrderAccount,
  protectReview
}
