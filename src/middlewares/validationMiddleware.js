/**
 * middleware para validar los datos de entradas
 * @param {import('joi').ObjectSchema} schema
 * @returns
 */
const validationMiddleware = (schema) => {
  return async (req, res, next) => {
    try {
      const validatedData = await schema.validateAsync(req.body, {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true,
      });

      req.body = validatedData;
      next();
    } catch (error) {
      const errors = error.details.reduce((acc, err) => {
        acc[err.context.key] = err.message;
        return acc;
      }, {});
      res.status(400).json({
        message: error.message,
        errors,
      });
    }
  };
};

export default validationMiddleware;
