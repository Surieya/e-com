import express from "express";
import protect from "../middleware/protect.js";
const router = express.Router()
import {
    paymentController
} from "../controllers/paymentController.js"


router.route('/').post(protect, paymentController);

export default router