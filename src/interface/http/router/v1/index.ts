import express from "express";
// import other routes
//import dummyRouter from "./dummyRouter";

//import userRouter from "./userRouter"


import productRoutes from "./productRoutes"
import reviewRoutes from "./reviewRoutes"

const router = express.Router();

router.use("/products" , productRoutes)
router.use("/product/" , reviewRoutes)
// mount routes
//router.use("/dummy", dummyRouter);

//router.use("/user", userRouter)

export default router;
