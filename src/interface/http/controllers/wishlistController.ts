import { Request, Response } from "express";
import _pick from "lodash/pick";
import HTTP_STATUS from "http-status-codes"
import WishlistRepository from "../../../infra/repository/wishlistRepository";
import DeleteWishlist from "../../../usecases/wishlist/deleteWishlist";
import GetWishlist from "../../../usecases/wishlist/getWishlist";
import UpdateWishlist from "../../../usecases/wishlist/updateWishlist";
import CreateWishlist from "../../../usecases/wishlist/createWishlist";


class WishlistController {
    createWishlist: CreateWishlist
    getWishlist: GetWishlist
    deleteWishlist: DeleteWishlist
    updateWishlist: UpdateWishlist
    wishlistRepository: WishlistRepository
    constructor({createWishlist, wishlistRepository, getWishlist, updateWishlist, deleteWishlist}: {createWishlist: CreateWishlist, getWishlist: GetWishlist, updateWishlist: UpdateWishlist, deleteWishlist: DeleteWishlist, wishlistRepository: WishlistRepository}) {
        this.createWishlist = createWishlist
        this.getWishlist = getWishlist
        
        this.updateWishlist = updateWishlist
        this.deleteWishlist = deleteWishlist
        this.wishlistRepository = wishlistRepository

    } 


    async create(req: Request, res: Response) {
        try {
            const payload = req.body
            console.log(payload)
            const customerId = req.user._id
            console.log(customerId)
            const wishlist = await this.createWishlist.execute(payload, customerId )
            res.status(HTTP_STATUS.CREATED).json({ success: true, msg: `Wishlist successfully created`, data: wishlist })
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`${error.message}`)
            }
            throw error
        }
    }
    

    async get(req: Request, res: Response) {
        try {
            const customerId = req.user._id
            const wishlist = await this.getWishlist.execute(customerId)
            res.status(HTTP_STATUS.OK).json({ success: true, msg: `wishlist successfully retrieved`, data: wishlist })
        } catch (error) {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, data: error })
        }
    }


    async update(req: Request, res: Response) {
        try {
            const { wishlistId } = req.params
            const payload = req.body
            const wishlist = await this.updateWishlist.execute(wishlistId, payload)
            if (!wishlist) return res.status(400).json({ success: false, msg: `Product with this ID not found` })
            res.status(HTTP_STATUS.OK).json({ success: true, msg: `Product details successfully updated`, data: wishlist })
        } catch (error) {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, data: error })
        }
    }


    async remove(req: Request, res: Response) {
        try {
            const { wishlistId } = req.params
            const customerId = req.user._id
            const wishlist = await this.deleteWishlist.execute(wishlistId, customerId)
            if (!wishlist) return res.status(404).json({ success: false, msg: `Product with this ID not found` })
            res.status(HTTP_STATUS.OK).json({ success: true, msg: `Product details successfully deleted`, data: wishlist })
        } catch (error) {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, data: error })
        }
    }

    
}



export default WishlistController