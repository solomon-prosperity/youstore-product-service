import express from "express";
import { makeInvoker } from "awilix-express";
import ProductController from "../../controllers/productController"
import { verifyMerchant } from "../../middlewares/verifyMerchantToken";

const api = makeInvoker(ProductController);
const router = express.Router();

router
     .route("/")
     .post(verifyMerchant, api('create'))
     .get(api('getAll'))


 router
     .route("/:productId")
     .get(api('get'))
     .put(verifyMerchant,api('update'))
     .delete(verifyMerchant, api('delete'))

 router.post('/available', api('isProductAvailable'))

 export default router;
