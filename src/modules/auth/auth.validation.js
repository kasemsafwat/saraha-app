
import joi from "joi";

export const signUpValidationSchema = joi
  .object({
    userName: joi.string().min(2).max(10).required(),
    email: joi
      .string()
      .email({ minDomainSegments: 2, tlds: ["com", "net"] })
      .required(),
    password: joi
      .string()
      .pattern(new RegExp(/^[A-Z][a-z0-9]{3,8}@$/))
      .required(),
    confirmedPassword: joi.string().valid(joi.ref("password")).required(),
  })
  .options({ allowUnknown: false });


  export const signInValidationSchema = joi
    .object({
      email: joi
        .string()
        .email({ minDomainSegments: 2, tlds: ["com", "net"] })
        .required(),
      password: joi
        .string()
        .pattern(new RegExp(/^[A-Z][a-z0-9]{3,8}@$/))
        .required() 
    })
    .options({ allowUnknown: false });
