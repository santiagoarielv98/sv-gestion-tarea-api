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
    res.status(400).json({ message: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user } = await authService.login(email, password);

    res.cookie(AUTH_COOKIE_NAME, await user.getIdToken(), cookieOptions);

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const signOutUser = async (req, res) => {
  try {
    await authService.signOut();
    res.clearCookie(AUTH_COOKIE_NAME);
    res.status(200).json({ message: "User signed out successfully" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
