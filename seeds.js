import { adminGetAuth } from "./src/config/firebase.js";
import Tag from "./src/models/tagModel.js";
import Task from "./src/models/taskModel.js";
import * as tagService from "./src/services/tagService.js";
import * as taskService from "./src/services/taskService.js";
import { createTaskSchema } from "./src/utils/validationSchemas.js";

const tags = ["tag1", "tag2", "tag3", "tag4"];

const tasks = [
  {
    title: "Task 1",
    desc: "Description 1",
  },
  {
    title: "Task 2",
    desc: "Description 2",
  },
  {
    title: "Task 3",
    desc: "Description 3",
  },
];

const credentials = {
  email: "demo@sv-dev.tech",
  password: "123456",
};

export const seeds = async () => {
  const demoUser = await adminGetAuth()
    .getUserByEmail(credentials.email)
    .catch(() => null);

  if (demoUser) {
    // eliminar todas las tareas
    await Task.deleteMany({
      user: demoUser.uid,
    });

    console.log("Tasks deleted");
    // eliminar todas las etiquetas
    await Tag.deleteMany({
      user: demoUser.uid,
    });
    console.log("Tags deleted");
    await adminGetAuth().revokeRefreshTokens(demoUser.uid);
    console.log("Refresh tokens revoked");
    await adminGetAuth().deleteUser(demoUser.uid);
    console.log("User deleted");
  }

  // crear usuario admin
  const user = await adminGetAuth().createUser({
    email: credentials.email,
    password: credentials.password,
    displayName: "Demo",
    emailVerified: true,
  });
  console.log("User created");

  // crear etiquetas
  const createTags = await Promise.all(tags.map(async (tag) => tagService.createTag({ title: tag }, user.uid)));
  console.log("Tags created");

  // crear tareas
  await Promise.all(
    tasks.map(async (task, index) => {
      const { title, desc } = task;
      const tags = createTags.slice(index, index + 2).map((tag) => tag._id.toString());

      const { error, value } = createTaskSchema.validate({ title, desc, tags });
      if (error) {
        console.log(error);
        throw new Error(error);
      }
      await taskService.createTask(value, user.uid);
    })
  );
  console.log("Tasks created");

  console.log("Seed completed");
};
