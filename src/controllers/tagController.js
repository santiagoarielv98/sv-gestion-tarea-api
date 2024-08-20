import * as tagService from "../services/tagService.js";

export const createTag = async (req, res) => {
  try {
    const tag = await tagService.createTag(req.body, req.user.uid);
    res.status(201).json(tag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getTags = async (req, res) => {
  try {
    const tags = await tagService.getTags(req.user.uid);
    res.status(200).json(tags);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getTagById = async (req, res) => {
  try {
    const tag = await tagService.getTagById(req.params.tagId, req.user.uid);
    res.status(200).json(tag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateTag = async (req, res) => {
  try {
    const tag = await tagService.updateTag(req.params.tagId, req.body, req.user.uid);
    res.status(200).json(tag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTag = async (req, res) => {
  try {
    const tag = await tagService.deleteTag(req.params.tagId, req.user.uid);
    res.status(200).json(tag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const activateTag = async (req, res) => {
  try {
    const tag = await tagService.activateTag(req.params.tagId, req.user.uid);
    res.status(200).json(tag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
