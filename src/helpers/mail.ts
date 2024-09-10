import { InteraccionInterface } from "../models/interacciones.models";


const nodemailer = require("nodemailer");
// crea un transportador que conecta y hace el envio del mail

const transporter = nodemailer.createTransport({
  service:"gmail",
  auth: {
    user: "firmadigitalud@gmail.com",
    pass: "ozyx cofw hnyr zwof",
  },
});

export const enviarCorreoInteraccion =  async (email: string, tempPassword: string) => {
  try {
    await transporter.sendMail({
      from: '"Tu Aplicación" <tu-email@gmail.com>',
      to: email,
      subject: "Recuperación de Contraseña",
      text: `Tu nueva contraseña temporal es: ${tempPassword}. Esta contraseña expirará en 20 minutos.`,
      html: `<p>Tu nueva contraseña temporal es: <b>${tempPassword}</b>. Esta contraseña expirará en 20 minutos.</p>`
    });

    console.log("Correo electrónico enviado: %s");
  } catch (error) {
    console.error("Error al enviar el correo electrónico:", error);
    throw error;
  }
};