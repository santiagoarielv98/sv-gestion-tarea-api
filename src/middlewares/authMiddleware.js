import { AUTH_COOKIE_NAME } from "../config/constants.js";
import { adminGetAuth } from "../config/firebase.js";

export const verifyToken = async (req, res, next) => {
  const idToken = req.cookies[AUTH_COOKIE_NAME];
  if (!idToken) {
    return res.status(403).json({ error: "No token provided" });
  }
  try {
    const decodedToken = await adminGetAuth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Unauthorized" });
  }
};
