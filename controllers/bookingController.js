const Destination = require('..//models/Destination');
const Booking = require('..//models/Booking');

exports.createBooking = async (req, res, next)=>{
    try{
        const {destinationId, bookingDate} = req.body;
        if(!destinationId || !bookingDate){
            return res.status(400).json({error: 'all fields not available'});
        }
        const destination = await Destination.findById(destinationId);
        if(!destination){
            return res.status(404).json({error: 'destination not found'});
        }

        const booking = new Booking({
            user : req.user._id,
            destination : destinationId,
            bookingDate : bookingDate
        })
        booking.save();
        res.status(201).json(booking);

    }catch(err){
        next(err)
    }
}

exports.getBookings = async (req, res, next)=>{
    try{
        const bookings = await Booking.find({ user: req.user._id}).populate('destination');
        res.json(bookings);
    }catch(err){
        next(err);
    }
}

exports.getBooking = async (req,res, next) =>{
    try{
        const booking = await Booking.findById(req.params.id).populate('destination');
        if(!booking){
            res.status(404).json({error: "no booking found"})
        }
        if(booking.user.toString() !== req.user._id.toString()){
            res.status(403).json({error: "unauthorized"});
        }
        res.json(booking);
    }catch(err){
        next(err);
    }
}

exports.updateBooking = async (req, res, next) => {
    try{
        const booking = await Booking.findById(req.params.id)
        if(!booking){
            res.status(404).json({error: "Booking not found"});
        }
        if(booking.user.toString() !== req.user._id.toString()){
            res.status(403).json({error: "Unauthorized"});
        }
        const update_booking = await Booking.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                overwrite : true,
                new : true,
                runValidators : true
            }
        )

        res.status(201).json({update_booking});
    }catch(err){
        next(err);
    }
}


exports.deleteBooking = async (req, res, next) => {
    try{
        const booking = await Booking.findById(req.params.id);
        if(!booking){
            res.status(404).json({error: "Booking not found"});
        }
        if(booking.user.toString() !== req.user._id.toString()){
            res.status(403).json({error : "Unauthorised"});
        }

        const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
        res.status(201).json({
            status: "Booking Removed Sucessfully ",
            deletedBooking 
        })
    }catch(err){
        next(err);
    }
}