import dotenv from "dotenv"
dotenv.config()

const config = {
  
    auth: process.env.DATABASE_IS_AUTH,
    httpPort: process.env.PORT || process.env.HTTP_PORT,
    port: process.env.DATABASE_PORT,
    host: process.env.DATABASE_HOST,
    name: process.env.DATABASE_NAME,
    env: process.env.NODE_ENV,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD

  };
  
  export default config;
  