const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    User: {type: mongoose.Schema.Types.ObjectId, ref: 'User',require: true},
    Destination : {type: mongoose.Schema.Types.ObjectId, ref: 'Destination',require: true},
    rating : {type: number, require:true, min:1, max:5},
    Review: {type: String, require: true},
    createdAt: {type: Date, default:Date.now}
})

const theModel = new mongoose.model('Review', schema);
