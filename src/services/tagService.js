import Tag from "../models/tagModel.js";

export const createTag = async (tag, userId) => {
  return await Tag.create({ ...tag, user: userId });
};

export const getTags = async (userId) => {
  return await Tag.find({ user: userId, active: true });
};

export const getTagById = async (tagId, userId) => {
  return await Tag.findOne({ _id: tagId, user: userId, active: true });
};

export const updateTag = async (tagId, tag, userId) => {
  return await Tag.findOneAndUpdate({ _id: tagId, user: userId, active: true }, tag, {
    new: true,
  });
};

export const deleteTag = async (tagId, userId) => {
  return await Tag.findOneAndUpdate(
    { _id: tagId, user: userId, active: true },
    { active: false },
    {
      new: true,
    }
  );
};

export const activateTag = async (tagId, userId) => {
  return await Tag.findOneAndUpdate(
    { _id: tagId, user: userId, active: false },
    { active: true },
    {
      new: true,
    }
  );
};
