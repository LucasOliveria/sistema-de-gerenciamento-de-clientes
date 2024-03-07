import { Schema } from "joi";
import { Request, Response, NextFunction } from "express";

export const validateSchema = (shema: Schema) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await shema.validateAsync(req.body);

    next();
  } catch (error: any) {
    return res.status(400).json({ mensagem: error.message });
  }
}