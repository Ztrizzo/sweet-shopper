const Sequelize = require('sequelize');
const db = require('../db');
const Cart = require('./cart');


const LineItem = db.define('lineitem', {
  qty:{
    type: Sequelize.INTEGER
  }
})

LineItem.generateRandom = async () => {
  const carts = await Cart.findAll();

  await LineItem.create({
    qty: Math.floor(Math.random() * 10),
    cartId: carts[Math.floor(Math.random() * carts.length)].id
  })
}

module.exports = LineItem;