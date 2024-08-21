export const PRIORITIES = ["low", "medium", "high", "urgent"];
export const AUTH_COOKIE_NAME = "access_token";

/**
 * @type {import('express').CookieOptions}
 */
export const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "none",
  secure: process.env.NODE_ENV === "production",
};
