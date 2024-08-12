import { isValidObjectId } from "mongoose";
import Task from "../schemas/task-schema.js";

export const getTasks = async (req, res) => {
  const userId = req.user.uid;
  try {
    const tasks = await Task.find({ user: userId, active: true });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTask = async (req, res) => {
  const userId = req.user.uid;
  const { id } = req.params;
  try {
    const task = await Task.findOne({ _id: id, active: true, user: userId });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createTask = async (req, res) => {
  const userId = req.user.uid;
  const task = req.body;
  try {
    const newTask = await Task.create({ ...task, user: userId });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  const userId = req.user.uid;
  const { id } = req.params;
  const { task } = req.body;
  try {
    const updatedTask = await Task.findOneAndUpdate({ _id: id, active: true, user: userId }, task, {
      new: true,
    });
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  const userId = req.user.uid;
  const { id } = req.params;
  try {
    const deletedTask = await Task.findOneAndUpdate(
      { _id: id, active: true, user: userId },
      { active: false },
      {
        new: true,
      }
    );

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const activateTask = async (req, res) => {
  const userId = req.user.uid;
  const { id } = req.params;
  try {
    const task = await Task.findOneAndUpdate(
      { _id: id, active: false, user: userId },
      { active: true },
      {
        new: true,
      }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
