import { ProductDocument } from "../../infra/database/models/mongoose/product"
import ProductRepository from "../../infra/repository/productRepository"
import log from "../../interface/http/utils/logger"


class UpdateProduct{
    productRepository: ProductRepository
    logger: typeof log
    constructor({productRepository, logger}: {productRepository: ProductRepository, logger: typeof log}) {
        this.productRepository = productRepository
        this.logger = logger
    }

    async execute(productId: string, payload: ProductDocument) {
        try {
            const product = await this.productRepository.update(productId, payload)
            return product
        } catch (error) {
            this.logger.error(error)
        }
    }
}

export default UpdateProduct