import ReviewModel from "../database/models/mongoose/review";
import { ReviewDocument } from "../database/models/mongoose/review";
import log from "../../interface/http/utils/logger";
import NotFoundError from "../../interface/http/errors/notFound"
import ProductModel from "../database/models/mongoose/product";

class ReviewRepository {
    reviewModel: typeof ReviewModel
    productModel: typeof ProductModel
    logger: typeof log 
    constructor({reviewModel , productModel, logger}: {reviewModel: typeof ReviewModel,productModel: typeof ProductModel, logger: typeof log}){
        this.reviewModel = reviewModel
        this.productModel = productModel
        this.logger = logger
    }

    async create(productId: any, payload: ReviewDocument) {
        try {
            const { comment, rating, customer_avatar, customer_name } = payload
            const Review = await this.reviewModel.create(payload);
            const saveReview = await Review.save()
            const addReviewToProduct = await this.productModel.findOneAndUpdate({_id: productId }, { $push: { reviews: saveReview._id } },
                { new: true })
                return addReviewToProduct
        } catch (error) {
            this.logger.error(error);
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
            this.logger.error(error);
            
        }
}


async getAll (payload: Object) {
    try {
        
        const reviews = await this.reviewModel.find(payload)
        return reviews
    } catch (error) {
        this.logger.error(error);
        
    }
}


async update (reviewId: string, payload: ReviewDocument) {
    try {
        const review = await this.reviewModel.findOneAndUpdate({_id: reviewId}, payload, {
            new: true
        } )
        return review
    } catch (error) {
        this.logger.error(error);
    }
}


async delete (reviewId: string) {
        try {
            const review = await this.reviewModel.findByIdAndDelete(reviewId)
            return review
        } catch (error) {
            this.logger.error(error);
            
        }
}
}
    

export default ReviewRepository