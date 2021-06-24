const Joi = require("joi");
const userNameSchema = Joi.object({
    userName:Joi.string().min(8).required()
  });

const signupSchema = Joi.object({
    userName:Joi.string().min(8).required(),
    password:Joi.string().min(6).required()
  });

const transactionSchema = Joi.object({
    to:Joi.string().min(8).required(),
      from:Joi.string().min(8).required(),
      amount:Joi.number().integer().min(0),
      activityName:Joi.string().optional(),
      purpose:Joi.string().optional()
  });


module.exports = {userName:userNameSchema,signup:signupSchema,transaction:transactionSchema}