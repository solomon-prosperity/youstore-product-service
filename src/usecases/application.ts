import channelWrapper from "../../consumer";
class Application {
    restServer: any;
    database: any;
    logger: any;
    config: any;
    shutdown: any;


    constructor({ restServer, database, logger, config}: any) {
        this.restServer = restServer;
        this.database = database;
        this.logger = logger;
        this.config = config;
    }

    async start() {
        if (this.database) {
            await this.database.connect();
            //this.logger.info("Connected to MongoDB");

          }
        
        channelWrapper.waitForConnect().then(() => {
            console.log('listening for messages')
        })

        await this.restServer.start();
    }

}

export default Application;
