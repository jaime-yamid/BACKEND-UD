"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// se creara una intefaz general qu e tenga todo 
// el esquema no sera cualquiera si no con las caracteristicas que le estoy dadno en la 
// parte de arriba como tal
const ProductoSchema = new mongoose_1.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String },
    precio: { type: Number, required: true },
    categoria: { type: String, required: true },
    stock: { type: Number, required: true },
    createdAt: { type: Date,
        default: Date.now(),
    },
    peso: { type: String, required: true },
    ip: { type: String },
    estado: { type: Boolean, required: true, default: true },
    caracteristicas: { type: Object, required: true },
    programasInstalados: { type: Object, required: true },
    distribuidor: { type: Object, required: true },
    opiniones: { type: Object },
    usuario: { type: mongoose_1.Schema.Types.ObjectId, ref: "usuario", required: true },
});
const ProductoModel = (0, mongoose_1.model)("producto", ProductoSchema); //Asi se crea mi cliente esquema opr el nombre que
// se coloca entre comillas
exports.default = ProductoModel;
//# sourceMappingURL=Producto.model.js.map