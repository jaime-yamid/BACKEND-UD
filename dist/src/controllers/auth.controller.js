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
exports.cambiocontraseña = exports.olvidocontraseña = exports.updateNewPassword = exports.exisitLogin = exports.renewToken = exports.user = void 0;
const Usuario_model_1 = __importDefault(require("../models/Usuario.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = __importDefault(require("../helpers/jwt"));
const user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, password } = req.body;
    try {
        // se verificara si el login coincide como tal 
        // el find one es busqueme el primero que encuentre como tal 
        const usuarioUser = yield Usuario_model_1.default.findOne({ user: user });
        // si dado el caso no llega a existir entonces
        if (!usuarioUser) {
            return res.status(404).json({
                ok: false,
                msg: "Las credencias como tal no son validas"
            });
        }
        //verificar el password
        // lo que hago es que en una costante vamos a coger la incirptacion y comparar el pasword con el login si coinciden 
        const validarPassword = bcryptjs_1.default.compareSync(password, usuarioUser.password);
        if (!validarPassword) {
            return res.status(401).json({
                ok: false,
                msg: "las credenciales no son validas",
            });
        }
        // generar token
        //lamo mi funcion generar token
        const token = yield (0, jwt_1.default)(usuarioUser._id, usuarioUser.user);
        res.status(200).json({
            ok: true,
            usuario: usuarioUser,
            token, // miro que con este token me deuvleva en el posman el token
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            error,
            msg: "hable con el adminsitrador "
        });
    }
});
exports.user = user;
// funcion para sacar mi token o validar mi token si se encuentra activo 
const renewToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req._id;
    try {
        // para renovar el token solo lo hare ocn el ID req.id
        if (typeof id === "undefined") {
            throw new Error("No existe un id ");
        }
        // "consula de base de datos con esta linea "
        const usuario = yield Usuario_model_1.default.findById(id);
        // generar token
        const token = yield (0, jwt_1.default)(id.toString());
        res.json({
            ok: true,
            token,
            usuario,
        });
    }
    catch (error) {
        res.status(401).json({
            ok: false,
            error,
            msg: "hable con el adminsitrador "
        });
    }
});
exports.renewToken = renewToken;
const exisitLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, numeroDocumento } = req.body;
    try {
        // verificando el login como tal 
        const existEmail = yield Usuario_model_1.default.findOne({
            email,
            numeroDocumento,
        });
        if (!existEmail) {
            return res.status(401).json({
                ok: false,
                msg: "las credenciales no son validas",
            });
        }
        //generar  token
        const token = yield (0, jwt_1.default)(existEmail.id, existEmail.user);
        res.status(200).json({
            ok: true,
            usuario: existEmail,
            token,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            error,
            msg: "hable con el administrador ",
        });
    }
});
exports.exisitLogin = exisitLogin;
const updateNewPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password } = req.body;
        const salt = bcryptjs_1.default.genSaltSync(10);
        const passwordCript = bcryptjs_1.default.hashSync(password, salt);
        const id = req._id;
        const newusuario = yield Usuario_model_1.default.findByIdAndUpdate(id, {
            password: passwordCript
        }, {
            new: true,
        });
        res.json({
            ok: true,
            user: newusuario,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: "porfavor digite una contraseña validaS"
        });
    }
});
exports.updateNewPassword = updateNewPassword;
const olvidocontraseña = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, numeroDocumento } = req.body;
    try {
        const existeUsuario = yield Usuario_model_1.default.findOne({
            user,
            numeroDocumento,
        });
        if (!existeUsuario) {
            res.status(400).json({
                ok: false,
                msg: "No coincide sus credenciales",
            });
        }
        console.log("existeUsuario", existeUsuario);
        const id = existeUsuario === null || existeUsuario === void 0 ? void 0 : existeUsuario._id;
        if (id) {
            // generar token
            const token = yield (0, jwt_1.default)(id, user, "1H", process.env.JWT_SECRET_PASS);
            res.status(200).json({
                ok: true,
                msg: "Proceso de exito",
                Usuario: existeUsuario,
                token,
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            msg: "NO se logra validar  sus credenciales con exito, porfavor comuniquese con el administracion"
        });
    }
});
exports.olvidocontraseña = olvidocontraseña;
const cambiocontraseña = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req._id;
    const { password } = req.body;
    try {
        if (!password) {
            return res.status(400).json({
                ok: false,
                msg: "Error al actualizar la contraseña"
            });
        }
        // Encriptar la contraseña
        const newpassword = bcryptjs_1.default.hashSync(password, 10);
        // Actualizar la contraseña
        const actualizarpassword = yield Usuario_model_1.default.findByIdAndUpdate(id, { password: newpassword }, { new: true });
        if (!actualizarpassword) {
            return res.status(400).json({
                ok: false,
                msg: "Error al actualizar la contraseña"
            });
        }
        res.status(200).json({
            ok: true,
            msg: "Contraseña actualizada"
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: "Error al actualizar la contraseña, hable con sus administradores"
        });
    }
});
exports.cambiocontraseña = cambiocontraseña;
//# sourceMappingURL=auth.controller.js.map