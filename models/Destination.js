const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
    name : { type: String, require: true},
    description : String,
    location : String,
    review: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    price : {type: Number, require: true},
    createdAt : {type:Date, default: Date.now}
})

module.exports = mongoose.model('Destination', destinationSchema);