const Destination = require('../models/Destination');

exports.getDestinations = async (req, res, next)=>{
    try{
        const destinations = await Destination.find();
        console.log("getting the infromation from the multiple")
        res.json(destinations);
    }catch(err){
        next(err);
    }
}

exports.getDestination = async (req, res, next)=>{
    try{
        const destination = await Destination.findById(req.params.id)
        if(!destination){
            res.status(404).json({error: "no destination found"});
        }
        console.log("getting the infromation from the single")

        res.status(201).json(destination)
    }catch(err){
        next(err)
    }
}

// the body require (name and price mandatory and also description & location ( review will update after ) to create it)
exports.createDestination = async (req, res, next)=>{
    try{
        const destination = new Destination(req.body);
        await destination.save();
        res.status(201).json(destination);
    }catch(err){
        next(err);
    }
}

exports.updateDestination = async (req, res, next)=>{
    try{
        const updatedDestination = await Destination.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                overwrite: true,
                new: true,               // Return the updated document
                runValidators: true      //make sure that the new upgradation is following the Schema Validation
            }
        )
        if(!updatedDestination){
            res.status(404).json({error: "Error while updating the Destination"})
        }
        res.status(201).json(updatedDestination);
    }catch(err){
        next(err);
    }
}

exports.deleteDestination = async (req, res, next)=>{
    try{
        const destination = await Destination.findById(req.params.id);
        if(!destination){
            res.status(404).json({error: "destinatin not found"})
        }
        await destination.remove();
        res.json({message: "Destination Deleted"});
    }catch(errr){

    }
}