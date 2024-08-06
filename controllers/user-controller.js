import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
  adminGetAuth,
} from "../config/firebase.js";
import User from "../schemas/user-schema.js";

const auth = getAuth();

class UserController {
  async registerUser(req, res) {
    const { email, password } = req.body;
    try {
      const newUser = await User.create({ email });
      await adminGetAuth().createUser({
        email: email,
        emailVerified: true,
        password: password,
        uid: newUser._id.toString(),
      });

      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  async authenticateUser(req, res) {
    const { email, password } = req.body;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      res.cookie("access_token", await userCredential.user.getIdToken(), {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      const user = await User.findById(userCredential.user.uid);
      if (!user) {
        res.status(404).json({ message: "User not found" });
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  async logoutUser(_req, res) {
    try {
      await signOut(auth);
      res.clearCookie("access_token");
      res.status(200).json({ message: "Sign out successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  async checkAuth(req, res) {
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
  }
}

export default new UserController();
