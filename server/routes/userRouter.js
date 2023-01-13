import express from "express";
import auth from "../middleware/auth.js";
import userCtrl from "../controllers/userCtrl.js";

const router = express.Router();

router.patch("/user", auth, userCtrl.updateUser);

export default router;
