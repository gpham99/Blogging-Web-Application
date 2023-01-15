import express from "express";
import blogCtrl from "../controllers/blogCtrl.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/blog", auth, blogCtrl.createBlog);
router.get("/home/blogs", blogCtrl.getHomeBlogs);

export default router;
