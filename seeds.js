import { adminGetAuth } from "./config/firebase.js";
import Task from "./schemas/task-schema.js";
import Label, { colorEnum } from "./schemas/label-schema.js";
import User from "./schemas/user-schema.js";
import connectDB from "./config/mongo.js";
import fs from "node:fs";
// import LABEL_MOCK from "./mocks/LABELS_MOCK_DATA.json";
// import TASK_MOCK from "./mocks/TASKS_MOCK_DATA.json";

const seeds = async () => {
  try {
    const LABEL_MOCK = JSON.parse(
      fs.readFileSync("./mocks/LABELS_MOCK_DATA.json", "utf8")
    );
    const TASK_MOCK = JSON.parse(
      fs.readFileSync("./mocks/TASKS_MOCK_DATA.json", "utf8")
    );

    const data = await adminGetAuth().listUsers();
    await adminGetAuth().deleteUsers(data.users.map((user) => user.uid));
    console.log("Deleted all users");

    await connectDB();

    await User.deleteMany({});
    console.log("Deleted all users");
    await Label.deleteMany({});
    console.log("Deleted all labels");
    await Task.deleteMany({});
    console.log("Deleted all tasks");

    const userCredentials = {
      email: "demo@sv-dev.tech",
      password: "123456",
    };

    const newUser = await User.create({ email: userCredentials.email });

    /* const userRecord = */ await adminGetAuth().createUser({
      ...userCredentials,
      uid: newUser._id.toString(),
      emailVerified: true,
    });

    const createLabels = await Promise.all(
      LABEL_MOCK.map(
        async (label) =>
          await Label.create({
            ...label,
            user: newUser._id.toString(),
          })
      )
    );

    await Promise.all(
      TASK_MOCK.map(
        async (task) =>
          await Task.create({
            ...task,
            user: newUser._id.toString(),
            labels: getRandomValuesFromArray(
              createLabels,
              Math.floor(Math.random() * 5)
            ).map((createLabels) => createLabels._id.toString()),
          })
      )
    );
    console.log("Seeds created");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

function getRandomValuesFromArray(array, n) {
  return array.sort(() => Math.random() - Math.random()).slice(0, n);
}

seeds();
