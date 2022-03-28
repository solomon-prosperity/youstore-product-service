import Joi from "joi";
import { WishlistDocument } from "../../../infra/database/models/mongoose/wishlist";

export const createWishlistSchema = (wishlist: WishlistDocument) => {
    const schema = Joi.object({
    product: Joi.string().required()
  }).unknown();
          return schema.validate(wishlist);
  }
  