import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import HTTP_STATUS from 'http-status-codes'
import dotenv from "dotenv"
dotenv.config()

export const verifyCustomer = (req: Request , res: Response , next: NextFunction) =>  {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')){
        res.status(HTTP_STATUS.UNAUTHORIZED).json({success: false , msg:`Access Denied`})
        throw new Error(`Access Denied!`)
    } 
    
    const token = authHeader.split(' ')[1]
const secret = process.env.CUSTOMER_JWT_SECRET

try {
 // verify token and save customer Id to the verified variable
 const verified = jwt.verify(token, `${secret}` )
 req.user = verified;

 next()
} catch (error) {
    if (error instanceof Error ) {
        throw new Error(`${error.message}`)
    }
    throw error
}

}


