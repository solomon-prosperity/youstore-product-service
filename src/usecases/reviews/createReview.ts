import { createReviewSchema } from "../../interface/http/validations/reviewValidations";
import ReviewModel from "../../infra/database/models/mongoose/review";
import ReviewRepository from "../../infra/repository/reviewRespository";
import log from "../../interface/http/utils/logger";
import { ReviewDocument } from "../../infra/database/models/mongoose/review";

class CreateReview {
    reviewRepository: ReviewRepository
    logger: typeof log
    reviewModel: typeof ReviewModel
    constructor({reviewRepository, logger,reviewModel}: {reviewRepository: ReviewRepository, reviewModel: typeof ReviewModel, logger: typeof log}) {
        this.reviewRepository = reviewRepository
        this.logger = logger
        this.reviewModel = reviewModel
    }

    async execute(productId: any,payload: ReviewDocument) {
        try {
            const { error } = createReviewSchema(payload)
            if (error) throw new Error(` ${error.details[0].message}`)
            const review = await this.reviewRepository.create(productId,payload)
            return review
        } catch (error) {
            throw error
        }
    }
}

export default CreateReview