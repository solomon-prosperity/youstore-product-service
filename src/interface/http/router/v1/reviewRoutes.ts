import express from "express";
 import { makeInvoker } from "awilix-express";
 import ReviewController from "../../controllers/reviewController"
 import { verifyCustomer } from "../../middlewares/verifyCustomer";


 const api = makeInvoker(ReviewController);
 const router = express.Router();

 router
      .route("/:productId/review")
      .post( verifyCustomer , api('create'))
      .get(api('getAll'))


  router
      .route("/:reviewId")
      .get(api('get'))
      .put(verifyCustomer, api('update'))
      .delete(verifyCustomer, api('delete'))

  export default router;
