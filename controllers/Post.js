import Post from "../models/Post.js";

const createPost = async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

const readPosts = async (req, res) => {
  const { page } = req.params;
  try {
    const posts = await Post.find({})
      .limit(20)
      .skip((Number(page) - 1) * 20)
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
};

const readPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(400).json("No Post Found");
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updatePost = async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json("Updated Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(202).json("Deleted Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

export { createPost, readPosts, readPost, updatePost, deletePost };
