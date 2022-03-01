import express from "express";
 import { makeInvoker } from "awilix-express";
 import ReviewController from "../../controllers/reviewController"

 const api = makeInvoker(ReviewController);
 const router = express.Router();

 router
      .route("/:productId/review")
      .post(api('create'))
      //.get(api('getAll'))


  router
      .route("/:reviewId")
      .get(api('get'))
      .put(api('update'))
      .delete(api('delete'))

  export default router;
