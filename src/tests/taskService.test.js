// test
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { PRIORITIES } from "../config/constants";
import Task from "../models/taskModel.js";
import Tag from "../models/tagModel.js";
import * as taskService from "../services/taskService.js";
let mongoServer;

const userId = "123456";

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Task Service", () => {
  let task1;
  let task2;
  let task3;

  beforeEach(async () => {
    await Task.deleteMany({});
    task1 = await taskService.createTask(
      {
        title: "Task 1",
        desc: "Description 1",
        priority: PRIORITIES[0],
        completed: false,
      },
      userId
    );

    task2 = await taskService.createTask(
      {
        title: "Task 2",
        desc: "Description 2",
        priority: PRIORITIES[1],
        completed: false,
      },
      userId
    );

    task3 = await taskService.createTask(
      {
        title: "Task 3",
        desc: "Description 3",
        priority: PRIORITIES[2],
        completed: false,
      },
      userId
    );
  });

  afterEach(async () => {
    await Task.deleteMany({});
  });

  test("Create Task", async () => {
    const task = await taskService.createTask(
      {
        title: "Task 4",
        desc: "Description 4",
        priority: PRIORITIES[0],
        completed: false,
      },
      userId
    );

    expect(task.title).toBe("Task 4");
    expect(task.desc).toBe("Description 4");
    expect(task.priority).toBe(PRIORITIES[0]);
    expect(task.completed).toBe(false);
  });

  test("Get Tasks", async () => {
    const tasks = await taskService.getTasks(userId);

    expect(tasks).toHaveLength(3);
    expect(tasks[0].title).toBe(task1.title);
    expect(tasks[1].title).toBe(task2.title);
    expect(tasks[2].title).toBe(task3.title);
  });

  test("Get Task By Id", async () => {
    const task = await taskService.getTaskById(task1._id, userId);

    expect(task.title).toBe("Task 1");
    expect(task.desc).toBe("Description 1");
    expect(task.priority).toBe(PRIORITIES[0]);
    expect(task.completed).toBe(false);
  });

  test("Update Task", async () => {
    const updatedTask = await taskService.updateTask(
      task1._id,
      {
        title: "Task 1 Updated",
        desc: "Description 1 Updated",
        priority: PRIORITIES[1],
        completed: true,
      },
      userId
    );

    expect(updatedTask.title).toBe("Task 1 Updated");
    expect(updatedTask.desc).toBe("Description 1 Updated");
    expect(updatedTask.priority).toBe(PRIORITIES[1]);
    expect(updatedTask.completed).toBe(true);
  });

  test("Delete Task", async () => {
    let tasks = await taskService.getTasks(userId);

    expect(tasks).toHaveLength(3);
    await taskService.deleteTask(task1._id, userId);

    tasks = await taskService.getTasks(userId);

    expect(tasks).toHaveLength(2);
  });

  test("Activate Task", async () => {
    let tasks = await taskService.getTasks(userId);
    expect(tasks).toHaveLength(3);
    const deletedTask = await taskService.deleteTask(task1._id, userId);
    tasks = await taskService.getTasks(userId);

    expect(tasks).toHaveLength(2);
    const activatedTask = await taskService.activateTask(task1._id, userId);

    expect(activatedTask.title).toBe(deletedTask.title);

    tasks = await taskService.getTasks(userId);

    expect(tasks).toHaveLength(3);
  });

  test("Toggle Task", async () => {
    const toggledTask = await taskService.toggleTask(task1._id, userId);

    expect(toggledTask.completed).toBe(true);
  });
});
