"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const validate_fields_1 = require("../middlewares/validate-fields");
const auth_controller_1 = require("../controllers/auth.controller");
//path:/api/v1/aut
const router = express_1.default.Router();
// las cosas que se reciben
router.post('/', [
    (0, express_validator_1.check)("login", "El login es obiligatorio").not().isEmpty(),
    (0, express_validator_1.check)("password", "El password es obiligatorio").not().isEmpty(),
    validate_fields_1.validateFields,
], auth_controller_1.login); // Asegúrate de que sea POST
//exportando mi ruta
exports.default = router;
//# sourceMappingURL=auth.router.js.map