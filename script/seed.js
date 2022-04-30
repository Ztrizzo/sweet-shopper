'use strict'

const {db, models: {User, Candy, LineItem} } = require('../server/db')
const Cart = require('../server/db/models/Cart')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    
    User.create({ username: 'cody', password: '123', firstName: 'cody', lastName: 'codertion', email: 'cody@gmail.com' }),
    User.create({ username: 'murphy', password: '123', firstName: 'murphy', lastName: 'murphington', email: 'murphy@gmail.com' }),
    User.create({username: 'mr admin', password: 'admin', admin:true, firstName: 'mr', lastName: 'admin', email: 'admin@gmail.com'})
  ])

  const carts = [];
  users.forEach(async (user) => {
    carts.push(await Cart.create({userId: user.id}));
  })


  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)

  //seed candy
  const candy = [];
  for(let i = 0; i < 10; i++){
    candy.push(await Candy.generateRandom());
  }

  //seed lineitems
  for(let i = 0; i < 10; i++){
    await LineItem.create({
      candyId: candy[Math.floor(Math.random() * candy.length)].id,
      qty: Math.floor(Math.random() * 10),
      cartId: carts[Math.floor(Math.random() * carts.length)].id
    })
  }
  

  return {
    users: {
      cody: users[0],
      murphy: users[1]
    },
    candy
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
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

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
