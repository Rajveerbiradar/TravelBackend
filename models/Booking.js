const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user : {type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true},
    destination : { type: mongoose.Schema.Types.ObjectId, ref: 'Destination', require: true},
    bookingDate : {type: Date, require: true},
    createdAt : {type: Date, default:Date.now}
});

module.exports = mongoose.model('Booking', bookingSchema);