const express = require('express')
const payment = require('../controllers/paymentController')
const auth  = require('../middleware/authMiddleware')
const router = express.Router();

router.route('/')
    .get(auth, payment.getPayments)
    .post(auth, payment.processPayment)

router.route('/:id')
    .get(auth, payment.getPayment)

module.exports = router;
