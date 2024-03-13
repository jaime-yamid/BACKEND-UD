"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const validate_fields_1 = require("../middlewares/validate-fields");
const producto_controller_1 = require("../controllers/producto.controller");
const validate_jwt_1 = __importDefault(require("../middlewares/validate-jwt"));
const router = express_1.default.Router();
router.post('/', validate_jwt_1.default, [
    (0, express_validator_1.check)("nombre", "El Nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("precio", "El precio es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("categoria", "La categoria es obligatorio").not().isEmpty(), validate_fields_1.validateFields,
], producto_controller_1.crearProducto); // Asegúrate de que sea POST
router.get("/", validate_jwt_1.default, producto_controller_1.getProductos);
exports.default = router;
//# sourceMappingURL=producto.route.js.map