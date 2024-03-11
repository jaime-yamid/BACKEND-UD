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
exports.login = void 0;
const Usuario_model_1 = __importDefault(require("../models/Usuario.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, password } = req.body;
    try {
        // se verificara si el login coincide como tal 
        // el find one es busqueme el primero que encuentre como tal 
        const usuarioLogin = yield Usuario_model_1.default.findOne({ login: login });
        // si dado el caso no llega a existir entonces
        if (!usuarioLogin) {
            return res.status(404).json({
                ok: false,
                msg: "Las credencias como tal no son validas"
            });
        }
        //verificar el password
        // lo que hago es que en una costante vamos a coger la incirptacion y comparar el pasword con el login si coinciden 
        const validarPassword = bcryptjs_1.default.compareSync(password, login);
    }
    catch (error) {
    }
});
exports.login = login;
//# sourceMappingURL=auth.controller.js.map