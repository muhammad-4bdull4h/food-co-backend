import jwt from "jsonwebtoken";
import userModel from "../models/user.Model.js";
import bcrypt from "bcrypt";
import validator from "validator";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRETE);
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "user does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "password is incorrect" });
    }

    const token = createToken(user._id);
    return res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exist = await userModel.findOne({ email: email });
    if (exist) {
      return res.json({ success: false, message: "user already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "invalid email !" });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "please enter strong password",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    if (hashedPass) {
      const user = new userModel({
        name: name,
        email: email,
        password: hashedPass,
      });

      const newUser = await user.save();
      const token = createToken(newUser._id);

      return res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "error" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
};

export { loginUser, registerUser };
