import { isValidObjectId } from "mongoose";

export const handlerValidationSchema = (schema) => async (req, res, next) => {
  const { value, error } = schema.validate(req.body);
  if (error) {
    const errors = error.details.reduce((acc, err) => {
      acc[err.path?.join(".") ?? err.context.key] = err.message;
      return acc;
    }, {});
    res.status(400).json({
      message: error.message,
      errors,
    });
  } else {
    req.body = value;
    next();
  }
};

export const validateIdParamHandler =
  ({ param = "id", messsage = "Invalid id" } = {}) =>
  (req, res, next) => {
    const id = req.params[param];
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: messsage });
    }
    next();
  };
