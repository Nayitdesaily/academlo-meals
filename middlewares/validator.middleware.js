const { body, validationResult } = require('express-validator')

const { AppError } = require('../utils/appError.util')

const checkValidator = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.empty) {
    const errorMessages = errors.array().map(error => error.msg)
    const message = errorMessages.join('. ')

    return next(new AppError(message, 400))
  }

  next()
}

const userValidator = [
  body('name')
    .isString().withMessage('Name must be a string')
    .isLength({ min: 3 }).withMessage('Name must have at least 3 characters')
    .notEmpty().withMessage('Name cannot be empty, you need to fill out it'),
  body('email')
    .isEmail().withMessage('Email must be an validated email')
    .notEmpty().withMessage('Email cannot be empty, you need to fill out it'),
  body('password')
    .isString().withMessage('Password must be a string')
    .isLength({ min: 7 }).withMessage('Password must have at least 7 characters')
    .notEmpty().withMessage('Price cannot be empty, you need to fill out it'),
  body('role')
    .isString().withMessage('Role must be a string')
    .notEmpty().withMessage('Role cannot be empty, you need to fill out it'),
  checkValidator
]

const mealValidator = [
  body('name')
    .isString().withMessage('Name must be a string')
    .isLength({ min: 3 }).withMessage('Name must have at least 3 characters')
    .notEmpty().withMessage('Name cannot be empty, you need to fill out it'),
  body('price')
    .isNumeric().withMessage('Price must be a number')
    .notEmpty().withMessage('Price cannot be empty, you need to fill out it'),
  checkValidator
]

const restaurantValidator = [
  body('name')
    .isString().withMessage('Name must be a string')
    .notEmpty().withMessage('Name cannot be empty, you need to fill out it'),
  body('address')
    .isString().withMessage('Price must be a number')
    .notEmpty().withMessage('Price cannot be empty, you need to fill out it'),
  body('rating')
    .isNumeric().withMessage('Rating must be a number between 1 to 5')
    .notEmpty().withMessage('Rating cannot be empty, you need to fill out it'),
  checkValidator
]


module.exports = { mealValidator, userValidator, restaurantValidator }

