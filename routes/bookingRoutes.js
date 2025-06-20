const express = require('express');
const auth = require('../middleware/authMiddleware')
const bookingController = require('../controllers/bookingController')
const router = express.Router();

router.route('/')
    .get(auth, bookingController.getBookings)
    .post(auth, bookingController.createBooking)

router.route('/:id')
    .get(auth, bookingController.getBooking)
    .put(auth, bookingController.updateBooking)
    .delete(auth, bookingController.deleteBooking);

module.exports = router;