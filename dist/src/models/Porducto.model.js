"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// se creara una intefaz general qu e tenga todo 
const ProductoSchema = new mongoose_1.Schema({});
const ProductoModel = (0, mongoose_1.model)("producto", producto); //Asi se crea mi cliente esquema opr el nombre que
// se coloca entre comillas
exports.default = ClienteModel;
//# sourceMappingURL=Porducto.model.js.map