import { WishlistDocument } from "../../infra/database/models/mongoose/wishlist"
import WishlistRepository from "../../infra/repository/wishlistRepository"
import log from "../../interface/http/utils/logger"


class UpdateWishlist{
    wishlistRepository: WishlistRepository
    logger: typeof log
    constructor({wishlistRepository, logger}: {wishlistRepository: WishlistRepository, logger: typeof log}) {
        this.wishlistRepository = wishlistRepository
        this.logger = logger
    }

    async execute(wishlistId: string, payload: WishlistDocument) {
        try {
            const wishlist = await this.wishlistRepository.update(wishlistId, payload)
            return wishlist
        } catch (error) {
            this.logger.error(error)
        }
    }
}

export default UpdateWishlist