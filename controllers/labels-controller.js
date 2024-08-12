import Label from "../schemas/label-schema.js";
import Task from "../schemas/task-schema.js";

export const getLabels = async (req, res) => {
  const userId = req.user.uid;
  try {
    const labels = await Label.find({ user: userId, active: true });
    res.status(200).json(labels);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getLabel = async (req, res) => {
  const userId = req.user.uid;
  const { id } = req.params;
  try {
    const label = await Label.findOne({ _id: id, user: userId, active: true });
    if (!label) {
      return res.status(404).json({ message: "Label not found" });
    }

    res.status(200).json(label);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createLabel = async (req, res) => {
  const userId = req.user.uid;
  const label = req.body;
  try {
    const newLabel = await (await Label.create({ ...label, user: userId })).toJSON();
    delete newLabel.active;
    delete newLabel.user;
    res.status(201).json(newLabel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateLabel = async (req, res) => {
  const userId = req.user.uid;
  const { id } = req.params;
  const { label } = req.body;
  try {
    const updatedLabel = await Label.findOneAndUpdate({ _id: id, user: userId, active: true }, label, { new: true });
    if (!updatedLabel) {
      return res.status(404).json({ message: "Label not found" });
    }

    res.status(200).json(updatedLabel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteLabel = async (req, res) => {
  const userId = req.user.uid;
  const { id } = req.params;
  try {
    const label = await Label.findOneAndUpdate({ _id: id, user: userId, active: true }, { active: false });
    if (!label) {
      return res.status(404).json({ message: "Label not found" });
    }

    res.status(200).json({ message: "Label deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const activateLabel = async (req, res) => {
  const userId = req.user.uid;
  const { id } = req.params;
  try {
    const label = await Label.findOneAndUpdate({ _id: id, user: userId }, { active: true });
    if (!label) {
      return res.status(404).json({ message: "Label not found" });
    }

    res.status(200).json({ message: "Label activated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
