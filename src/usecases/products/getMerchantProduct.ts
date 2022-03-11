import ProductRepository from "../../infra/repository/productRepository"
import log from "../../interface/http/utils/logger"

class GetMercahntProducts{
    productRepository: ProductRepository
    logger: typeof log
    constructor({productRepository, logger}: {productRepository: ProductRepository, logger: typeof log}) {
        this.productRepository = productRepository
        this.logger = logger
    }

    async execute(payload: object, merchantId: string) {
        try {
           const Products =  await this.productRepository.getMerchantProduct(payload, merchantId)
           return Products
        } catch (error) {
            throw error
        }
    }
}

export default GetMercahntProducts