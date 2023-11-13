import expressAsyncHandler from "express-async-handler"
import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken";
import { getAccessToken,getRefreshToken ,getDecodedToken} from "../utils/jwt.js";


const registerUser = expressAsyncHandler(async (req, res) => {
    // console.log('register User');
    const { userName, email, password} = req.body;
    if (!userName || !email || !password) {
        res.status(400)
        throw new Error("Please Provide All the Necessary Details");
    }
    const userExist = await userModel.find({
        $or: [
            { email: email },
            { userName: userName }
        ]
    })
    // console.log(userExist);
    if (userExist.length) {
        res.status(409);
        throw new Error("User With this Email or userName already Exist");
    }

    const user = await userModel.create({
        userName,
        email,
        password,
    })

    if (!user) {
        res.status(500);
        throw new Error('Oops SomeThing went Wrong');
    }

  
    return res.status(201).json({
        id:user._id,
        userName: user.userName,
        email: user.email,
    })

    // console.log('register user');
})

const loginUser = expressAsyncHandler(async(req, res) => {
    // res.status(200).send('Login User')
    //Don't allow to login again once logged in,
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400)
        throw new Error('Please provide the credentials')
    }
    const user = await userModel.findOne({ email });
    // console.log(user);
    if (!user) {
        res.status(401);
        throw new Error('Please Register before Logging in')
    }
    if (!await user.checkPassword(password)) {
        res.status(401);
        throw new Error('Sorry.... Your password is Incorrect');
    }
    const accessToken = getAccessToken(user._id, user.email)
    const refreshToken = getRefreshToken(user.email)

    user.refreshToken = [...user.refreshToken,refreshToken];//for multiple login
    await user.save();

    res.cookie('jwt', refreshToken, {
        httpOnly: true, //accessible only by web server 
        secure: true, //https
        sameSite: 'None', //cross-site cookie 
        maxAge: 3 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
    })
    //  console.log('login');
    // console.log(user)

    return res.status(200).json({
        id:user._id,
        userName: user.userName,
        email: user.email,
        token:accessToken
    })
   

})


const logOutUser = expressAsyncHandler(async (req, res) => {
    //on CLient delete access Token
    // console.log('logout user')
    console.log('logout user');
    const cookies = req.cookies;
    const refreshToken = cookies.jwt;
    // console.log(refreshToken);
    if (!cookies?.jwt) {
        res.status(204);
        throw new Error('Please Login First')
    }
    const userExist = await userModel.findOne({refreshToken})
    
    //If user not found in DB(Means refresh token got is by someone)
    if (!userExist) {
        res.clearCookie('jwt',{httpOnly:true,sameSite:'None',secure:true})
        res.status(403);
        throw new Error('ForBidden');
    }

    //Delete refreshToken in DB(only for the current device)
    userExist.refreshToken = userExist.refreshToken.filter((rt) => rt !== refreshToken);
    const result = await userExist.save();
    // console.log(result);
    res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 3 * 24 * 60 * 60 * 1000
    })

    return res.status(200).json({
        message:"Logged Out"
    })


})


const handleRefresh = expressAsyncHandler(async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        res.status(401);
        throw new Error('No Refresh Token present');
    }
    const refreshToken = cookies.jwt;
    // res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });


    const foundUser = await userModel.findOne({ refreshToken });

    //Detected refresh token reuse
    if (!foundUser) { 
        try {
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
            const hackedUser = await userModel.findOne({ userName: decoded.userName });
            hackedUser.refreshToken = [];
            const result = await hackedUser.save();
            // console.log(result);
        
        }
        catch (err) {
            res.status(403)
            throw new Error('Forbidden user not exist');
        }
        res.status(403); //Forbidden
        throw new Error('user not found');
        
    }

    const newRefreshTokenArray = foundUser.refreshToken.filter((rt) => rt !== refreshToken);


    //evaluate jwt;
    try {
        const decode = jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET
        );
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true ,maxAge: 3 * 24 * 60 * 60 * 1000});
        //if not expired then provide new accessToken,store new refresh token in DB
         const accessToken = getAccessToken(foundUser._id, foundUser.email)
        const newRefreshToken = getRefreshToken(decode.email);

        foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        const result = await foundUser.save();

        res.cookie('jwt', newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite:'none'
        })

        res.status(200).json({
            token:accessToken,
        })
        

    } catch (err) {
        // console.log('Token Expired');
        foundUser.refreshToken = [...newRefreshTokenArray];
        const result = await foundUser.save();
        res.status(400); //Forbidden
        throw new Error('Token Expired');
        // console.log(res);
    }

})

//Protected Routes
const userProfile = expressAsyncHandler((req, res) => {
    res.status(200).json({
        userName: req.user.userName,
        email:req.user.email,
    })
})

const updateProfile = expressAsyncHandler(async (req, res) => {
    const { _id, email } = req.user;
    // console.log(req.user)
    const user = await userModel.findOne({ _id });
    if (user) {
        user.userName = req.body.userName || user.userName;
        user.email = req.body.email || user.email;
    }
    if (req.body.password) {
        user.password = req.body.password;
    }
    // console.log(user);
    const result = await user.save();
    return res.status(200).json({
        _id:result._id,
        userName: result.userName,
        email: result.email,
    })
})


export { registerUser,loginUser,logOutUser,userProfile,updateProfile,handleRefresh} 