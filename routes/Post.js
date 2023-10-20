import express from "express";
import {
  createPost,
  deletePost,
  readPost,
  readPosts,
  updatePost,
} from "../controllers/Post.js";

const router = express.Router();

router.route("/").post(createPost);
router.route("/page/:page").get(readPosts);
router.route("/post/:id").get(readPost).patch(updatePost).delete(deletePost);

export default router;
