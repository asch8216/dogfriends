const Sequelize = require('sequelize')
const db = require('../db')

const Dates = db.define('dates', {
  date: {
    type: Sequelize.STRING
  }
})

module.exports = Dates
