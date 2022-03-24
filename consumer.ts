import amqp from "amqp-connection-manager";
import WishlistModel from "./src/infra/database/models/mongoose/wishlist";
import ProductModel from "./src/infra/database/models/mongoose/product";
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

    channel.assertQueue(`customer_deleted`, { durable: true })
    channel.assertQueue(`merchant_deleted`, { durable: true })
    channel.assertQueue(`order_failed`, { durable: false })
      

    //consume messages

    channel.consume(`customer_deleted`, async (messageBuffer: Message | null) => {
      const msg = messageBuffer;
      const message = JSON.parse(msg!.content.toString());
      const customerId = message
      const customer = await WishlistModel.findOneAndDelete({customerId: customerId})
      if(!customer) {
        console.log(`The Deleted Customer account does not have a wishlist`)
      }else{
        console.log(`Wishlist removed for customer with ID: ${customerId}`)
      }
      

    }, {noAck: true})

    channel.consume(`merchant_deleted`, async (messageBuffer: Message | null) => {
      const msg = messageBuffer;
      const message = JSON.parse(msg!.content.toString());
      const merchantId = message
      const merchant = await ProductModel.findOneAndDelete({merchantId: merchantId})
      if(!merchant) {
        console.log(`The Deleted Merchant account does not have Products`)
      }else{
        console.log(`Wishlist removed for merchant with ID: ${merchantId}`)

      }
      
      

    }, {noAck: true})

    channel.consume(`order_failed`, async (messageBuffer: Message | null) => {
      const msg = messageBuffer;
      const message = JSON.parse(msg!.content.toString());
      let orderId = message.order.orderId

      message.order.products.map(async (item: any)=> {
          const productId = item.id
          const orderQty = item.quantity
          const product = await ProductModel.findOne({_Id: productId})
          const newQty = product!.quantity + orderQty
          product!.quantity = newQty
          product!.sold = product!.sold - orderQty
          product!.save()
          
      })

      console.log(`Products reinstated for failed order with ID: ${orderId}`)

    }, {noAck: true})




        
    }
})

channelWrapper.on("close", () => {
    logger.info("RabbitMq channel has closed");
});


export default channelWrapper
