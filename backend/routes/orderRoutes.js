import express from "express";
import {
    addOrderItems
} from "../controller/orderContoller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, addOrderItems);


export default router;
