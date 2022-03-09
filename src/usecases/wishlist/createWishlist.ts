import { createWishlistSchema } from "../../interface/http/validations/wishlistValidations"
import WishlistModel from "../../infra/database/models/mongoose/wishlist"
import WishlistRepository from "../../infra/repository/wishlistRepository"
import log from "../../interface/http/utils/logger"
import { WishlistDocument } from "../../infra/database/models/mongoose/wishlist"

 class CreateWishlist{
    wishlistRepository: WishlistRepository
    logger: typeof log
    wishlistModel: typeof WishlistModel
    constructor({wishlistRepository, logger, wishlistModel}: {wishlistRepository: WishlistRepository, wishlistModel: typeof WishlistModel, logger: typeof log}) {
        this.wishlistRepository = wishlistRepository
        this.logger = logger
        this.wishlistModel = wishlistModel
    }

     async execute( payload: WishlistDocument, customerId: string) {
         try {
            //  const { error } = createWishlistSchema(payload )
            //  if (error) throw new Error(` ${error.details[0].message}`)

             
             const wishlist = await this.wishlistRepository.create(payload, customerId )
             
             return wishlist
         } catch (error) {
             throw error
         }
     }
}

export default CreateWishlist