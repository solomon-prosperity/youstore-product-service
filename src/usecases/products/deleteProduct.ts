import ProductRepository from "../../infra/repository/productRepository"
import log from "../../interface/http/utils/logger"


class DeleteProduct{
    productRepository: ProductRepository
    logger: typeof log
    constructor({productRepository, logger}: {productRepository: ProductRepository , logger: typeof log }) {
        this.productRepository = productRepository
        this.logger = logger
    }

    async execute(productId: string) {
        try {
            const product = await this.productRepository.delete(productId)
            return product
        } catch (error) {
            this.logger.error(error)
        }
    }
}

export default DeleteProduct