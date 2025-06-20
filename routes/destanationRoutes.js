const express = require('express');
const router = express.Router();
const Destination = require('../controllers/destinationController')

router.route('/')
    .get(Destination.getDestinations)
    .post(Destination.createDestination)

router.route('/:id')
    .get(Destination.getDestination)
    .put(Destination.updateDestination)
    .delete(Destination.deleteDestination)

module.exports = router;
