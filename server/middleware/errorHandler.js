const errorHandler = (err, req, res,next) => {

    let statusCode = res.statusCode;
    console.log(err.message);

    res.status(statusCode).json({
        message:err.message,
    });
}


export default errorHandler;