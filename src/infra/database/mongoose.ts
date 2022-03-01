// import mongoose from "mongoose";
// import config from "config";
// import logger from "../../interface/http/utils/logger";



// const connectDb = async () => {
//    try {
//    const dbUri = config.get<string>("dbUri");
//    await mongoose.connect(dbUri);
//    logger.info("connected to Database");
//    } catch (error) {
//        logger.error("Could not connect to db");
//        process.exit(1);
//    }
// }
   


// export default connectDb;

import mongoose from "mongoose";
//import beautifyUnique from "mongoose-beautiful-unique-validation";

class MongoDbManager {
    config: any;
    logger: any;
    
  constructor({ config, logger }: any) {
    mongoose.Promise = global.Promise;
    // initialize beautifyUnique on all schema
    //mongoose.plugin(beautifyUnique);
    this.config = config;
    this.logger = logger;
  }

  async connect(poolSize = 25, autoIndex = true) {
    const dbName = this.config.get("name");
    const connectionString = `mongodb+srv://${encodeURIComponent(
      this.config.get("user")
    )}:${encodeURIComponent(this.config.get("password"))}@${this.config.get(
      "host"
    )}/youstore-products?retryWrites=true&w=majority`;


    const options = {
      //poolSize, // Maintain up to 20 (default if not specified) socket connections,
      useNewUrlParser: true,
     // useFindAndModify: false,
      //useCreateIndex: true,
      useUnifiedTopology: true,
      autoIndex,
      ssl: true,
      dbName
    };
    // if (this.config.get("database.auth")) {
    //   options.user = encodeURIComponent(this.config.get("database.user"));
    //   options.pass = encodeURIComponent(this.config.get("database.password"));
    // }

    this.logger.info("Connecting to MongoDB database...");
    await mongoose.connect(decodeURIComponent(connectionString), options).catch((error) => {
      console.log(connectionString)
      console.log(dbName)
      this.logger.info("Error while connecting to MongoDB database");
      this.logger.error(error);
      process.exit(1);
    });

    if (this.config.get("env") === "development") {
      mongoose.set("debug", true);
    }

    this.logger.info("Connected to MongoDB database");
  }

  async close() {
    this.logger.debug("Closing database...");

    await mongoose.connection.close().catch((error) => {
      this.logger.info("Error while closing MongoDB database");
      this.logger.error(error);
      process.exit(1);
    });

    this.logger.info("MongoDB Database closed");
  }
}

export default MongoDbManager;
