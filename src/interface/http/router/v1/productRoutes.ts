import express from "express";
import { makeInvoker } from "awilix-express";
import ProductController from "../../controllers/productController"
import { verifyMerchant } from "../../middlewares/verifyMerchantToken";
import upload from "../../../../infra/libs/fileUploader";

const api = makeInvoker(ProductController);
const router = express.Router();

router
     .route("/")
     .post(verifyMerchant, api('create'))
     .get(api('getAll'))


 router.get("/:productId/one", api("get"))
 
 router.put("/:productId/edit", verifyMerchant,api('update'))
 router.delete("/:productId/remove", verifyMerchant, api('delete'))
     
     

 router.post('/available', api('isProductAvailable'))
 router.post('/:productId/upload', upload.array('images', 4), api('upload') )
 router.get('/category', api('getByCategory'))
 router.get('/merchant-products', verifyMerchant, api('getAllMerchantProduct'))


 export default router;
