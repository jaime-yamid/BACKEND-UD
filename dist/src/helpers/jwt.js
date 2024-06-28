"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const generateJWT = (_id, user = "", expiresIn = process.env.EXPIRES_IN, jwtSecret = process.env.JWT_SECRET) => {
    // RESUELVAMOS LA PROMESA 
    return new Promise((resolve, reject) => {
        const payload = {
            _id,
            user,
        };
        jwt.sign(payload, jwtSecret, {
            expiresIn: expiresIn // cuando va a exprtar el token que generamos en jwtSecret , la varibal eexpres es la que defini 
            // en 12 horas como tal 
        }, (error, token) => {
            if (error) {
                console.log(error);
                reject("NO SE PUDO GENERAR EL TOKEN");
            }
            else
                resolve(token);
        });
    });
};
exports.default = generateJWT;
//# sourceMappingURL=jwt.js.map