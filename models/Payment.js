const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    user : {type: mongoose.Schema.Types.ObjectId, ref:'User', require: true},
    booking : {type : mongoose.Schema.Types.ObjectId, ref:'Booking', require:true},
    amount: {type:Number, require:true},
    status: {type: String, default:'pending'},
    createdAt:{type:Date, default:Date.now}
})

module.exports = mongoose.model('Payment', paymentSchema)