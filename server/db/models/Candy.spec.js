const {expect} = require('chai');
const { db, models: { Candy } } = require('../index');

describe('Candy model', () => {
  it('can create a random user', async () => {
    
    const randomCandy = await Candy.generateRandom();
    console.log(randomCandy);
    expect(randomCandy.name).to.be.ok;
    expect(randomCandy.weight).to.be.ok;
    expect(randomCandy.price).to.be.ok;
  })
})