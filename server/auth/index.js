const router = require("express").Router();
const {
  models: { User, Cart, LineItem },
} = require("../db");
module.exports = router;

router.post("/login", async (req, res, next) => {
  try {
    
    const { username, password, guestCart } = req.body;

    //This block of code finds the user's cart, and the guest cart they were using,
    //then emptys the guest cart into the user's cart.
    const token = await User.authenticate({username, password});
    const user = await User.findByToken(token);

    const userCart = await Cart.findOne({
      where:{
        userId: user.id,
        isPurchased: false
      }
    })
    const guestCartToEmpty = await Cart.findOne({
      where: {
        id: guestCart,
        isPurchased: false
      },
      include: [LineItem]
    })
    guestCartToEmpty?.dataValues.lineitems.forEach(async(lineItem) => {
      
      lineItem.update({
        cartId: userCart.id
      })
      
    })
    
    res.send({ token });
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const { username, password, guestCart, firstName, lastName, email } = req.body;
    const user = await User.create({username, password, firstName, lastName, email});
    await Cart.create({ userId: user.id });
    
    //This block of code finds the user's cart, and the guest cart they were using,
    //then emptys the guest cart into the user's cart.
    const userCart = await Cart.findOne({
      where:{
        userId: user.id
      }
    });
    const guestCartToEmpty = await Cart.findOne({
      where: {
        id: guestCart
      },
      include: [LineItem]
    });
    guestCartToEmpty?.dataValues.lineitems.forEach(async(lineItem) => {
      
      lineItem.update({
        cartId: userCart.id
      })
      
    })


    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.put('/', async (req, res, next) => {
  try{
    let user = await User.findByToken(req.headers.authorization);
    user.username = req.body.username;
    user.email = req.body.email;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    await user.save()
    res.send(user);
  }
  catch(error){
    next(error);
  }
})

router.put('/:id', async (req, res, next) => {
  try{
    const admin = await User.findByToken(req.headers.authorization);

    //user must be an admin to use this route
    if(!admin.admin){
      res.sendStatus(401)
    }
    else{
      const user = User.findById(req.body.id);
      res.send(user);
    }

    
  }
  catch(error){
    next(error);
  }
})

router.get("/me", async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});
