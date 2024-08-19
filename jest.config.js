/** @type {import('jest').Config} */
const config = {
  verbose: true,
  transform: {},
  preset: "@shelf/jest-mongodb",
  setupFiles: ["./src/tests/setupTests.js"],
};

export default config;
