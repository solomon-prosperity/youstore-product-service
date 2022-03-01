import express from "express";
import routerV1 from "./v1"
import { Request, Response } from "express";
//import {scopePerRequest} from "awilix-express"
//import container from "../../../container" 

export default ({containerMiddleware}: any) => {
    const apiRouter = express.Router();

   apiRouter.use(express.json());
   apiRouter.use(containerMiddleware);

    apiRouter
    .route("/")
    .get((req: Request , res: Response) => {
        res.status(200).json({
            message: "API v1  is running",
            env: process.env.NODE_ENV,
            serviceName: process.env.SERVICE_NAME,
          });
    })

    apiRouter.use('/v1', routerV1)

    return apiRouter
}