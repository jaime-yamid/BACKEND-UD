// los middlewares son funciones que se van a ejecturar antes del controlador optimizo los recursos
// y no ir a la base de datos si tengo error

import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const validateFields = (req: Request, res: Response, next: NextFunction) => {
    const errores = validationResult(req);
    // si hay un error que me muestre los errores 
    if(!errores.isEmpty()){
        return res.status(400).json({
            ok:false,
            errores: errores.mapped(),

        });
    }
    // si todo esta bien entoces le pasa a next 
    next()
};
