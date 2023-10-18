import expressAsyncHandler from "express-async-handler"
import userModel from "../models/userModel.js";
import { getDecodedToken } from "../utils/jwt.js";
const protect = expressAsyncHandler(async (req, res, next) => {
    console.log('protect');
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(403)
        throw new Error('invalid authHeader');
    }
    const accessToken = authHeader.split(' ')[1];
    console.log(accessToken);
    try {
        const payload = getDecodedToken(accessToken, process.env.ACCESS_SECRET)
        // console.log(payload)
        const { email, _id } = payload;
        console.log({email, _id});
        const foundUser = await userModel.findOne({ email, _id });
        if (!foundUser) {
            res.status(403)
            throw new Error('User Is not Valid');
        }
        // console.log({foundUser});
        req.user = { _id: foundUser._id, email: foundUser.email, userName: foundUser.userName }
        // console.log(req.user);
        next();
    } catch (err) {
        res.status(403);
        throw new Error('ForBidden');
    }
})


export default protect;