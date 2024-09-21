"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UsuarioSchema = new mongoose_1.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    tipoDocumento: { type: String, required: true },
    numeroDocumento: { type: String, required: true, unique: true },
    user: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: { type: String, required: true, default: "Administrador" },
    estado: { type: Boolean, required: true, default: true },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    tempPasswordExpiration: {
        type: Date,
        default: null,
    },
});
const UsuarioModel = (0, mongoose_1.model)("usuario", UsuarioSchema); //Asi se crea mi cliente esquema opr el nombre que
// se coloca entre comillas
exports.default = UsuarioModel;
//# sourceMappingURL=Usuario.model.js.map