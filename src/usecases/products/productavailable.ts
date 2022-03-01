import { query } from "express"
import { object } from "joi"
// import ProductRepository from "../../infra/repository/productRepository"
// import log from "../../interface/http/utils/logger"

// class ProductAvailable{
//     productRepository: ProductRepository
//     logger: typeof log
//     constructor({productRepository, logger}: {productRepository: ProductRepository, logger: typeof log}) {
//         this.productRepository = productRepository
//         this.logger = logger
//     }

//     async execute(products: {[name: string] : number}) {
//         try {
//             const Prodkeys = Object.keys(products)
//             Prodkeys.forEach(async (prodkey) => {
//                 const result = await this.productRepository.find({name: prodkey, quantity: {$gte: products[prodkey]}})
//             if (!result){
//                 throw Error
//             }       
//             })
//         } catch (error) {
//             this.logger.error(error)
//         }
//     }

    
// }



// export default ProductAvailable