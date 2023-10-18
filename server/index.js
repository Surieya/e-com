import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import stripe from 'stripe'
import connectDB from "./config/db.js";
import notFound from "./middleware/notFound.js"
import errorHandler from "./middleware/errorHandler.js";
import userRoutes from "./routes/userRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cartRoutes from "./routes/cartRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js"
dotenv.config();
const app = express();
connectDB();
const allowedOrigins = [
    'http://localhost:5173'
]

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }, 
    credentials: true,
    optionsSuccessStatus: 200
}

const port = process.env.PORT || 4500;
//Add stripe key 
stripe(process.env.STRIPE_PUBLISHABLE_KEY)
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/api/user', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use("/api/payment",paymentRoutes)

app.get('/', (req,res,next) => {

    // res.status(200).send("Server Ready");
    res.status(404)
    next(new Error('NotFound'))
})

app.use(notFound);
app.use(errorHandler)



app.listen(port, () => {
    console.log(`server is listening at port ${port}`);
})