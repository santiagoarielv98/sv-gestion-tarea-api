import { adminGetAuth, getAuth, signInWithEmailAndPassword, signOut } from "../config/firebase.js";
import User from "../schemas/user-schema.js";

const auth = getAuth();

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await User.create({ email, name });
    const data = await adminGetAuth().createUser({
      email: email,
      emailVerified: true,
      password: password,
      uid: newUser._id.toString(),
      displayName: name,
    });
    const token = await adminGetAuth().createCustomToken(data.uid);

    res.cookie("access_token", token, cookieOptions);

    res.status(201).json(newUser);
  } catch (error) {
    // duplicate email
    if (error.code === 11000) {
      res.status(400).json({ message: "Email already exists" });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};
export const authenticateUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    res.cookie("access_token", await userCredential.user.getIdToken(), cookieOptions);
    const user = await User.findById(userCredential.user.uid);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    if (error.code === "auth/invalid-credential") {
      res.status(400).json({ message: "Invalid email or password" });
    } else if (error.code === "auth/user-disabled") {
      res.status(400).json({ message: "User is disabled" });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};
export const logoutUser = async (req, res) => {
  try {
    if (!req.cookies.access_token) {
      res.status(400).json({ message: "No user logged in" });
    }
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
