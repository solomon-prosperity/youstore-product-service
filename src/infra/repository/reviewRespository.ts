import ReviewModel from "../database/models/mongoose/review";
import { ReviewDocument } from "../database/models/mongoose/review";
import log from "../../interface/http/utils/logger";
import NotFoundError from "../../interface/http/errors/notFound"
import ProductModel from "../database/models/mongoose/product";
import { errorMonitor } from "events";

class ReviewRepository {
    reviewModel: typeof ReviewModel
    productModel: any
    logger: typeof log 
    constructor({reviewModel , productModel, logger}: {reviewModel: typeof ReviewModel,productModel: typeof ProductModel, logger: typeof log}){
        this.reviewModel = reviewModel
        this.productModel = productModel
        this.logger = logger
    }

    async create(productId: any, payload: ReviewDocument, customerAvatar: string, customerName:string) {
        try {
            
            const review = await this.reviewModel.create(payload);
            review.customerName = customerName
            review.customerAvatar = customerAvatar
            const saveReview = await review.save()
            const addReviewToProduct = await this.productModel.findOneAndUpdate({_id: productId }, { $push: { reviews: saveReview._id } },
                { new: true })
                return saveReview
        } catch (error) {
            throw error
        }
    }


async get (reviewId: String) {
        try {
            const review = await this.reviewModel.findById(reviewId)
            if(!review) {
                throw new NotFoundError('Product with this ID does not exist' , 404, `error`)
            }
            return review
        } catch (error) {
            throw error
            
        }
}
async getCustomerReview ( payload: any ){
    try{
        const { page = 1, limit = 20, customerName} = payload

        const review = await this.productModel.paginate({customerName:customerName}, {
            page,
            limit,
            populate: {path: "reviews" , select: ['customerName' ,'customerAvatar' , 'comment', 'rating', 'createdAt', 'updatedAt']}
          })
        if(!review) {
            throw new NotFoundError('Customer does not exist' , 404, `error`)}
        return review
    }catch(error){
        throw error

    }

}


async getAll (payload: Object) {
    try {
        
        const reviews = await this.reviewModel.find(payload)
        return reviews
    } catch (error) {
        throw error
        
    }
}


async update (reviewId: string, payload: ReviewDocument) {
    try {
        const review = await this.reviewModel.findOneAndUpdate({_id: reviewId}, payload, {
            new: true
        } )
        return review
    } catch (error) {
        throw error
    }
}


async delete (reviewId: string) {
        try {
            const review = await this.reviewModel.findByIdAndDelete(reviewId)
            return review
        } catch (error) {
            throw error
            
        }
}
}
    

export default ReviewRepository