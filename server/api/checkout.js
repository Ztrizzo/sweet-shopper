const router = require('express').Router();
module.exports = router;
const stripe = require('stripe')(process.env.REACT_APP_SK)
const cors = require("cors")
require('dotenv').config()
router.use(
  cors({
    origin: "http://localhost:5500",
  })
)

router.post("/create-checkout-session", async (req, res) => {
  try {
    //console.log('inside try')
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Sweet Shopper Purchase',
            },
            unit_amount: 20000,
          },
          quantity: 1,
        },
      ],
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `http://localhost:8080/success`,
      cancel_url: `http://localhost:8080/cancel`,
    })
    console.log('--session--', session)
    res.json({url: session.url})
  } 
  catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.get('/success', (req, res) => {
  try {
    res.sendFile(__dirname + '/success.html')
  }
  catch (e) {
    console.log(e)
  }
})

router.get('/cancel', (req, res) => {
  try {
    res.sendFile(__dirname + '/cancel.html')
  }
  catch (e) {
    console.log(e)
  }
})