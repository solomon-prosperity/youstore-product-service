import Joi from "joi";
import { ProductDocument } from "../../../infra/database/models/mongoose/product";

export const createProductSchema = (product: ProductDocument) => {
    const schema = Joi.object({               
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.string().required(),
    color: Joi.string().required(),
  }).unknown();
          return schema.validate(product);
  }
  