const Sequelize = require('sequelize');
const db = require('../db');

const Candy = db.define('candy', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    //add this back in after we have a better way to seed.
    // unique: true,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  weight: {
    type: Sequelize.STRING
  }
})

Candy.generateRandom = () => {

  // This is the beginning of an idea to create random candy names. It works right now, but I need to add more 
  // variety so that we don't get a bunch of repeats
  const prefixes = [
    'Coco',
    'Super',
    'Butter',
    'Frutti',
    'Crazy',
    'Cosmo',
    'Shiny',
    'Apple',
    'Pear',
    'Plum',
    'Choco',
    'Dyna',
    'Astro',
    'Yummy'
  
  ]
  
  const candy = [
    'jellies',
    'bubbles',
    'pops',
    'bursts',
    'strings',
    'ropes',
    'ploops',
    'kisses',
    'aroos',
    'doodles',
    'blooper',
    'blob',
    'poppers',
    'buttons',
    'lumps'
    
  ]
  
  const adjective = [
    'Tasty',
    'Delicious',
    'Fruity',
    'Cookie',
    'Cakey',
    'Lite',
    'Sugary',
    'Scrumptious',
    'Glazed',
    'Bursting',
    'Exploding',
    'Hard',
    'Soft',
    
  ]
const randomName = 
  `
    ${adjective[Math.floor(Math.random() * adjective.length)]} ${prefixes[Math.floor(Math.random() * prefixes.length)]}${candy[Math.floor(Math.random() * candy.length)]}    
  `


  //List of possible random names. Could use an api later.
  // const randomName = [
  //   'Plum Cocobites',
  //   'Grape Wild Popcorn',
  //   'Grape Bananas',
  //   'Junior Toffee',
  //   'Blueberry Crackochocolates',
  //   'Bubblegum Taffy',
  //   'Wild Cremes',
  //   'Gooey Blueberry Cremes',
  //   'Globlackberries',
  //   'Cosmobrittle Popcorn',
  //   'Marshmallow Scrunchies',
  //   'Swiss Minty Toffee',
  //   'Frutti Sinful Fudge',
  //   'Fruttisparkling Blackberries',
  //   'Marzipan Apricots',
  //   'Butterbutterscotch Toffee',
  //   'Lite Marshmallow Berries',
  //   'Sinful Glotoffee',
  //   'Superjunior Pecans',
  //   'Tastylite Apricots',
  //   'Cocosuckers',
  //   'Nutty Banana Blasts',
  //   'Frosty Boomchocolates',
  //   'Coacodark Bananas'
  // ]

  return Candy.create({
    name: randomName,
    price: Math.floor(Math.random() * 8) + Math.random(),
    weight: '16oz'
  })
}

module.exports = Candy ;