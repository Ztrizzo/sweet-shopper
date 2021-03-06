const router = require('express').Router();
const { models: {Candy, User, Tag}} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try{
    const candy = await Candy.findAll({
      include: [Tag]
    });
    res.send(candy);
  }
  catch(err){
    next(err);
  }
})

router.put('/:id', async (req, res, next) => {
  try{ 
    const user = await User.findByToken(req.headers.authorization);
    const requestTags = req.body.selectedTags;
    const tagIds = []

    //find all the ids of the tags that we are sent
    for (let i = 0 ; i < requestTags.length; i++){
      tagIds.push( (await Tag.findOne({where: {name: requestTags[i]}})).dataValues.id )
    }

    //only admins can modify product info
    if(!user.admin)
      res.sendStatus(401);
    else{
      const candy = await Candy.findByPk(req.params.id);
      candy.name = req.body.name;
      candy.price = req.body.price;
      candy.weight = req.body.weight;
      candy.imageUrl = req.body.imageUrl
      await candy.setTags(tagIds);
      await candy.save();
      res.sendStatus(204);
    }
  }
  catch(err){
    next(err);
  }
})

router.post('/', async (req, res, next) => {
  try{
    const user = await User.findByToken(req.headers.authorization);
    const requestTags = req.body.selectedTags;
    const tagIds = []

    //find all the ids of the tags that we are sent
    for (let i = 0 ; i < requestTags.length; i++){
      tagIds.push( (await Tag.findOne({where: {name: requestTags[i]}})).dataValues.id )
    }

    //only admins can create new product
    if(!user.admin)
      res.sendStatus(401);

    const candy = await Candy.create({name: req.body.name, price: req.body.price, weight: req.body.weight, imageUrl: req.body.imageUrl})
    await candy.setTags(tagIds);
    res.sendStatus(201);
  }
  catch(err){
    next(err);
  }
})

router.delete('/:id', async (req, res, next) => {
  try { 
    const user = await User.findByToken(req.headers.authorization);
    
    //only admins can delete a product
    if(!user.admin)
      res.sendStatus(401);

    const candy = await Candy.findByPk(req.params.id);
    await candy.destroy();
    res.sendStatus(204);
  }
  catch(err){
    next(err);
  }
})