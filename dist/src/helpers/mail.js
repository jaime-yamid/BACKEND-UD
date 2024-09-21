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
const enviarCorreoInteraccion = (nombre, email, tempPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Recuperación de Contraseña</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      width: 100%;
      padding: 20px;
      background-color: #f4f4f4;
    }
    .email-content {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .email-header {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid #007bff;
      border-radius: 10px;
      padding: 10px;
      background-color: #ffffff;
      margin-bottom: 20px;
    }
    .email-header img {
      max-width: 150px;
      height: auto;
      margin-right: 20px;
    }
    .email-header h1 {
      color: #007bff;
      font-size: 24px;
      margin: 0;
    }
    .email-body {
      text-align: center;
      padding-bottom: 20px;
       margin-top: 80px;
    }
    .email-body p {
      font-size: 18px;
      color: #333333;
    }
    .temp-password {
      font-size: 20px;
      font-weight: bold;
      color: #007bff;
      padding: 10px;
      background-color: #f9f9f9;
      border: 1px solid #ddd;
      display: inline-block;
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #666666;
      padding-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="email-content">
      <div class="email-header">
        <img src="https://sibcolombia.net/wp-content/uploads/2016/06/logo-udistrital.png" alt="Logo">
        <h1>Recuperación de Contraseña</h1>
      </div>
      <div class="email-body">
        <p>Hola ${nombre},</p>
        <p>Hemos recibido una solicitud para restablecer tu contraseña.</p>
        <p>Tu nueva contraseña temporal es:</p>
        <div class="temp-password">${tempPassword}</div>
        <p>Por favor, utiliza esta contraseña temporal para iniciar sesión. Recuerda que es válida durante los próximos 2 minutos.</p>
        <p>Si no solicitaste este cambio, puedes ignorar este correo.</p>
      </div>
    </div>
    <div class="footer">
      <p>© 2024 Universidad Francisco José de Caldas. Todos los derechos reservados.</p>
    </div>
  </div>
</body>
</html>

`;
    try {
        yield transporter.sendMail({
            from: '"Tu Aplicación" <tu-email@gmail.com>',
            to: email,
            subject: "Recuperación de Contraseña",
            text: `Tu nueva contraseña temporal es: ${tempPassword}. Esta contraseña expirará en 2 minutos.`,
            html: htmlContent,
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