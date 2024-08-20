import * as taskService from "../services/taskService.js";

export const createTask = async (req, res) => {
  try {
    console.log(req.user);
    const task = await taskService.createTask(req.body, req.user.uid);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getTasks(req.user.uid);
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.taskId, req.user.uid);
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await taskService.updateTask(req.params.taskId, req.body, req.user.uid);
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await taskService.deleteTask(req.params.taskId, req.user.uid);
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const activateTask = async (req, res) => {
  try {
    const task = await taskService.activateTask(req.params.taskId, req.user.uid);
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const toggleTask = async (req, res) => {
  try {
    const task = await taskService.toggleTask(req.params.taskId, req.user.uid);
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
