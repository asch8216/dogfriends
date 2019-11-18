const router = require('express').Router()
const {Dates} = require('../db/models/index')
const {User} = require('../db/models/index')

router.get('/', async (req, res, next) => {
  console.log('dates', Dates)
  console.log('user', User.id)
  try {
    const dates = await Dates.findAll({
      where: {
        userId: req.user.id
      }
    })
    res.json(dates)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    console.log(req.body)
    // const dates = await Dates.create({
    //   req.body
    // })
    const dates = await req.body.forEach(date => {
      Dates.create({
        date: date.date,
        userId: date.userId
      })
    })
    res.json(dates)
  } catch (error) {
    next(error)
  }
})

module.exports = router
