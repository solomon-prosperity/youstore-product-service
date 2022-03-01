//import {ProductModel} from "../infra/database/models/mongoose/product.model"
//import { Document } from "mongoose"
import NotFoundError from "../../interface/http/errors/notFound"
import ProductModel from "../database/models/mongoose/product"
import { ProductDocument } from "../database/models/mongoose/product"
import log from "../../interface/http/utils/logger"


//import CustomerInput from "../infra/database/models/mongoose/customerModel"
 class ProductRepository {
    productModel: typeof ProductModel
    logger: typeof log 
    constructor({productModel , logger}: {productModel: typeof ProductModel, logger: typeof log}){
        this.productModel = productModel
        this.logger = logger
    }

    async create (payload: ProductDocument) {
            try {
                const {name, description, price, color, size, images, sold, quantity, isOutOfStock} = payload
                const product = await this.productModel.create(payload);
                const saveProduct = await product.save()
                return saveProduct
            } catch (error) {
                this.logger.error(error);
            }
    }

    async get (productId: String) {
            try {
                const product = await this.productModel.findById(productId)
                .populate({path: "reviews" , select: ['name' , 'comment', 'rating', 'createdAt', 'updatedAt']});
                if(!product) {
                    throw new NotFoundError('Product with this ID does not exist' , 404, `error`)
                }
                return product
            } catch (error) {
                this.logger.error(error);
                
            }
    }


    async getAll (payload: Object) {
        try {
            
            const products = await this.productModel.find(payload)
            return products
        } catch (error) {
            this.logger.error(error);
            
        }
    }


    async update (productId: string, payload: ProductDocument) {
        try {
            const product = await this.productModel.findOneAndUpdate({_id: productId}, payload, {
                new: true
            } )
            return product
        } catch (error) {
            this.logger.error(error);
        }
    }


    async delete (productId: string) {
            try {
                const product = await this.productModel.findByIdAndDelete(productId)
                return product
            } catch (error) {
                this.logger.error(error);
                
            }
    }

//     async find (query: object){
//         try {
//             const product = await this.productModel.find(query)
//             return product
//         } catch (error) {
//             this.logger.error(error);
//         }
// }
}

export default ProductRepository