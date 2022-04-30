const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'));
router.use('/candy', require('./candy'));
router.use('/cart', require('./cart'));
router.use('/lineItem',require('./lineItem'));

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
