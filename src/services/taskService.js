import Task from "../models/taskModel.js";

const populateOptions = {
  path: "tags",
  match: { active: true },
};

export const createTask = async (task, userId) => {
  return await Task.create({ ...task, user: userId });
};

export const getTasks = async (userId) => {
  return await Task.find({ user: userId, active: true }).populate(populateOptions);
};

export const getTaskById = async (taskId, userId) => {
  return await Task.findOne({ _id: taskId, user: userId, active: true }).populate(populateOptions);
};

export const updateTask = async (taskId, task, userId) => {
  return await Task.findOneAndUpdate({ _id: taskId, user: userId, active: true }, task, {
    new: true,
  });
};

export const deleteTask = async (taskId, userId) => {
  return await Task.findOneAndUpdate(
    { _id: taskId, user: userId, active: true },
    { active: false },
    {
      new: true,
    }
  );
};

export const activateTask = async (taskId, userId) => {
  return await Task.findOneAndUpdate(
    { _id: taskId, user: userId, active: false },
    { active: true },
    {
      new: true,
    }
  );
};

export const toggleTask = async (taskId, userId) => {
  const task = await Task.findOne({ _id: taskId, user: userId, active: true });
  task.completed = !task.completed;

  return await task.save();
};
