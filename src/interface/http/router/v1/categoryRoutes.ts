import express from "express";
 import { makeInvoker } from "awilix-express";
 import CategoryController from "../../controllers/categoryController"

 const api = makeInvoker(CategoryController);
 const router = express.Router();

 router
      .route("/")
      .post(api('create'))
      .get(api('getAll'))


  router
      .route("/:categoryId")
      .get(api('get'))
      .put(api('update'))
      .delete(api('delete'))

  //router.get('/available', api('productAvailable'))
  export default router;