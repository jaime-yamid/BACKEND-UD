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
Object.defineProperty(exports, "__esModule", { value: true });
exports.enviarCorreoInteraccion = void 0;
const nodemailer = require("nodemailer");
// crea un transportador que conecta y hace el envio del mail
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "firmadigitalud@gmail.com",
        pass: "ozyx cofw hnyr zwof",
    },
});
const enviarCorreoInteraccion = (email, tempPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield transporter.sendMail({
            from: '"Tu Aplicación" <tu-email@gmail.com>',
            to: email,
            subject: "Recuperación de Contraseña",
            text: `Tu nueva contraseña temporal es: ${tempPassword}. Esta contraseña expirará en 20 minutos.`,
            html: `<p>Tu nueva contraseña temporal es: <b>${tempPassword}</b>. Esta contraseña expirará en 20 minutos.</p>`
        });
        console.log("Correo electrónico enviado: %s");
    }
    catch (error) {
        console.error("Error al enviar el correo electrónico:", error);
        throw error;
    }
});
exports.enviarCorreoInteraccion = enviarCorreoInteraccion;
//# sourceMappingURL=mail.js.map