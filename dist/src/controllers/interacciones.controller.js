"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.solicitarRecuperacion = void 0;
const Usuario_model_1 = __importDefault(require("../models/Usuario.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mail_1 = require("../helpers/mail");
const solicitarRecuperacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, email } = req.body;
    try {
        const usuario = yield Usuario_model_1.default.findOne({ nombre, email });
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: "Usuario no encontrado",
            });
        }
        // Generar una contraseña temporal
        const tempPassword = Math.random().toString(36).slice(-8); // Genera una contraseña temporal de 8 caracteres
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hashedTempPassword = bcryptjs_1.default.hashSync(tempPassword, salt);
        // Guardar la contraseña original
        const originalPassword = usuario.password;
        // Actualizar el usuario con la contraseña temporal y la fecha de expiración
        usuario.password = hashedTempPassword;
        usuario.tempPasswordExpiration = new Date(Date.now() + 20 * 60 * 1000); // 20 minutos
        yield usuario.save();
        // Enviar correo con la contraseña temporal
        yield (0, mail_1.enviarCorreoInteraccion)(email, tempPassword);
        // Configurar un temporizador para restaurar la contraseña original después de 20 minutos
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            const usuarioActualizado = yield Usuario_model_1.default.findOne({ email });
            if (usuarioActualizado && usuarioActualizado.tempPasswordExpiration && usuarioActualizado.tempPasswordExpiration < new Date()) {
                usuarioActualizado.password = originalPassword; // Restaurar la contraseña original
                usuarioActualizado.tempPasswordExpiration = undefined; // Limpiar la expiración
                yield usuarioActualizado.save();
            }
        }), 20 * 60 * 1000); // 20 minutos
        res.status(200).json({
            ok: true,
            msg: "Correo de recuperación enviado exitosamente",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: "Ocurrió un error al procesar la solicitud de recuperación",
        });
    }
});
exports.solicitarRecuperacion = solicitarRecuperacion;
//# sourceMappingURL=interacciones.controller.js.map