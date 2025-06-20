const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async ()=>{
    try{
        await mongoose.connect(config.dbUri);
        console.log("Database is sucessfully connected");
        console.log("host Name:", mongoose.connection.host);
        console.log("database Name :", mongoose.connection.name);
        console.log("database connection port number:", mongoose.connection.port);
    
    }catch(err){
        console.log("unable to connect to the Database: ", err);
    }
}

module.exports = connectDB;