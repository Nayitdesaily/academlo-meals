const express = require("express");

//Controllers
const {
  createRestaurant,
  getAllRestaurant,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant
} = require('../controllers/restaurant.controller')

const {
  createReview,
  updateReview,
  deleteReview
} = require('../controllers/review.controller')

//Middlewares
const { protectSession, protectAdmin, protectReview } = require('../middlewares/auth.middleware')
const { restaurantValidator } = require('../middlewares/validator.middleware')
const { reviewExist } = require('../middlewares/review.middleware')

const restaurantsRouter = express.Router();

restaurantsRouter.get('/', getAllRestaurant)
restaurantsRouter.get('/:id', getRestaurantById)

restaurantsRouter.use(protectSession)

restaurantsRouter.post('/', restaurantValidator, createRestaurant)
restaurantsRouter.patch('/:id', protectAdmin, updateRestaurant)
restaurantsRouter.delete('/:id', protectAdmin, deleteRestaurant)

restaurantsRouter.post('/reviews/:restaurantId', createReview)
restaurantsRouter.patch('/reviews/:id', reviewExist, protectReview, updateReview)
restaurantsRouter.delete('/reviews/:id', reviewExist, protectReview, deleteReview)

module.exports = { restaurantsRouter };
