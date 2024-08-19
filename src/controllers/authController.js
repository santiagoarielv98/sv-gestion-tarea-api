import { AUTH_COOKIE_NAME } from "../config/constants.js";
import { adminGetAuth, getAuth, signInWithEmailAndPassword, signOut } from "../config/firebase.js";

const auth = getAuth();

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
};

export const signUp = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const user = await adminGetAuth().createUser({
      email,
      password,
      displayName: name,
      emailVerified: true,
    });

    const token = await adminGetAuth().createCustomToken(user.uid);

    req.cookies(AUTH_COOKIE_NAME, token, cookieOptions);

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user } = await signInWithEmailAndPassword(email, password);

    res.cookie(AUTH_COOKIE_NAME, await user.getIdToken(), cookieOptions);

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const signOutUser = async (req, res) => {
  try {
    await signOut(auth);
    res.clearCookie(AUTH_COOKIE_NAME);
    res.status(200).json({ message: "User signed out successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
