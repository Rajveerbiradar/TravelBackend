const express = require('express');
const connectDB = require('./config/db');
const config = require('./config/config');
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const destinationRoutes = require('./routes/destanationRoutes');
// const reviewRoutes = require('./routes/reviewRoutes');
const errorHandler = require('./middleware/errorHandler')


const app = express();

connectDB();

app.use(express.urlencoded({extended: true}));

app.use(express.json());


app.use('/hello', (req, res)=>{
    res.send("hello world")
})

app.use('/api/users', userRoutes)
// app.use('/api/review', reviewRoutes)
app.use('/api/destination', destinationRoutes)
app.use('/api/payment', paymentRoutes)
app.use('/api/booking', bookingRoutes)

app.use(errorHandler)

const PORT = config.port;

app.listen(PORT, '0.0.0.0', ()=>{
    console.log("server is started on the port :", PORT);
})