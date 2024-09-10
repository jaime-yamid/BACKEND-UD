"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validate_fields_1 = require("../middlewares/validate-fields");
const interacciones_controller_1 = require("../controllers/interacciones.controller");
const router = (0, express_1.Router)();
router.post("/", [
    (0, express_validator_1.check)("nombre", "El nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("email", "El email es obligatorio").not().isEmpty().isEmail(),
    validate_fields_1.validateFields,
], interacciones_controller_1.solicitarRecuperacion);
exports.default = router;
//# sourceMappingURL=interaccion.route.js.map