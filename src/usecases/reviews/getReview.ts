
import ReviewRepository from "../../infra/repository/reviewRespository"
import log from "../../interface/http/utils/logger"


class GetReview{
    reviewRepository: ReviewRepository
    logger: typeof log
    constructor({reviewRepository, logger}: {reviewRepository: ReviewRepository, logger: typeof log}) {
        this.reviewRepository = reviewRepository
        this.logger = logger
    }

    async execute(reviewId: string) {
        try {
            const review = await this.reviewRepository.get(reviewId)
            return review
        } catch (error) {
            throw error
        }
    }
}

export default GetReview