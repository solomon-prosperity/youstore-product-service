import { asValue, Lifetime, asClass,asFunction, InjectionMode, createContainer} from "awilix"
import {scopePerRequest} from "awilix-express"
import database from "./infra/database/mongoose"
import router from "./interface/http/router/routes"
import restServer from "./interface/http/server"
import Logger from "./interface/http/utils/logger"
import productModel from "./infra/database/models/mongoose/product"
import reviewModel from "./infra/database/models/mongoose/review"
import config from "config"
import CreateProduct from "./usecases/products/createProduct"
import GetProduct from "./usecases/products/getProduct"
import GetProducts from "./usecases/products/getProducts"
import UpdateProduct from "./usecases/products/updateProduct"
import DeleteProduct from "./usecases/products/deleteProduct"
import ProductRepository from "./infra/repository/productRepository"
import CreateReview from "./usecases/reviews/createReview"
import GetReview from "./usecases/reviews/getReview"
import GetReviews from "./usecases/reviews/getReviews"
import UpdateReview from "./usecases/reviews/updateReview"
import DeleteReview from "./usecases/reviews/deleteReview"
import ReviewRepository from "./infra/repository/reviewRespository"
//import Messenger from "./infra/libs/rabbitmq"


const container = createContainer({
    injectionMode: InjectionMode.PROXY
})

container.register({
  currentUser: asValue({}), // User will be added from auth middleware...
});

container.register({
    containerMiddleware: asValue(scopePerRequest(container)),
   // models: asValue(models),
    database: asClass(database),
    //customerController: asClass(CustomerController)
    restServer: asClass(restServer),
    router: asFunction(router),
    logger: asValue(Logger),
    productModel: asValue(productModel),
    reviewModel: asValue(reviewModel),
    config: asValue(config),
    createProduct: asClass(CreateProduct),
    getProduct: asClass(GetProduct),
    getProducts: asClass(GetProducts),
    updateProduct: asClass(UpdateProduct),
    deleteProduct: asClass(DeleteProduct),
    productRepository: asClass(ProductRepository),

    createReview: asClass(CreateReview),
    getReview: asClass(GetReview),
    getReviews: asClass(GetReviews),
    updateReview: asClass(UpdateReview),
    deleteReview: asClass(DeleteReview),
    reviewRepository: asClass(ReviewRepository),
    //messenger: asClass(Messenger)
    

})







// load all repositories
  container.loadModules(
    [
      [
        "./infra/repository/*.ts",
        {
          lifetime: Lifetime.SCOPED,
          register: asClass,
        },
      ],
    ],
    {
      // we want all files to be registered in camelCase.
      formatName: "camelCase",
      resolverOptions: {},
      cwd: __dirname,
    }
  );


// load all usecases
container.loadModules(
    [
      [
        "./usecases/customers/*.ts",
        {
          lifetime: Lifetime.SCOPED,
          register: asClass,
        },
      ],
    ],
    {
      // we want all files to be registered in camelCase.
      formatName: "camelCase",
      resolverOptions: {},
      cwd: __dirname,
    }
  );


  
export default container