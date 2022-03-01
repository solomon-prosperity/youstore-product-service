import ReviewRepository from "../../infra/repository/reviewRespository";
import log from "../../interface/http/utils/logger";

class DeleteReview{
    reviewRepository: ReviewRepository
    logger: typeof log
    constructor({reviewRepository, logger}: {reviewRepository: ReviewRepository , logger: typeof log }) {
        this.reviewRepository = reviewRepository
        this.logger = logger
    }

    async execute(reviewId: string) {
        try {
            const review = await this.reviewRepository.delete(reviewId)
            return review
        } catch (error) {
            this.logger.error(error)
        }
    }
}

export default DeleteReview