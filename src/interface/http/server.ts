// import express from "express";
// const app = express();
// const {container}= require ("../../container")


// import dotenv from "dotenv";
// dotenv.config();
// import config from "config";
// import connectDb from "../../infra/database/mongoose";
// import logger from "./utils/logger";
// import { scopePerRequest, loadControllers } from "awilix-express";

// import router from "./router/routes"


// const port = config.get<number>("port");


// app.use(router())

// app.use(express.json());
//  app.use(scopePerRequest(container))
//  app.use(loadControllers('../controllers/*.ts', { cwd: __dirname }))


// app.listen(port, async () => {
//     logger.info(`App is running at http://localhost:${port}`);
//     await connectDb()
// });

import express from "express";
import http from "http";



class Server {
    config: any;
    router: any;
    logger: any;
    express: any;
    
    constructor({ config, router, logger }: any) {
        this.config = config;
        this.logger = logger;
        this.express = express();
        this.express.disable("x-powered-by");
        this.express.use(router);
        this.express.app = http.createServer(this.express);
       
      }
    
      start() {
        return new Promise((resolve) => {
          const server = this.express.app.listen(this.config.get("httpPort"), () => {
            const { port } = server.address();
            this.logger.info(`[pid ${process.pid}] REST server Listening on port ${port}`);
            return resolve(this.express.server);
          });
        });
      }
}

export default Server