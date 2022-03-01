
import { createProductSchema } from "../../interface/http/validations/productValidations"
import ProductModel from "../../infra/database/models/mongoose/product"
import ProductRepository from "../../infra/repository/productRepository"
import log from "../../interface/http/utils/logger"
import { ProductDocument } from "../../infra/database/models/mongoose/product"

 class CreateProduct{
    productRepository: ProductRepository
    logger: typeof log
    productModel: typeof ProductModel
    constructor({productRepository, logger,productModel}: {productRepository: ProductRepository, productModel: typeof ProductModel, logger: typeof log}) {
        this.productRepository = productRepository
        this.logger = logger
        this.productModel = productModel
    }

     async execute(payload: ProductDocument) {
         try {
             const { error } = createProductSchema(payload)
             if (error) throw new Error(` ${error.details[0].message}`)
             const product = await this.productRepository.create(payload)
             return product
         } catch (error) {
             throw error
         }
     }
}

export default CreateProduct