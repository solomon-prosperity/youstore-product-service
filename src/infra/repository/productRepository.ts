//import {ProductModel} from "../infra/database/models/mongoose/product.model"
//import { Document } from "mongoose"
import NotFoundError from "../../interface/http/errors/notFound"
import ProductModel from "../database/models/mongoose/product"
import { ProductDocument } from "../database/models/mongoose/product"
import log from "../../interface/http/utils/logger"
import mongoose from "mongoose"
import { join } from "path/posix"


//import CustomerInput from "../infra/database/models/mongoose/customerModel"
 class ProductRepository {
    productModel: any
    logger: typeof log 
    constructor({productModel , logger}: {productModel: typeof ProductModel, logger: typeof log}){
        this.productModel = productModel
        this.logger = logger
    }

    async create (payload: ProductDocument, merchantId:mongoose.Schema.Types.ObjectId) {
            try {
                const product = await this.productModel.create(payload);
                product.merchantId = merchantId
                const saveProduct = await product.save()
                return saveProduct
            } catch (error) {
                throw error
            }
    }

    async get (productId: String) {
            try {
                const product = await this.productModel.findById(productId)
                .populate({path: "reviews" , select: ['customerName' ,'customerAvatar','comment', 'rating', 'createdAt', 'updatedAt']});
                if(!product) {
                    throw new NotFoundError('Product with this ID does not exist' , 404, `error`)
                }
                return product
            } catch (error) {
                throw error;
                
            }
    }


    async getAll (payload: any) {
        try { 
            const {page = 1 , limit = 10 } = payload; 
            const products  = await this.productModel.find().limit(limit * 1).skip((page - 1) * limit)
            .populate({path: "reviews" , select: ['customerName' , 'customerAvatar','comment', 'rating', 'createdAt', 'updatedAt']});
            return products
        } catch (error) {
            throw error
           
        }

    }
    
    async getMerchantProduct ( merchantId:string, payload: any) {
        try {
            const { page = 1, limit = 10} = payload
            const products = await this.productModel.find({merchantId:merchantId}).limit(limit * 1).skip((page - 1) * limit)
            .populate({path: "reviews" , select: ['customerName' , 'customerAvatar','comment', 'rating', 'createdAt', 'updatedAt']});
            
            return products
        } catch (error) {
            throw error;
            
        }
    }


    async update (productId: string, payload: ProductDocument) {
        try {
            const product = await this.productModel.findOneAndUpdate({_id: productId}, payload, {
                new: true
            } )
            return product
        } catch (error) {
            throw error
        }
    }
    
    async getCategory ( payload: any ){
        try{
            const { page = 1, limit = 10, category} = payload

            const product = await this.productModel.find({category:category}).limit(limit * 1).skip((page - 1) * limit)
            .populate({path: "reviews" , select: ['customerName' , 'customerAvatar','comment', 'rating', 'createdAt', 'updatedAt']});
            if(!product) {
                throw new NotFoundError('Product with this ID does not exist' , 404, `error`)}
            return product
        }catch(error){
            throw error

        }
    }


    async delete (productId: string, merchantId: mongoose.Schema.Types.ObjectId) {
            try {
                const product = await this.productModel.findById(productId)
                if (product?.merchantId != merchantId) throw new Error (`Cannot delete another merchant's product`)
                const deleteProduct = await this.productModel.findByIdAndDelete(productId)
                return deleteProduct
            } catch (error) {
                throw error
                
            }
    }
    async search(payload: any){
        try{
            const { page = 1, limit = 10, name } = payload
            let product = await this.productModel.find({name: {$regex: new RegExp('^'+ name +'.*', 'i')}}).limit(limit * 1).skip((page - 1) * limit)
            .populate({path: "reviews" , select: ['customerName','customerAvatar' , 'comment', 'rating', 'createdAt', 'updatedAt']});
            product = product.slice(0, 10);
            if (product.length < 1) {
                throw new NotFoundError('No product matched your search' , 404, `error`)
            }
            return product
        }catch (error) {
            throw error
        }
        

    }


}

export default ProductRepository