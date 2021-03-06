'use strict'

const {db, models: {User, Candy, LineItem, Tag} } = require('../server/db')
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
    
    User.create({ username: 'cody', password: '123', firstName: 'cody', lastName: 'codertion', email: 'cody@gmail.com', address: '2049-2017 E Atlantic Ct', city: 'Los Angeles', usState: 'CA', zipcode: '90021' }),
    User.create({ username: 'murphy', password: '123', firstName: 'murphy', lastName: 'murphington', email: 'murphy@gmail.com', address: '233 S Wacker Dr', city: 'Chicago', usState: 'IL', zipcode: '60606' }),
    User.create({username: 'mr admin', password: 'admin', admin:true, firstName: 'mr', lastName: 'admin', email: 'admin@gmail.com', address: '5 Hanover Square 11th floor', city: 'New York', usState: 'NY', zipcode: '10004'})
  ])

  const carts = [];
  users.forEach(async (user) => {
    carts.push(await Cart.create({userId: user.id}));
  })


  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)

  //seed candy
  const candy = [];
  for(let i = 0; i < 100; i++){
    candy.push(await Candy.generateRandom());
  }

  //for each user, create an order (a cart with isPurchased true). 
  //The, create a random number of lineItems for that order.
  for(let i = 0; i < users.length; i++){


    //random number of orders
    for(let k = 0; k < Math.ceil(Math.random() * 10); k++){
      const cart = await Cart.create({userId: users[i].id, isPurchased: true});

      //random number of lineitems in that order
      for(let j = 0; j < Math.ceil(Math.random() * 5); j++){
        const candyId = candy[Math.floor(Math.random() * candy.length)].id
        const seededCandy = await Candy.findByPk(candyId);
        const qty = Math.ceil(Math.random() * 10)
        const seededLineItem = await LineItem.create({
          candyId: candyId,
          qty: qty,
          cartId: cart.id,
        })
        cart.total = (cart.total * 1 + (seededLineItem.qty * seededCandy.price)) * 1;
      }
      await cart.save()
    }

  }

  //seed lineitems
  for(let i = 0; i < 10; i++){
    await LineItem.create({
      candyId: candy[Math.floor(Math.random() * candy.length)].id,
      qty: Math.ceil(Math.random() * 10),
      cartId: carts[Math.floor(Math.random() * carts.length)].id
    })
  }

  //create some tags
  const tagNames = ['Chocolate', 'Fruit', 'Hard Candy', 'Caramel', 'Lactose-Free', 'Gummy', 'Licorice', 'Sour', 'Lollipop', 'Chewing Gum']
  const tags = []
  for(let i = 0; i < tagNames.length; i++){
    tags.push(await Tag.create({name: tagNames[i]}));
  }


  //add three random tag to each candy
  for(let i = 0; i < candy.length; i++){
    for(let j = 0 ; j < 3; j++){
      await candy[i].addTag(Math.floor(Math.random() * tagNames.length));
    }

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
