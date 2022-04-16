//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User');
const Candy = require('./models/Candy');
const LineItem = require('./models/LineItem');
const Cart = require('./models/Cart');


User.belongsTo(Cart);
Cart.hasOne(User);
LineItem.hasOne(Candy);
Candy.belongsTo(LineItem);
Cart.hasMany(LineItem);
LineItem.belongsTo(Cart);

module.exports = {
  db,
  models: {
    User,
    Candy,
    LineItem,
    Cart
  },
}
