"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Definir el esquema para el formulario de contacto
const InteraccionSchema = new mongoose_1.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true },
    mensaje: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
const InteraccionModel = (0, mongoose_1.model)("Interaccion", InteraccionSchema);
exports.default = InteraccionModel;
//# sourceMappingURL=interacciones.models.js.map