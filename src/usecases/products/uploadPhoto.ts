import ProductRepository from "../../infra/repository/productRepository"
import ProductModel from "../../infra/database/models/mongoose/product"
import log from "../../interface/http/utils/logger"
const cloudinary = require('../../infra/libs/cloudinary')
const fs = require('fs')


class UploadPhoto{
    productRepository: ProductRepository
    logger: typeof log
    productModel: typeof ProductModel
    constructor({productRepository, logger, productModel}: {productRepository: ProductRepository, productModel: typeof ProductModel, logger: typeof log}) {
        this.productRepository = productRepository
        this.logger = logger
        this.productModel = productModel
    }

    async execute(payload: any, productId: String) {
        try {
            
            const uploader = async (path: String) => await cloudinary.uploads(path , 'youstore-product-photos')
            const urls = []
            const files = payload

        for (const file of files) {
            const {path} = file
            const newPath = await uploader(path)


            urls.push(newPath.url)
        
            fs.unlinkSync(path)
        }

            
            const product = await ProductModel.findOne({productId: productId})

            

            product!.images = urls.toString()

            await product?.save()
            console.log(product)

            return product
          
        } catch (error) {
            throw error
        }
     }
}

export default UploadPhoto