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
