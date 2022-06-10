import { error } from "./../logging/logging.js";

const validateSchema = (schema) => {
    return (req, res, next) => {
        const { body } = req;

        const schemaValidation = schema.validate(body, { abortEarly: false });

        if (schemaValidation.error) {
            const validationErrors = schemaValidation.error.details.map(detail => detail.message);
            console.log(error('Validation errors:\n'), error(validationErrors.join('\n')), "\n");
            return res.status(422).send(validationErrors);
        }

        next();
    }
};

export default validateSchema;