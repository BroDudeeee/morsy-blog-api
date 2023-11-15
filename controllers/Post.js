import Post from "../models/Post.js";

const createPost = async (req, res) => {
  try {
    const { title, body, category } = req.body;
    const newPost = new Post({
      title,
      body,
      category,
      image: {
        name: req.file.originalname,
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });

    await newPost.save();
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
  console.log(req.body);
  try {
    const postId = req.params.id;
    const existingPost = await Post.findById(postId);

    if (!existingPost) {
      return res.status(404).json({ msg: "No post Found!" });
    }

    const { title, body, category } = req.body;

    existingPost.title = title;
    existingPost.body = body;
    existingPost.category = category;

    if (req.file) {
      existingPost.image = {
        name: req.file.originalname,
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    await existingPost.save();

    res.status(200).json(existingPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    res
      .status(202)
      .json({ msg: "Deleted Successfully", image: deletedPost.image });
  } catch (error) {
    res.status(500).json(error);
  }
};

export { createPost, readPosts, readPost, updatePost, deletePost };
