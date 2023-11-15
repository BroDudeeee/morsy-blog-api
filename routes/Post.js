import express from "express";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

import {
  createPost,
  deletePost,
  readPost,
  readPosts,
  updatePost,
} from "../controllers/Post.js";

const router = express.Router();

router.post("/", upload.single("image"), createPost);
router.route("/page/:page").get(readPosts);
router
  .route("/post/:id")
  .get(readPost)
  .patch(upload.single("image"), updatePost)
  .delete(deletePost);

export default router;
