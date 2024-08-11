import Task from "../schemas/task-schema.js";

import { taskValidator } from "../validators/task-validator.js";

class TasksController {
  async tasksWithLabel(options = {}) {
    const tasks = await Task.find(options)
      .populate({
        path: "labels",
        match: { active: true },
      })
      .sort({ dueDate: 1 });
    return tasks;
  }

  getTasks = async (req, res) => {
    try {
      const tasks = await this.tasksWithLabel({
        user: req.user.uid,
        active: true,
      });

      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  async getTask(req, res) {
    try {
      const task = await Task.findById(req.params.id, { user: req.user.uid });
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createOrUpdateTask(req, res) {
    try {
      const { error, value } = taskValidator.validate({
        ...req.body,
        user: req.user.uid,
      });
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
      let task;
      if (!req.params.id) {
        const newTask = await Task.create(value);
        task = newTask.toObject();
        delete task.active;
      } else {
        task = await Task.findByIdAndUpdate(req.params.id, value, {
          new: true,
        });
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteTask(req, res) {
    try {
      const removedTask = await Task.findByIdAndUpdate(
        req.params.id,
        { active: false },
        { new: true }
      );

      res.json(removedTask);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async toggleTask(req, res) {
    try {
      const task = await Task.findById(req.params.id);
      const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        { isCompleted: !task.isCompleted },
        { new: true }
      );
      res.json(updatedTask);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async activateTask(req, res) {
    try {
      const task = await Task.findByIdAndUpdate(
        req.params.id,
        { active: true },
        { new: true }
      );
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new TasksController();
