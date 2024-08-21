import { adminGetAuth } from "../config/firebase.js";

export const verifyToken = async (req, res, next) => {
  const idToken = req.cookies.access_token;
  
  if (!idToken) {
    return res.status(403).json({ error: "No token provided" });
  }
  try {
    const decodedToken = await adminGetAuth().verifyIdToken(idToken);
    req.user = {
      name: decodedToken.name,
      email: decodedToken.email,
      uid: decodedToken.uid,
    };
    next();
  } catch (error) {
    console.error("Error verifying token", error);
    return res.status(403).json({ error: "Unauthorized" });
  }
};
