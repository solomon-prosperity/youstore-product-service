import { Request, Response } from "express";
import _pick from "lodash/pick";
import HTTP_STATUS from "http-status-codes"
import ProductRepository from "../../../infra/repository/productRepository";
import CreateProduct from "../../../usecases/products/createProduct";
import DeleteProduct from "../../../usecases/products/deleteProduct";
import GetProduct from "../../../usecases/products/getProduct";
import GetProducts from "../../../usecases/products/getProducts";
import UpdateProduct from "../../../usecases/products/updateProduct";
//import ProductAvailable from "../../../usecases/products/productavailable";

class ProductController {
    createProduct: CreateProduct
    getProduct: GetProduct
    getProducts: GetProducts
    deleteProduct: DeleteProduct
    updateProduct: UpdateProduct
    ProductRepository: ProductRepository
    constructor({createProduct, productRepository, getProduct , getProducts, updateProduct, deleteProduct}: {createProduct: CreateProduct, getProduct: GetProduct, updateProduct: UpdateProduct, deleteProduct: DeleteProduct
        getProducts: GetProducts, productRepository: ProductRepository}) {
        this.createProduct = createProduct
        this.getProduct = getProduct
        this.getProducts = getProducts
        this.updateProduct = updateProduct
        this.deleteProduct = deleteProduct
        this.ProductRepository = productRepository

    } 


    async create(req: Request, res: Response) {
        try {
            const payload = req.body
            const product = await this.createProduct.execute(payload)
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
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, data: error })
        }
    }


    async getAll(req: Request, res: Response) {
        try {
            const payload = req.query
            const products = await this.getProducts.execute(payload)
            res.status(HTTP_STATUS.OK).json({ success: true, msg: `Products successfully retrieved`, data: products })
        } catch (error) {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, data: error })
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
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, data: error })
        }
    }


    async delete(req: Request, res: Response) {
        try {
            const { productId } = req.params
            const product = await this.deleteProduct.execute(productId)
            if (!product) return res.status(404).json({ success: false, msg: `Product with this ID not found` })
            res.status(HTTP_STATUS.OK).json({ success: true, msg: `Product details successfully deleted`, data: product })
        } catch (error) {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, data: error })
        }
    }

    async isProductAvailable(req: Request, res: Response) {
        // try {
        //     const { productId } = req.params
        //     const product = await this.productAvailable.execute(productId)
        //     if (!product) return res.status(404).json({ success: false, msg: `Product with this ID not found` })
        //     res.status(HTTP_STATUS.OK).json({ success: true, msg: `Product details successfully deleted`, data: product })
        // } catch (error) {
        //     res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, data: error })
        // }
    }

}

// for (const item of cart.items) {
//     const { id } = item.product;
//     const { totalProductQuantity } = item;
//     const product = await Product.findById(id);
//     const sold = product.sold + totalProductQuantity;
//     const quantity = product.quantity - totalProductQuantity;
//     await Product.findByIdAndUpdate(id, { sold, quantity });
//   }

export default ProductController