const AppError = require('../utils/appError');

//Error response for development mode
const sendDevError = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};

//Error response for production mode
const sendProdError = (err, res) =>{
    //Operational, trusted error: send message to client 
    if(err.isOperational){
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }
    //Programming or other unknown error: dont leak details to client
    else{
        //1) Log error
        console.error('ERROR ', err);

        //2) Send generic message
        res.status(500).json({
            status: 'error',
            message: 'Something went very wrong!'
        });
    }
};

//Handle CastError method
const handleCastErrors = err => {   
    const message = `Invalid ${err.path}: ${err.stringValue}.`
    return new AppError(message, 400);
};

//Handle Duplicate Key Error method
const handleDuplicateKeyErrors = err => {
    const message = `Duplicate field value: ${err.keyValue[Object.keys(err.keyValue)[0]]}. Please use another ${Object.keys(err.keyValue)[0]}`;
    return new AppError(message, 500);
}

//Handle Validation Error method
const handleValidationError = err => {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'status'

    if(process.env.NODE_ENV === 'development'){
       sendDevError(err, res);
    } else if(process.env.NODE_ENV === 'production') {
        let errCopy = {...err};

        //handle CastErrors
        if(errCopy.kind === "ObjectId") errCopy = handleCastErrors(errCopy);

        //handling duplicate key error
        if(errCopy.code === 11000) errCopy = handleDuplicateKeyErrors(errCopy);

        //handling validation errors
        if(err.stack.includes("ValidationError")) errCopy = handleValidationError(errCopy);

       sendProdError(errCopy, res)
    }    
}