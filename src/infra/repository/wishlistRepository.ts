
import WishlistModel, { WishlistDocument } from "../database/models/mongoose/wishlist";
import log from "../../interface/http/utils/logger";
import NotFoundError from "../../interface/http/errors/notFound"
import ProductModel from "../database/models/mongoose/product";

 
class WishlistRepository {
    wishlistModel: typeof WishlistModel
    productModel: typeof ProductModel
    logger: typeof log 
    constructor({wishlistModel,productModel, logger}: {wishlistModel: typeof WishlistModel, productModel: typeof ProductModel, logger: typeof log}){
        this.wishlistModel = wishlistModel
        this.productModel = productModel
        this.logger = logger
    }

    async create(payload: WishlistDocument, customerId: string) {
        try {
            const customerHasWishlist: any | null = await this.wishlistModel.findOne({customerId: customerId})
            if (!customerHasWishlist) {
                const wishlist = await this.wishlistModel.create(payload);
                wishlist.customerId = customerId
                const saveWishlist = await wishlist.save()
                return saveWishlist

              
            } else {
                const newone =   await this.wishlistModel.findOneAndUpdate({customerId: customerId}, { $push: payload },
                    { new: true })
                    return newone
            }
                
        } catch (error) {
            throw error;
        }
    }

async get (customerId: String) {
        try {
            const wishlist = await this.wishlistModel.find({customerId:customerId})
            if(!wishlist) {
                throw new NotFoundError('No wishlist for this user' , 404, `error`)
            }
            return wishlist
        } catch (error) {
            this.logger.error(error);
            
        }
}



async update (wishlistId: string, payload: WishlistDocument) {
    try {
        const wishlist = await this.wishlistModel.findOneAndUpdate({_id: wishlistId}, payload, {
            new: true
        } )
        return wishlist
    } catch (error) {
        this.logger.error(error);
    }
}


async remove (productId: string, customerId: string) {
        try {
            const wishlist: any | null = await this.wishlistModel.find({customerId:customerId})
            if(!wishlist) {
                throw new NotFoundError('No wishlist for this user' , 404, `error`)
            }

             
             wishlist.forEach((list: any) => {
                const totalProducts = list.products.length
                for(let i = 0; i < totalProducts; i++) {
                    let product = list.products[i]
                    if (product === productId) {
                        list.products.splice(i,1)
                        console.log(list)
                    } else {
                        console.log(`should not delete`)
                    }
                }
             })
             
            
            return wishlist
        } catch (error) {
            this.logger.error(error);
            
        }
}
}
    

export default WishlistRepository