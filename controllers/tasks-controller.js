import Task from "../schemas/task-schema.js";

import { taskValidator } from "../validators/task-validator.js";

class TasksController {
  // tareas por rangos de fechas
  async getTasksByDate(req, res) {
    try {
      const tasks = await this.tasksWithLabel({
        user: req.user.uid,
        active: true,
        isCompleted: false,
        dueDate: {
          $gte: new Date(req.query.start),
          $lt: new Date(req.query.end),
        },
      });
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getTodayTasks(req, res) {
    try {
      const tasks = await this.tasksWithLabel({
        user: req.user.uid,
        active: true,
        isCompleted: false,
        dueDate: {
          $gte: new Date(new Date().setHours(0, 0, 0, 0)),
          $lt: new Date(new Date().setHours(23, 59, 59, 999)),
        },
      });

      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getTasks(req, res) {
    try {
      const tasks = await this.tasksWithLabel({
        user: req.user.uid,
        active: true,
        isCompleted: false,
      });
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getCompletedTasks(req, res) {
    try {
      const tasks = await this.tasksWithLabel({
        user: req.user.uid,
        active: true,
        isCompleted: true,
      });
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

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

  async tasksWithLabel(options) {
    return Task.find(options)
      .populate({
        path: "labels",
        match: { active: true },
      })
      .sort({ dueDate: 1 });
  }
}

export default new TasksController();
