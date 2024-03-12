"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const validateJWT = (req, res, next) => {
    const token = req.header("x-token"); // caracteristica del token  
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: " no hay token en la peticion,"
        });
    }
    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET);
        req._id = _id;
        next();
    }
    catch (error) {
        return res.status(401).json({});
    }
};
exports.default = validateJWT;
//# sourceMappingURL=validate-jwt.js.map