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
const crearUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { login, password } = body;
    console.log(body);
    try {
        const existeLogin = yield Usuario_model_1.default.findOne({
            login: login,
        });
        if (existeLogin) {
            return res.status(409).json({
                ok: false,
                msg: `Ya existe el login ${login} creado`,
            });
        }
        // Los tres punticos es traigame los datos del body
        const newUsuario = new Usuario_model_1.default(Object.assign({}, body));
        const salt = bcryptjs_1.default.genSaltSync(10);
        newUsuario.password = bcryptjs_1.default.hashSync(password, salt);
        const usuarioCreado = yield newUsuario.save();
        res.status(200).json({
            ok: true,
            msg: "Usuario creado satisfactoriamente",
            usuarioCreado,
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            error,
            msg: "Error al crear el usuario, comuniquese con el administrador",
        });
    }
});
exports.crearUsuario = crearUsuario;
//# sourceMappingURL=Usuario.controller.js.map