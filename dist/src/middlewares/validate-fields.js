"use strict";
// los middlewares son funciones que se van a ejecturar antes del controlador optimizo los recursos
// y no ir a la base de datos si tengo error
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFields = void 0;
const express_validator_1 = require("express-validator");
const validateFields = (req, res, next) => {
    const errores = (0, express_validator_1.validationResult)(req);
    // si hay un error que me muestre los errores 
    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errores: errores.mapped(),
        });
    }
    // si todo esta bien entoces le pasa a next 
    next();
};
exports.validateFields = validateFields;
//# sourceMappingURL=validate-fields.js.map