import express from "express";
 import { makeInvoker } from "awilix-express";
 import WishlistController from "../../controllers/wishlistController"
 import { verifyCustomer } from "../../middlewares/verifyCustomer";


 const api = makeInvoker(WishlistController);
 const router = express.Router();

 router
      .route("/")
      .post(verifyCustomer, api('create'))


  router
      .route("/products")
      .get(verifyCustomer, api('get'))

  router
      .route("/product/:wishlistId")
      .delete(verifyCustomer, api('remove'))

  //router.get('/available', api('productAvailable'))
  export default router;