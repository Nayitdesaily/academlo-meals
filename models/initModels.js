const { User } = require('../models/user.model')
const { Order } = require('../models/order.model')
const { Restaurant } = require('../models/restaurant.model')
const { Review } = require('../models/review.model')
const { Meal } = require('../models/meal.model')


const initModels = () => {

  //User - Order
  User.hasMany(Order, { foreignKey: 'userId' })
  Order.belongsTo(User)

  //User - Review 
  User.hasMany(Review, { foreignKey: 'userId' })
  Review.belongsTo(User)

  //Restaurant - Meal
  Restaurant.hasMany(Meal, { foreignKey: 'restaurantId' })
  Meal.belongsTo(Restaurant)

  //Restaurant - Review
  Restaurant.hasMany(Review, { foreignKey: 'restaurantId' })
  Review.belongsTo(Restaurant)

  //Meal - Order
  Meal.hasOne(Order)
  Order.belongsTo(Meal)

}

initModels()

module.exports = { initModels }