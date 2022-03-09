import mongoose from "mongoose"
import ProductRepository from "../../infra/repository/productRepository"
import log from "../../interface/http/utils/logger"


class DeleteProduct{
    productRepository: ProductRepository
    logger: typeof log
    constructor({productRepository, logger}: {productRepository: ProductRepository , logger: typeof log }) {
        this.productRepository = productRepository
        this.logger = logger
    }

    async execute(productId: string , merchantId : mongoose.Schema.Types.ObjectId) {
        try {
            const product = await this.productRepository.delete(productId,merchantId)
            return product
        } catch (error) {
            throw error
        }
    }
}

export default DeleteProduct