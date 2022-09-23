const express = require('express')

//Routers
const { usersRouter } = require('./routers/user.router')
const { restaurantsRouter } = require('./routers/restaurant.router')
const { ordersRouter } = require('./routers/order.router')
const { mealsRouter } = require('./routers/meal.router')
const { reviewsRouter } = require('./routers/review.router')

//Init our Express app
const app = express()

//Enable to express app to receive json data
app.use(express.json())

//Endpoints
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/restaurants', restaurantsRouter)
app.use('/api/v1/meals', mealsRouter)
app.use('/api/v1/orders', ordersRouter)


app.use((error, req, res, next) => {
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    error,
    stack: error.stack
  })
})

//Catch non-existing endpoints
app.all('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `${req.method} ${req.url} does not exist in our server`,
  })
})

module.exports = { app }
