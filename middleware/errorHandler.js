const errorHandler = (err, req, res, next)=>{
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
        error: error.message || 'Server Error'
    })
}

module.exports = errorHandler;