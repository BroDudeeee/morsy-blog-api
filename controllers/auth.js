import User from "../models/User.js";
import bcrypt from "bcrypt";

const login = async (req, res) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) return res.status(400).json({ msg: "No User with this name" });

    const check = bcrypt.compareSync(req.body.password, user.password);
    if (!check) return res.status(403).json({ msg: "Wrong Password" });

    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const register = async (req, res) => {
  let hashPass = "";
  if (req.body.password) {
    hashPass = bcrypt.hashSync(req.body.password, 10);
  }
  try {
    const { password, ...others } = req.body;
    const newUser = await User.create({ ...others, password: hashPass });
    return res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

export { login, register };
