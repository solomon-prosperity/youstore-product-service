import {Request, Response} from "express";
import _pick from "lodash/pick";
import HTTP_STATUS from "http-status-codes";
import ReviewRepository from "../../../infra/repository/reviewRespository";
import CreateReview from "../../../usecases/reviews/createReview";
import DeleteReview from "../../../usecases/reviews/deleteReview";
import GetReview from "../../../usecases/reviews/getReview";
import GetReviews from "../../../usecases/reviews/getReviews";
import UpdateReview from "../../../usecases/reviews/updateReview";

class ReviewController {
    createReview: CreateReview
    getReview: GetReview
    getReviews: GetReviews
    deleteReview: DeleteReview
    updateReview: UpdateReview
    ReviewRepository: ReviewRepository
    constructor({createReview, reviewRepository, getReview , getReviews, updateReview, deleteReview}: {createReview: CreateReview, getReview: GetReview, updateReview: UpdateReview, deleteReview: DeleteReview
        getReviews: GetReviews, reviewRepository: ReviewRepository}) {
        this.createReview = createReview
        this.getReview = getReview
        this.getReviews = getReviews
        this.updateReview = updateReview
        this.deleteReview = deleteReview
        this.ReviewRepository = reviewRepository
    } 


    async create(req: Request, res: Response) {
        try {
            const payload = req.body
            const productId = req.params.productId
            const fullName = req.user.firstName + ' ' + req.user.lastName
            const customerName = fullName
            const customerAvatar = req.user.avatar
        
            const review = await this.createReview.execute(productId, payload, customerName, customerAvatar)
            res.status(HTTP_STATUS.CREATED).json({ success: true, msg: `Review successfully created`, data: review })
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`${error.message}`)
            }
            throw error
        }
    }

    async get(req: Request, res: Response) {
        try {
            const { reviewId } = req.params
            const review = await this.getReview.execute(reviewId)
            if (!review) return res.status(400).json({ success: false, msg: `Review with this ID not found` })
            res.status(HTTP_STATUS.OK).json({ success: true, msg: `Review details successfully retrieved`, data: review })
        } catch (error) {
            if (error instanceof Error) {
                res.status(HTTP_STATUS.FORBIDDEN).json({ success: false, msg: `${error.message}` })
                throw error
            }
        }
    }


    async getAll(req: Request, res: Response) {
        try {
            const payload = req.query
            const reviews = await this.getReviews.execute(payload)
            res.status(HTTP_STATUS.OK).json({ success: true, msg: `Reviews successfully retrieved`, data: reviews })
        } catch (error) {
            if (error instanceof Error) {
                res.status(HTTP_STATUS.FORBIDDEN).json({ success: false, msg: `${error.message}` })
                throw error
            }
        }
    }


    async update(req: Request, res: Response) {
        try {
            const { reviewId } = req.params
            const payload = req.body
            const review = await this.updateReview.execute(reviewId, payload)
            if (!review) return res.status(400).json({ success: false, msg: `Review with this ID not found` })
            res.status(HTTP_STATUS.OK).json({ success: true, msg: `Review details successfully updated`, data: review })
        } catch (error) {
            if (error instanceof Error) {
                res.status(HTTP_STATUS.FORBIDDEN).json({ success: false, msg: `${error.message}` })
                throw error
            }
        }
    }


    async delete(req: Request, res: Response) {
        try {
            const { reviewId } = req.params
            const Review = await this.deleteReview.execute(reviewId)
            if (!Review) return res.status(404).json({ success: false, msg: `Review with this ID not found` })
            res.status(HTTP_STATUS.OK).json({ success: true, msg: `Review details successfully deleted`, data: Review })
        } catch (error) {
            if (error instanceof Error) {
                res.status(HTTP_STATUS.FORBIDDEN).json({ success: false, msg: `${error.message}` })
                throw error
            }
        }
    }

}

export default ReviewController