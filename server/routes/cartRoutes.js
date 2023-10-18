import express from "express"
import protect from "../middleware/protect.js";
const router = express.Router();
import {
    // createCart,
    getCart,
    updateProduct,
    addProduct

} from "../controllers/cartController.js"

router.route('/').get(protect, getCart)
router.route('/:proId').put(protect, updateProduct).post(protect, addProduct)


export default router;