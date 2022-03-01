// import amqp, { Channel, Connection, Message } from "amqplib";
// import dotenv from "dotenv"
// dotenv.config()


// export interface IMessenger {
//   createChannel(): Promise<void>;
//   sendToQueue(queue: string, content: Object): Promise<void>;
//   assertQueue(queue: string): Promise<void>;

// }

// export class Messenger implements IMessenger {
//   private channel!: Channel;
  

//   async createChannel(): Promise<void> {
//     const amqp_url = process.env.AMQP_URL || "";
//     const connection: Connection = await amqp.connect(amqp_url);

//     this.channel = await connection.createChannel();
//   }
//   async assertQueue(queue: string): Promise<void> {
//     await this.channel.assertQueue(queue, {
//       durable: false,
//     });
//   }
//   async sendToQueue(queue: string, content: Object): Promise<void> {
//     await this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(content)));
//   }


// }

// export default Messenger;