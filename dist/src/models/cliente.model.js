"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ClienteSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: true,
    },
    direccion: { type: String,
        required: false },
    telefono: { type: Number,
        required: true },
    email: { type: String,
        required: true },
    tipoDocumento: { type: String,
        required: true },
    numeroDocumento: { type: String,
        required: true },
    estado: { type: Boolean,
        required: true, default: true },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
});
const ClienteModel = (0, mongoose_1.model)("clientes", ClienteSchema); //Asi se crea mi cliente esquema opr el nombre que
// se coloca entre comillas
exports.default = ClienteModel;
//# sourceMappingURL=cliente.model.js.map