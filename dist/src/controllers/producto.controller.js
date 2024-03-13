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
exports.getProductos = exports.crearProducto = void 0;
const Producto_model_1 = __importDefault(require("../models/Producto.model"));
const crearProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const id = req._id;
    console.log("req", req.ip);
    console.log("EL ID del suuario autenticado", id);
    try {
        const productoNuevo = new Producto_model_1.default(Object.assign({ usuario: id }, body));
        const productoCreado = yield productoNuevo.save();
        res.status(200).json({
            ok: true,
            msg: "Producto registrado satifactoriamente", // devuelvo el mensaje del cliente para que el response se me vea lo que envio
            productoCreado,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: `Error al crear el cliente ${error}`,
        });
    }
}); // se cree y no tenga epies
exports.crearProducto = crearProducto;
const getProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // devuelvo todo el lsitado de produtos con la informacion del 
        //usuario que lo creo como tal 
        const productos = yield Producto_model_1.default.find().populate({
            path: "usuario", select: "nombre,numeroDocuemtno, email"
        });
        res.json({
            ok: true,
            productos,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al crear el producto",
        });
    }
});
exports.getProductos = getProductos;
//# sourceMappingURL=producto.controller.js.map