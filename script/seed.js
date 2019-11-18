'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Dates} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'}),
    User.create({email: 'tom@email.com', googleId: '110657798678729707111'}),
    User.create({email: 'john@email.com', googleId: '110657798678729707222'}),
    User.create({email: 'larry@email.com', googleId: '110657798678729707333'})
  ])
  const dates = await Promise.all([
    Dates.create({date: '2019-12-23', userId: 5}),
    Dates.create({date: '2019-12-24', userId: 5}),
    Dates.create({date: '2019-12-25', userId: 5}),
    Dates.create({date: '2019-12-26', userId: 5}),
    Dates.create({date: '2020-01-23', userId: 3}),
    Dates.create({date: '2020-01-24', userId: 3}),
    Dates.create({date: '2020-01-25', userId: 3}),
    Dates.create({date: '2020-01-26', userId: 3}),
    Dates.create({date: '2020-01-25', userId: 4}),
    Dates.create({date: '2020-01-26', userId: 4}),
    Dates.create({date: '2020-01-27', userId: 4}),
    Dates.create({date: '2020-01-28', userId: 4}),
    Dates.create({date: '2020-01-28', userId: 6})
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${dates.length} dates`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
