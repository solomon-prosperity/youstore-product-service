import Joi from "joi";
import { ReviewDocument } from "../../../infra/database/models/mongoose/review";

export const createReviewSchema = (review: ReviewDocument) => {
    const schema = Joi.object({
    comment: Joi.string().required(),
    rating: Joi.number().required(),
  }).unknown();
          return schema.validate(review);
  }