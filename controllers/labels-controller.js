import Label from "../schemas/label-schema.js";
import Task from "../schemas/task-schema.js";

import { labelValidator } from "../validators/label-validator.js";

class LabelsController {
  async getLabels(req, res) {
    try {
      const labels = await Label.find({
        active: true,
        user: req.user.uid,
      });
      res.json(labels);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getLabel(req, res) {
    try {
      const label = await Label.findById(req.params.id, {
        active: true,
        user: req.user.uid,
      });
      res.json(label);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createOrUpdateLabel(req, res) {
    try {
      const { error, value } = labelValidator.validate({
        ...req.body,
        user: req.user.uid,
      });
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
      let label;
      if (!req.params.id) {
        const newLabel = await Label.create(value);
        label = newLabel.toObject();
        delete label.active;
      } else {
        label = await Label.findByIdAndUpdate(req.params.id, value, {
          new: true,
        });
      }
      res.json(label);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteLabel(req, res) {
    try {
      await Label.findByIdAndUpdate(req.params.id, { active: false });
      await Task.updateMany(
        { labels: req.params._id },
        { $pull: { labels: req.params._id } }
      );
      res.json({ message: "Label deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async activateLabel(req, res) {
    try {
      await Label.findByIdAndUpdate(req.params.id, { active: true });
      res.json({ message: "Label activated successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new LabelsController();
