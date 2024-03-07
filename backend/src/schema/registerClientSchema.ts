import joi, { Schema } from "joi";


export const registerClientSchema: Schema = joi.object({
  name: joi.string().required().trim().messages({
    "string.base": "O campo name deve ser uma string",
    "any.required": "O campo name é obrigatório",
    "string.empty": "O campo name não pode está vazio ou ser preenchido com espaços vazios"
  }),
  email: joi.string().email().required().messages({
    "string.base": "O campo email deve ser uma string",
    "any.required": "O campo email é obrigatório",
    "string.email": "O campo email deve ser preenchido com um email válido",
    "string.empty": "O campo email é obrigatório"
  }),
  phone: joi.string().length(11).pattern(/^\d+$/).required().messages({
    "any.required": "O campo phone é obrigatório",
    "string.empty": "O campo phone é obrigatório",
    "string.base": "O campo phone é obrigatório",
    "string.pattern.base": "O campo phone deve ser composto por 11 números",
    "string.length": "O campo phone deve ser composto por 11 números"
  }),
  coord_x: joi.number().required().messages({
    "number.base": "O campo coord_x deve ser um número",
    "any.required": "O campo coord_x é obrigatório"
  }),
  coord_y: joi.number().required().messages({
    "number.base": "O campo coord_y deve ser um número",
    "any.required": "O campo coord_y é obrigatório"
  })
})
