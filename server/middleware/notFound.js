import expressAsyncHandler from "express-async-handler";

const notFound = (req, res,next) => {
    const error = new Error('Not Found');
    res.status(404);
    next(error);
}






export default notFound;