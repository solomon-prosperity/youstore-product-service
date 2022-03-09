import ProductRepository from "../../infra/repository/productRepository"
import log from "../../interface/http/utils/logger"

class GetProducts{
    productRepository: ProductRepository
    logger: typeof log
    constructor({productRepository, logger}: {productRepository: ProductRepository, logger: typeof log}) {
        this.productRepository = productRepository
        this.logger = logger
    }

    async execute(payload: object) {
        try {
           const Products =  await this.productRepository.getAll(payload)
           return Products
        } catch (error) {
            throw error
        }
    }
}

export default GetProducts