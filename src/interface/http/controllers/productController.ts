import { Request, Response } from "express";
import _pick from "lodash/pick";
import HTTP_STATUS from "http-status-codes"
import ProductRepository from "../../../infra/repository/productRepository";
import CreateProduct from "../../../usecases/products/createProduct";
import DeleteProduct from "../../../usecases/products/deleteProduct";
import GetProduct from "../../../usecases/products/getProduct";
import GetProducts from "../../../usecases/products/getProducts";
import UpdateProduct from "../../../usecases/products/updateProduct";
import UploadPhoto from "../../../usecases/products/uploadPhoto";
import GetMerchantProducts from "../../../usecases/products/getMerchantProduct";
import GetCategory from "../../../usecases/products/getCategory";

//import ProductAvailable from "../../../usecases/products/productavailable";

class ProductController {
    createProduct: CreateProduct
    getProduct: GetProduct
    getProducts: GetProducts
    deleteProduct: DeleteProduct
    updateProduct: UpdateProduct
    uploadPhoto: UploadPhoto
    productAvailable: any
    getMerchantProducts : GetMerchantProducts
    getCategory: GetCategory
    ProductRepository: ProductRepository
    constructor({createProduct, productRepository, getProduct , getCategory, getProducts, uploadPhoto, updateProduct, deleteProduct,productAvailable,getMerchantProducts}: {createProduct: CreateProduct, getProduct: GetProduct, updateProduct: UpdateProduct, deleteProduct: DeleteProduct
        getProducts: GetProducts, uploadPhoto: UploadPhoto,getCategory: GetCategory, getMerchantProducts : GetMerchantProducts, productRepository: ProductRepository,productAvailable: any}) {
        this.createProduct = createProduct
        this.getProduct = getProduct
        this.getProducts = getProducts
        this.updateProduct = updateProduct
        this.deleteProduct = deleteProduct
        this.uploadPhoto = uploadPhoto
        this.productAvailable = productAvailable
        this.getMerchantProducts = getMerchantProducts
        this.getCategory = getCategory
        this.ProductRepository = productRepository

    } 


    async create(req: Request, res: Response) {
        try {
               const merchantId = req.user._id
            const payload = req.body
            const product = await this.createProduct.execute(payload, merchantId)

            res.status(HTTP_STATUS.CREATED).json({ success: true, msg: `Product successfully created`, data: product })
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`${error.message}`)
            }
            throw error
        }
    }
    

    async get(req: Request, res: Response) {
        try {
            const { productId } = req.params
            const product = await this.getProduct.execute(productId)
            if (!product) return res.status(400).json({ success: false, msg: `Product with this ID not found` })
            res.status(HTTP_STATUS.OK).json({ success: true, msg: `Product details successfully retrieved`, data: product })
        } catch (error) {
            if (error instanceof Error) {
                res.status(HTTP_STATUS.FORBIDDEN).json({ success: false, msg: `${error.message}` })
                throw error
            }
            throw error
        }
    }

    async getAllMerchantProduct(req: Request, res:Response ){
        try{

            const merchantId = req.user._id
            const payload = req.query
            const products = await this.getMerchantProducts.execute( merchantId, payload)
            res.status(HTTP_STATUS.OK).json({ success: true, msg: `Products successfully retrieved`, data: products })

        }catch(error){
            if (error instanceof Error) {
                res.status(HTTP_STATUS.FORBIDDEN).json({ success: false, msg: `${error.message}` })
                throw error
            }
            throw error
        }
    }


    async getAll(req: Request, res: Response) {
        try {
            const payload = req.query
            const products = await this.getProducts.execute(payload)
            res.status(HTTP_STATUS.OK).json({ success: true, msg: `Products successfully retrieved`, data: products })
        } catch (error) {
            if (error instanceof Error) {
                res.status(HTTP_STATUS.FORBIDDEN).json({ success: false, msg: `${error.message}` })
                throw error
            }
            throw error
        }
    }




    async update(req: Request, res: Response) {
        try {
            const { productId } = req.params
            const payload = req.body
            const product = await this.updateProduct.execute(productId, payload)
            if (!product) return res.status(400).json({ success: false, msg: `Product with this ID not found` })
            res.status(HTTP_STATUS.OK).json({ success: true, msg: `Product details successfully updated`, data: product })
        } catch (error) {
            if (error instanceof Error) {
                res.status(HTTP_STATUS.FORBIDDEN).json({ success: false, msg: `${error.message}` })
                throw error
            }
        }
    }


    async delete(req: Request, res: Response) {
        try {
            const merchantId = req.user._id
            const { productId } = req.params
            await this.deleteProduct.execute(productId, merchantId)
    
            res.status(HTTP_STATUS.OK).json({ success: true, msg: `Product details successfully deleted`})
        } catch (error) {
            if (error instanceof Error) {
                res.status(HTTP_STATUS.FORBIDDEN).json({ success: false, msg: `${error.message}` })
                throw error
            }
            throw error
        }
    }

    async isProductAvailable(req: Request, res: Response) {
        try {
            const payload = req.body
            const {availableProducts,unavailableProducts } = await this.productAvailable.execute(payload)
            res.status(HTTP_STATUS.OK).json({ success: true, msg: `Below is your product information `, availableProducts: availableProducts, outOfStock: unavailableProducts })
        } catch (error) {
            if (error instanceof Error) {
                res.status(HTTP_STATUS.FORBIDDEN).json({ success: false, msg: `${error.message}` })
                throw error
            }
            throw error
        }
    }

    async getByCategory(req:Request, res:Response) {
        try{
            const payload = req.query
            const products = await this.getCategory.execute(payload)
            res.status(HTTP_STATUS.OK).json({ success: true, msg: `Below is your product information `, data : products })


        }catch(error){
            if (error instanceof Error ) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({success: false , msg:`${error.message}`})
                throw new Error(`${error.message}`)
            } 
            throw error

        }

    }

    async upload(req: Request , res: Response) {
        try {
            const {productId} = req.params
            const payload = req.files 
            const product = await this.uploadPhoto.execute(payload, productId)
            res.status(200).json({success: true , msg:`Photo successfully uploaded`, data:  product})
        }catch (error){
            if (error instanceof Error ) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({success: false , msg:`${error.message}`})
                throw new Error(`${error.message}`)
            } 
            throw error
        }
    }

}



export default ProductController