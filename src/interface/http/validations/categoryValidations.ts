import Joi from "joi";
import { CategoryDocument } from "../../../infra/database/models/mongoose/category";

export const createCategorySchema = (category: CategoryDocument) => {
    const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
  }).unknown();
          return schema.validate(category);
  }