import UsuarioModel from "../models/Usuario.model"
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import axios from "axios"; // Usamos axios para llamar a la API de Lambda


export const crearUsuario = async (req: Request, res: Response) => {
  const { body } = req;
  const { user, password, numeroDocumento } = body;
  
  console.log(body);
  
  try {
      const existeuser = await UsuarioModel.findOne({
          user: user,
      });

      if (existeuser) {
          return res.status(409).json({
              ok: false,
              msg: `Ya existe el Usuario ${user} creado`,
          });
      }

      // Verificar si el número de documento ya está registrado
    const existeDocumento = await UsuarioModel.findOne({
       numeroDocumento: numeroDocumento, });

    if (existeDocumento) {
      return res.status(409).json({
        ok: false,
        msg: `El número de documento ${numeroDocumento} ya está registrado`,
      });
    }

      // Crear el nuevo usuario inicialmente sin URLs
      const newUsuario = new UsuarioModel({
          ...body,
      });

      const salt = bcrypt.genSaltSync(10);
      newUsuario.password = bcrypt.hashSync(password, salt);

      // Llamar a la API Gateway de Lambda para generar llaves y certificado
      const lambdaResponse = await axios.post(
          'https://cmvpi12gmc.execute-api.us-east-2.amazonaws.com/dev/auth/register',
          { username: user }
      );

      console.log("Respuesta de Lambda:", lambdaResponse.data); // Log de la respuesta

      // Analizar el cuerpo de la respuesta
      const responseBody = JSON.parse(lambdaResponse.data.body);
      
      // Verificar que las URLs estén presentes
      const { publicKeyUrl, privateKeyUrl, certificateUrl } = responseBody.urls;

      if (!publicKeyUrl || !privateKeyUrl || !certificateUrl) {
          return res.status(500).json({
              ok: false,
              msg: "Error al generar las llaves y certificado desde Lambda.",
          });
      }

      // Asignar las URLs al nuevo usuario
      newUsuario.publicKeyUrl = publicKeyUrl;
      newUsuario.privateKeyUrl = privateKeyUrl;
      newUsuario.certificateUrl = certificateUrl;

      // Guardar el nuevo usuario en MongoDB
      const usuarioCreado = await newUsuario.save();

      res.status(200).json({
          ok: true,
          msg: "Usuario creado satisfactoriamente",
          usuarioCreado,
      });
  } catch (error: any) {
    console.error("Error en la llamada a Lambda:", error);

    // Manejo de errores de Axios
    if (axios.isAxiosError(error)) {
        if (error.response) {
            // La solicitud se realizó y el servidor respondió con un código de estado
            console.error("Respuesta del servidor:", error.response.data);
            res.status(error.response.status).json({
                ok: false,
                msg: "Error en la respuesta de Lambda",
                error: error.response.data,
            });
        } else if (error.request) {
            // La solicitud se realizó pero no hubo respuesta
            console.error("No se recibió respuesta:", error.request);
            res.status(500).json({
                ok: false,
                msg: "No se recibió respuesta de Lambda.",
            });
        } else {
            // Algo ocurrió al configurar la solicitud
            console.error("Error en la configuración de la solicitud:", error.message);
            res.status(500).json({
                ok: false,
                msg: "Error en la configuración de la solicitud a Lambda.",
            });
        }
    } else {
        // Errores no relacionados con Axios
        console.error("Error inesperado:", error.message);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado, comuníquese con el administrador.",
        });
    }
}
};
