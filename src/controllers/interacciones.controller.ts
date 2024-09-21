import { Request, Response } from "express";
import UsuarioModel from "../models/Usuario.model";
import bcrypt from "bcryptjs";
import { enviarCorreoInteraccion } from "../helpers/mail";


export const solicitarRecuperacion = async (req: Request, res: Response) => {
  const {nombre, email } = req.body;

  try {
    const usuario = await UsuarioModel.findOne({ nombre , email });
    if (!usuario) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }

    // Generar una contraseña temporal
    const tempPassword = Math.random().toString(36).slice(-8); // Genera una contraseña temporal de 8 caracteres
    const salt = bcrypt.genSaltSync(10);
    const hashedTempPassword = bcrypt.hashSync(tempPassword, salt);

    // Guardar la contraseña original
    const originalPassword = usuario.password;

    // Actualizar el usuario con la contraseña temporal y la fecha de expiración
    usuario.password = hashedTempPassword;
    usuario.tempPasswordExpiration = new Date(Date.now() + 2 * 60 * 1000); // 20 minutos
    await usuario.save();

    // Enviar correo con la contraseña temporal
    await enviarCorreoInteraccion(usuario.nombre, email, tempPassword);

    // Configurar un temporizador para restaurar la contraseña original después de 20 minutos
    setTimeout(async () => {
      const usuarioActualizado = await UsuarioModel.findOne({ email });
      if (usuarioActualizado && usuarioActualizado.tempPasswordExpiration && usuarioActualizado.tempPasswordExpiration < new Date()) {
        console.log(`Restaurando la contraseña original para el usuario ${usuarioActualizado.email}.`);
        usuarioActualizado.password = originalPassword; // Restaurar la contraseña original

        usuarioActualizado.tempPasswordExpiration = undefined; // Limpiar la expiración
        await usuarioActualizado.save();
      }
    }, 2 * 60 * 1000); // 20 minutos


    res.status(200).json({
      ok: true,
      msg: "Correo de recuperación enviado exitosamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Ocurrió un error al procesar la solicitud de recuperación",
    });
  }
};