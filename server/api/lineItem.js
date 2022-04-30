const router = require('express').Router();
const { route } = require('express/lib/application');
const { models: {LineItem, Cart, Candy, User}} = require('../db');
module.exports = router;

router.put('/:id', async(req,res,next)=>{
    try{
        const line = await LineItem.findByPk(req.params.id);
        res.send(await line.update(req.body));
    }
    catch(err){
        next(err);
    }
});

router.post('/', async(req,res,next)=>{
    try{
        const newLine = await LineItem.create({...req.body});
        res.status(201).send(newLine);
    }
    catch(err){
        next(err);
    }
});

router.delete('/:id', async (req, res, next ) => {
    try {
        if(req.headers.authorization !== 'guest'){
            await User.findByToken(req.headers.authorization);
        }
        const lineItem = await LineItem.findByPk(req.params.id);
        await lineItem.destroy()
        const cart = await Cart.findOne({
            where: {
              id: lineItem.cartId
            },
            include: [{
              model: LineItem, include: [{
                model: Candy
              }]
            }]
          })
        res.send(cart)
        
    }
    catch (err) {
        console.log(err)
    }
})
