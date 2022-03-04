import amqp from "amqp-connection-manager";
import { Channel, Message } from "amqplib";
import dotenv from "dotenv";
dotenv.config()

import container from "./src/container"

const {
    logger: logging,
  } = container.cradle;

  const logger = {
    info: console.info,
    error: console.error,
  };

// Create a connection manager
const amqp_url = process.env.AMQP_URL || "";
logger.info("Connecting to RabbitMq...");
const connection = amqp.connect(amqp_url);


connection.on("connect", () => logger.info("RabbitMq is connected!"));
connection.on("disconnect", () => logger.info("RabbitMq disconnected. Retrying..."));


// Create a channel wrapper
const channelWrapper = connection.createChannel({
    json: true,
  setup(channel: Channel) {
      
        
    }
})

channelWrapper.on("close", () => {
    logger.info("RabbitMq channel has closed");
});


export default channelWrapper