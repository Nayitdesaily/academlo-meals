const { Review } = require('../models/review.model')


const { catchAsync } = require('../utils/catchAsync.util')
const { AppError } = require('../utils/appError.util')

const createReview = catchAsync(async (req, res) => {
  const { restaurantId } = req.params
  const { comment, rating } = req.body
  const { sessionUser } = req

  const newReview = await Review.create({
    userId: sessionUser.id,
    comment,
    restaurantId: restaurantId,
    rating
  })

  res.status(201).json({
    status: 'success',
    data: { newReview }
  })
})

const updateReview = catchAsync(async (req, res) => {
  const { comment, rating } = req.body
  const { review } = req

  await review.update({ comment, rating })

  res.status(201).json({
    status: 'success',
    data: { review }
  })
})

const deleteReview = catchAsync(async (req, res) => {

  const { review } = req

  await review.update({ status: 'deleted' })

  res.status(204).json({ status: 'success' })
})

module.exports = { createReview, updateReview, deleteReview }