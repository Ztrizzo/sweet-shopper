const router = require('express').Router();
const { models: {Cart, LineItem, Candy}} = require('../db');
const User = require('../db/models/User');
module.exports = router;

router.get('/', async (req, res, next) => {
  try{
    const user = await User.findByToken(req.headers.authorization);
    const cart = await Cart.findOne({
      include:[
        {model: LineItem, include: [Candy]}
      ],
      where: {
        userId: user.id,
        isPurchased: false
      }
    })
    res.send(cart);
  }
  catch(err){
    if (err.status === 401){
      res.sendStatus(401);
    }
    else
      next(err);
  }
})

router.get('/complete', async (req, res, next) => {
  try{
    const user = await User.findByToken(req.headers.authorization);
    const carts = await Cart.findAll({
      include:[
        {model: LineItem, include: [Candy]}
      ],
      where: {
        userId: user.id,
        isPurchased: true
      }
    })
    res.send(carts);
  }
  catch(err){
    if (err.status === 401){
      res.sendStatus(401);
    }
    else
      next(err);
  }
})

router.get('/:id',async(req,res,next)=>{
  try{
    //validating user
    if(req.headers.authorization !== 'guest')
      await User.findByToken(req.headers.authorization);

    const cart = await Cart.findOne({
      where: {
        id: req.params.id,
        isPurchased: false
      },
      include: [{
        model: LineItem, include: [{
          model: Candy
        }]
      }]
    });
    
    res.send(cart);
  }
  catch(err){
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try{
    //validating user
    let user;
    if(req.headers.authorization !== 'guest'){
      user = (await User.findByToken(req.headers.authorization));
    }
    
    const id = user ? user.id : null;

    const cart = await Cart.create({userId: id},{
      include: [{
        model: LineItem, include: [{
          model: Candy
        }]
      }]
    });

    res.send(cart);
  }
  catch(err){
    next(err);
  }
})

router.put('/:id', async(req,res,next)=>{
  try{
      const cart = await Cart.findByPk(req.params.id);
      res.send(await cart.update(req.body));
  }
  catch(err){
      next(err);
  }
});