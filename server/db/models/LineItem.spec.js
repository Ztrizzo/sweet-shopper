const {expect} = require('chai');
const { db, models: { LineItem, Candy } } = require('../index');



describe('Line Item model', () => {
  it('has a virtual field that works', async () => {
    const candy = await Candy.create({name: 'testCandy', price: 1, weight: '3'});
    const li = await LineItem.create({qty: 5, candyId: candy.id});

    expect(await li.totalPrice).to.equal(candy.price * li.qty);
  })
})