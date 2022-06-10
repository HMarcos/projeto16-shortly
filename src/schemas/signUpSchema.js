import joi from "joi";

const signUpSchema = joi.object(
    {
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().min(8).required(),
        confirmPassword: joi.string().valid(joi.ref('password')).required().messages(
            { 'any.only': '{{#label}} does not match' }
        )
    }
);

export default signUpSchema;