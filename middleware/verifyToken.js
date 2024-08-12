import { adminGetAuth } from "../config/firebase.js";

const verifyToken = async (req, res, next) => {
  const idToken = req.cookies.access_token;
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

export default verifyToken;
