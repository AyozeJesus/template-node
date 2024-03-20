import Joi from 'joi'

export const usersSchemas = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  name: Joi.string().min(2).max(30).allow(''),
  lastname: Joi.string().min(2).max(30),
  address: Joi.string().max(100).allow(''),
  gender: Joi.string().allow(null, ''),
  email: Joi.string().email().max(100).required(),
  password: Joi.string().min(8).required(),
  bio: Joi.string().max(255).allow(''),
})

export const loginSchema = Joi.object({
  email: Joi.string().email().max(100).required(),
  password: Joi.string().min(8).max(50).required().messages(),
})

export const getUserSchema = Joi.object({
  id: Joi.string().required(),
})
