// import { query } from "express"
// import { object } from "joi"
// import ProductRepository from "../../infra/repository/productRepository"
// import log from "../../interface/http/utils/logger"

// class ProductAvailable{
//     productRepository: ProductRepository
//     logger: typeof log
//     constructor({productRepository, logger}: {productRepository: ProductRepository, logger: typeof log}) {
//         this.productRepository = productRepository
//         this.logger = logger
//     }

//     async execute(products: any) {
//         try {
//             const Prodkeys = Object.keys(products)
//             Prodkeys.forEach(async (prodkey) => {
//                 const result = await this.productRepository.find({_id: prodkey, quantity: {$gte: products[prodkey]}})
//                 if (!result){
//                 return false
//             }
//             })
//         } catch (error) {
//             this.logger.error(error)
//         }
//     }

    
// }



// export default ProductAvailable