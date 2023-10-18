import express from "express";
import protect from "../middleware/protect.js";
import {
    createSingleProduct,
    getAllProducts,
    getSingleProduct,
    editSingleProduct,
    deleteSingleProduct
} from "../controllers/productController.js";
const router = express.Router();


router.route('/').get(getAllProducts).post(createSingleProduct);
router.route('/test').get(protect,getAllProducts);
router.route('/:id').get(getSingleProduct).put(protect,editSingleProduct).delete(protect,deleteSingleProduct);





export default router;