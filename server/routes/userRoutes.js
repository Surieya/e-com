import express from "express"
const router = express.Router();
import { registerUser, loginUser, logOutUser, userProfile, updateProfile, handleRefresh } from "../controllers/userController.js";
import protect from "../middleware/protect.js"


router.route('/').post(registerUser);
router.route('/login').post(loginUser);
router.route('/refresh').get(handleRefresh)
router.route('/logout').get(logOutUser);
router.route('/profile').get(protect,userProfile).put(protect,updateProfile);




export default router;