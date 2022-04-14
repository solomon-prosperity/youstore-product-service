import { query } from "express"
import { object } from "joi"
import ProductRepository from "../../infra/repository/productRepository"
import log from "../../interface/http/utils/logger"


class ProductAvailable{
    productRepository: ProductRepository
    logger: typeof log
    productModel: any
    constructor({productRepository, logger, productModel}: {productRepository: ProductRepository, logger: typeof log, productModel: any}) {
        this.productRepository = productRepository
        this.logger = logger
        this.productModel = productModel
    }

    async execute(payload: any) {
        try {
            let isAvailable;
            let availableProducts: any= []
            let unavailableProducts: any= []
            const totalProducts = payload.order.products.length
            for(var i = 0; i < totalProducts; i++){
                let productId = payload.order.products[i].id
                let orderQty = payload.order.products[i].quantity
            
                    const products = await this.productModel.find({_id : productId})
                    products.forEach(async (product: any) => {
                        if (!product) throw new Error(`product not found`)
                        if (orderQty > product.quantity || orderQty <= 0) {
                            isAvailable = false
                            console.log(`${product.name} is out of stock`)
                            unavailableProducts.push(product.name)
                        } else {
                            isAvailable = true
                            
                            availableProducts.push(product.name)
                            const newQty = product.quantity - orderQty
                            product.quantity = newQty
                            product.sold = orderQty
                            product.save()
                            console.log(`${product.name} reserved`)
                        }
                        
                    })
            
            }
             return {availableProducts,unavailableProducts}
        
        } catch (error) {
            throw error
        }
    }

    
}


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
export default ProductAvailable