import { adminGetAuth, getAuth, signInWithEmailAndPassword, signOut } from "../config/firebase.js";

const auth = getAuth();

export const register = async (email, password, name) => {
  const user = await adminGetAuth().createUser({
    email,
    password,
    displayName: name,
    emailVerified: true,
  });

  return user;
};

export const login = async (email, password) => {
  const user = await signInWithEmailAndPassword(auth, email, password);

  return user;
};

export const logout = async () => {
  await signOut(auth);
};

export const createCustomToken = async (uid) => {
  return await adminGetAuth().createCustomToken(uid);
};
