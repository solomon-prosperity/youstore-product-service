import express from "express";
import { makeInvoker } from "awilix-express";
import ProductController from "../../controllers/productController"

const api = makeInvoker(ProductController);
const router = express.Router();

router
     .route("/")
     .post(api('create'))
     .get(api('getAll'))


 router
     .route("/:productId")
     .get(api('get'))
     .put(api('update'))
     .delete(api('delete'))

 router.post('/available', api('isProductAvailable'))

 export default router;
