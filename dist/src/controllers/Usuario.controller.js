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
exports.crearUsuario = void 0;
const Usuario_model_1 = __importDefault(require("../models/Usuario.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const axios_1 = __importDefault(require("axios")); // Usamos axios para llamar a la API de Lambda
const crearUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { user, password, numeroDocumento } = body;
    console.log(body);
    try {
        const existeuser = yield Usuario_model_1.default.findOne({
            user: user,
        });
        if (existeuser) {
            return res.status(409).json({
                ok: false,
                msg: `Ya existe el Usuario ${user} creado`,
            });
        }
        // Verificar si el número de documento ya está registrado
        const existeDocumento = yield Usuario_model_1.default.findOne({
            numeroDocumento: numeroDocumento,
        });
        if (existeDocumento) {
            return res.status(409).json({
                ok: false,
                msg: `El número de documento ${numeroDocumento} ya está registrado`,
            });
        }
        // Crear el nuevo usuario inicialmente sin URLs
        const newUsuario = new Usuario_model_1.default(Object.assign({}, body));
        const salt = bcryptjs_1.default.genSaltSync(10);
        newUsuario.password = bcryptjs_1.default.hashSync(password, salt);
        // Llamar a la API Gateway de Lambda para generar llaves y certificado
        const lambdaResponse = yield axios_1.default.post('https://cmvpi12gmc.execute-api.us-east-2.amazonaws.com/dev/auth/register', { username: user });
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
        const usuarioCreado = yield newUsuario.save();
        res.status(200).json({
            ok: true,
            msg: "Usuario creado satisfactoriamente",
            usuarioCreado,
        });
    }
    catch (error) {
        console.error("Error en la llamada a Lambda:", error);
        // Manejo de errores de Axios
        if (axios_1.default.isAxiosError(error)) {
            if (error.response) {
                // La solicitud se realizó y el servidor respondió con un código de estado
                console.error("Respuesta del servidor:", error.response.data);
                res.status(error.response.status).json({
                    ok: false,
                    msg: "Error en la respuesta de Lambda",
                    error: error.response.data,
                });
            }
            else if (error.request) {
                // La solicitud se realizó pero no hubo respuesta
                console.error("No se recibió respuesta:", error.request);
                res.status(500).json({
                    ok: false,
                    msg: "No se recibió respuesta de Lambda.",
                });
            }
            else {
                // Algo ocurrió al configurar la solicitud
                console.error("Error en la configuración de la solicitud:", error.message);
                res.status(500).json({
                    ok: false,
                    msg: "Error en la configuración de la solicitud a Lambda.",
                });
            }
        }
        else {
            // Errores no relacionados con Axios
            console.error("Error inesperado:", error.message);
            res.status(500).json({
                ok: false,
                msg: "Error inesperado, comuníquese con el administrador.",
            });
        }
    }
});
exports.crearUsuario = crearUsuario;
//# sourceMappingURL=Usuario.controller.js.map