"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const validate_fields_1 = require("../middlewares/validate-fields");
const Usuario_controller_1 = require("../controllers/Usuario.controller");
const router = express_1.default.Router();
router.post('/', [
    (0, express_validator_1.check)("nombre", "El Nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("email", "El email es obligatorio").not().isEmpty().isEmail(),
    (0, express_validator_1.check)("telefono", "El telefono es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("tipoDocumento", "El tipo de documento es obiligatorio").not().isEmpty(),
    (0, express_validator_1.check)("numeroDocumento", "El numero de  documento es obiligatorio").not().isEmpty(),
    (0, express_validator_1.check)("login", "El login es obiligatorio").not().isEmpty(),
    (0, express_validator_1.check)("password", "El password es obiligatorio").not().isEmpty(),
    validate_fields_1.validateFields,
], Usuario_controller_1.crearUsuario); // Asegúrate de que sea POST
//exportando mi ruta
exports.default = router;
//# sourceMappingURL=usuario.route.js.map