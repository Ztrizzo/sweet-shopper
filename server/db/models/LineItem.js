const { VIRTUAL } = require('sequelize');
const Sequelize = require('sequelize')
const db = require('../db')
const Candy = require('./Candy')

const LineItem = db.define('lineitem', {
  qty: {
    type: Sequelize.INTEGER,
    validate:{
      isPositive(value){
        if(value < 0){
          throw new Error('Line item can not have negative quantity');
        }
      }
    }
  },
  totalPrice: {
    type: VIRTUAL,
    async get(){
      const candy = await Candy.findByPk(this.candyId);
      const totalPrice = (this.qty * candy.price)
      return totalPrice
    }
  }
})

 
module.exports = LineItem;