import { ReviewDocument } from "../../infra/database/models/mongoose/review"
import ReviewRepository from "../../infra/repository/reviewRespository"
import log from "../../interface/http/utils/logger"
import UpdateProduct from "../products/updateProduct"

class UpdateReview{
    reviewRepository: ReviewRepository
    logger: typeof log
    constructor({reviewRepository, logger}: {reviewRepository: ReviewRepository, logger: typeof log}) {
        this.reviewRepository = reviewRepository
        this.logger = logger
    }

    async execute(reviewId: string, payload: ReviewDocument) {
        try {
            const review = await this.reviewRepository.update(reviewId, payload)
            return review
        } catch (error) {
            throw console.error;
            
        }
    }
}

export default UpdateReview