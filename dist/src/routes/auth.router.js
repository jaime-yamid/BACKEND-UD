"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const validate_fields_1 = require("../middlewares/validate-fields");
const auth_controller_1 = require("../controllers/auth.controller");
const validate_jwt_1 = __importDefault(require("../middlewares/validate-jwt"));
const validate_jwt_2 = __importDefault(require("../middlewares/validate-jwt"));
//path:/api/v1/aut
const router = express_1.default.Router();
// las cosas que se reciben
router.post('/', [
    (0, express_validator_1.check)("user", "El user es obiligatorio").not().isEmpty(),
    (0, express_validator_1.check)("password", "El password es obiligatorio").not().isEmpty(),
    validate_fields_1.validateFields,
], auth_controller_1.user); // Asegúrate de que sea POST
router.post('/olvidocontrasena', [
    (0, express_validator_1.check)("user", "El user es obiligatorio").not().isEmpty(),
    (0, express_validator_1.check)("numeroDocumento", "El numero de Documento es obiligatorio").not().isEmpty(),
    validate_fields_1.validateFields,
], auth_controller_1.olvidocontraseña); // Asegúrate de que sea POST
router.put('/cambiocontrasena', validate_jwt_2.default, [
    (0, express_validator_1.check)("password", "Se necesita digital contraseña nueva").not().isEmpty(),
    validate_fields_1.validateFields,
], auth_controller_1.cambiocontraseña); // Asegúrate de que sea POST
router.get("/", validate_jwt_1.default, auth_controller_1.renewToken);
router.put("/", validate_jwt_1.default, auth_controller_1.updateNewPassword);
//exportando mi ruta
exports.default = router;
//# sourceMappingURL=auth.router.js.map