const Payment = require('../models/Payment')
const Booking = require('../models/Booking')

exports.processPayment = async (req,res, next) =>{
    try{
        const {bookingId, amount} = req.body;
        if(!bookingId || !amount){
            res.status(404).json({error: "incomplete credentials"});
        }
        const booking = await Booking.findById(bookingId);
        if(!booking){
            res.status(404).json({error: "Booking not found"});
        }
        if(booking.user.toString() !== req.user._id.toString()){
            res.status(403).json({error: "unauthorised"});
        }

        // if the payment is sucessful
        console.log(bookingId, amount)
        const payment =  new Payment({
            user: req.user._id,
            booking: bookingId,
            amount,
            status: 'completed'
        })
        await payment.save()
        res.status(200).json({
            message: "Payment Processed", 
            payment
        });

    }catch(err){
        next(err)
    }
}

exports.getPayments = async (req,res, next) =>{
    try{
        const payment = await Payment.find({user : req.user._id})
        if(!payment){
            res.status(404).json({error: "Payments not found"})
        }
        res.status(200).json({
            message: "this are the payments made by you", 
            payment
        })
    }catch(err){
        next(err)
    }
}

exports.getPayment = async (req, res, next)=>{
    try{
        
        const payment = await Payment.findById(req.params.id).populate([
            {
                path : 'user',
                
            },
            {
                path: 'booking',
                populate : {
                    path : 'destination'
                }
            }
        ]);
        if(!payment){
            res.status(400).json({error: "invalid request"});
        }
        if(payment.user._id.toString() !== req.user._id.toString()){
            res.status(401).json({error: "Unauthorized"})
        }
        res.status(200).json({
            message: "request sucessful", 
            payment
        })

    }catch(err){
        next(err)
    }
}