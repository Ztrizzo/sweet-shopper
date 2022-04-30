const router = require('express').Router();
const { models: {Candy}} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try{
    const candy = await Candy.findAll();
    res.send(candy);
  }
  catch(err){
    next(err);
  }
})