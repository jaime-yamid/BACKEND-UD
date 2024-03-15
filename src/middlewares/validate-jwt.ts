import { NextFunction } from "connect";
import { Request, Response } from "express";

const jwt = require("jsonwebtoken");

// la interfaz de custom request excede las funcionalidades del request como tal 
export interface CustomRequest extends Request {
    _id?: number;
}


const validateJWT = (req: CustomRequest, res: Response, next: NextFunction) => {
const token = req.header("x-token"); // caracteristica del token  
if(!token){
    return res.status(401).json({
        ok: false,
        msg: " no hay token en la peticion,"
    })
} 
try{
const { _id } = jwt.verify(token, process.env.JWT_SECRET)
req._id = _id;
next();
}catch (error){
    return res.status(401).json ({

    });
}
};

export const validateJWTpass = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.header("x-token-pass"); // caracteristica del token  
    if(!token){
        return res.status(401).json({
            ok: false,
            msg: " no hay token en la peticion,"
        })
    } 
    try{
    const { _id } = jwt.verify(token, process.env.JWT_SECRET_PASS)
    req._id = _id;
    next();
    }catch (error){
        return res.status(401).json ({
    
        });
    }
    };



export default validateJWT
