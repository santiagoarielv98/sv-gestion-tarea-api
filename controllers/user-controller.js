import {
  adminGetAuth,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "../config/firebase.js";
import User from "../schemas/user-schema.js";
import { userValidator } from "../validators/user-validator.js";

const auth = getAuth();

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
};

export const validateUser = async (req, res, next) => {
  const { value, error } = userValidator.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.message });
  } else {
    req.body = value;
    next();
  }
};

export const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const newUser = await User.create({ email });
  await adminGetAuth().createUser({
    email: email,
    emailVerified: true,
    password: password,
    uid: newUser._id.toString(),
  });
  res.cookie("access_token", await newUser.getIdToken(), cookieOptions);
  res.status(201).json(newUser);
};

export const authenticateUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    res.cookie(
      "access_token",
      await userCredential.user.getIdToken(),
      cookieOptions
    );
    const user = await User.findById(userCredential.user.uid);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const logoutUser = async (_req, res) => {
  try {
    await signOut(auth);
    res.clearCookie("access_token");
    res.status(200).json({ message: "Sign out successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.user.uid);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const userErrorHandler = (error, _req, res, _next) => {
  console.log("handle", error);
  if (error.code === 11000) {
    res.status(400).json({ message: "Email already exists" });
  } else {
    res.status(400).json({ message: error.message });
  }
};
