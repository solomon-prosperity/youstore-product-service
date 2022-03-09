import WishlistRepository from "../../infra/repository/wishlistRepository"
import CategoryRepository from "../../infra/repository/wishlistRepository"
import log from "../../interface/http/utils/logger"



class GetWishlist{
    wishlistRepository: WishlistRepository
    logger: typeof log
    constructor({wishlistRepository, logger}: {wishlistRepository: WishlistRepository, logger: typeof log}) {
        this.wishlistRepository = wishlistRepository
        this.logger = logger
    }

    async execute(customerId: string) {
        try {
            const wishlist = await this.wishlistRepository.get(customerId)
            return wishlist
        } catch (error) {
            this.logger.error(error)
        }
    }
}


export default GetWishlist