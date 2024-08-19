import { AUTH_COOKIE_NAME } from "../config/constants.js";
import * as authService from "../services/authService.js";

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
};

export const signUp = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const user = await authService.register(email, password, name);

    const token = await authService.createCustomToken(user.uid);

    res.cookie(AUTH_COOKIE_NAME, token, cookieOptions);

    res.status(201).json(user);
  } catch (error) {
    // res.status(400).json({ message: error.message });
    switch (error.code) {
      case "auth/email-already-exists":
        // res.status(400).json({ message: "El correo electrónico ya está registrado." });
        res.status(400).json({ message: "The email address is already in use by another account." });
        break;
      case "auth/invalid-email":
        res.status(400).json({ message: "The email address is badly formatted." });
        break;
      case "auth/weak-password":
        res.status(400).json({ message: "The password must be 6 characters long or more." });
        break;
      default:
        res.status(500).json({ message: "Error creating user.", error: error.message });
    }
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user } = await authService.login(email, password);

    res.cookie(AUTH_COOKIE_NAME, await user.getIdToken(), cookieOptions);

    res.status(200).json(user);
  } catch (error) {
    switch (error.code) {
      case "auth/user-not-found":
        res
          .status(404)
          .json({
            message: "There is no user record corresponding to this identifier. The user may have been deleted.",
          });
        break;
      case "auth/invalid-email":
        res.status(400).json({ message: "The email address is badly formatted." });
        break;
      case "auth/wrong-password":
        res.status(401).json({ message: "The password is invalid or the user does not have a password." });
        break;
      default:
        res.status(500).json({ message: "Error signing in.", error: error.message });
    }
  }
};

export const signOut = async (req, res) => {
  try {
    await authService.signOut();
    res.clearCookie(AUTH_COOKIE_NAME);
    res.status(200).json({ message: "User signed out successfully" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const check = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
