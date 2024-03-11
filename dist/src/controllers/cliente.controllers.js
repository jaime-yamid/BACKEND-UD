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
exports.UpdateEstadocliente = exports.DeleteCliente = exports.updateCliente = exports.getunClientes = exports.getClientes = exports.crearClientes = void 0;
const cliente_model_1 = __importDefault(require("../models/cliente.model"));
const crearClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        console.log(req);
        console.log(body);
        const clienteNuevo = new cliente_model_1.default(body);
        const clienteCreado = yield clienteNuevo.save();
        res.status(200).json({
            ok: true,
            msg: "cliente creado", // devuelvo el mensaje del cliente para que el response se me vea lo que envio
            cliente: clienteNuevo,
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
exports.crearClientes = crearClientes;
// Función para obtener todos los clientes
const getClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // METODO DE BUSCAR TODOS LOS CLIENTES 
        // Utiliza el método find() del modelo ClienteModel para obtener todos los clientes
        const clientes = yield cliente_model_1.default.find();
        // Responde con un objeto JSON que incluye los clientes obtenidos
        res.json({
            ok: true,
            clientes,
        });
        // Si hay un error, responde con un objeto JSON indicando que hubo un error
    }
    catch (error) {
        res.status(400).json({
            ok: false, // Indica que la operación no fue exitosa
            msg: `Error al crear el cliente ${error}`,
        });
    }
});
exports.getClientes = getClientes;
// Función para obtener un solo clientes
const getunClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // aca me guarda el vody como tal
        const id = req.params.id;
        console.log("esto es el id", id);
        // METODO DE BUSCAR TODOS LOS CLIENTES 
        // Utiliza el método find() del modelo ClienteModel para obtener todos los clientes
        //esto son los parametros que cuando meta id lo mete en el findById
        const clientes = yield cliente_model_1.default.findById({ _id: id });
        // Responde con un objeto JSON que incluye los clientes obtenidos
        res.json({
            ok: true,
            clientes,
        });
        // Si hay un error, responde con un objeto JSON indicando que hubo un error
    }
    catch (error) {
        res.status(400).json({
            ok: false, // Indica que la operación no fue exitosa
            msg: `Error al crear el cliente ${error}`,
        });
    }
});
exports.getunClientes = getunClientes;
// Función para actualizar cliente
const updateCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // aca me guarda el vody como tal
        const id = req.params.id;
        // const body = req.body;
        const { body } = req;
        console.log("body", body);
        // METODO DE BUSCAR TODOS LOS CLIENTES 
        // Utiliza el método find() del modelo ClienteModel para obtener todos los clientes
        //esto son los parametros que cuando meta id lo mete en el findById
        const clienteActualizado = yield cliente_model_1.default.findByIdAndUpdate(id, body, {
            new: true
        });
        // Responde con un objeto JSON que incluye los clientes obtenidos
        res.json({
            ok: true,
            clientes: clienteActualizado,
        });
        // Si hay un error, responde con un objeto JSON indicando que hubo un error
    }
    catch (error) {
        res.status(400).json({
            ok: false, // Indica que la operación no fue exitosa
            msg: `Error al crear el cliente ${error}`,
        });
    }
});
exports.updateCliente = updateCliente;
// Función para Eliminar Cliente
const DeleteCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // aca me guarda el vody como tal
        const id = req.params.id;
        // const body = req.body;
        //console.log("body",body)
        // METODO DE BUSCAR TODOS LOS CLIENTES 
        // Utiliza el método find() del modelo ClienteModel para obtener todos los clientes
        //esto son los parametros que cuando meta id lo mete en el findById
        const clienteEliminado = yield cliente_model_1.default.findByIdAndDelete(id);
        // Responde con un objeto JSON que incluye los clientes obtenidos
        res.json({
            ok: true,
            clientes: clienteEliminado,
        });
        // Si hay un error, responde con un objeto JSON indicando que hubo un error
    }
    catch (error) {
        res.status(400).json({
            ok: false, // Indica que la operación no fue exitosa
            msg: `Error al crear el cliente ${error}`,
        });
    }
});
exports.DeleteCliente = DeleteCliente;
// Actualizar el estaod de un solo cliente
const UpdateEstadocliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // aca me guarda el vody como tal
        const id = req.params.id;
        // const body = req.body;
        //console.log("body",body)
        // METODO DE BUSCAR TODOS LOS CLIENTES 
        // Utiliza el método find() del modelo ClienteModel para obtener todos los clientes
        //esto son los parametros que cuando meta id lo mete en el findById
        const UpdateEstadocliente = yield cliente_model_1.default.findByIdAndUpdate(id);
        // Responde con un objeto JSON que incluye los clientes obtenidos
        res.json({
            ok: true,
            clientes: UpdateEstadocliente,
        });
        // Si hay un error, responde con un objeto JSON indicando que hubo un error
    }
    catch (error) {
        res.status(400).json({
            ok: false, // Indica que la operación no fue exitosa
            msg: `Error al crear el cliente ${error}`,
        });
    }
});
exports.UpdateEstadocliente = UpdateEstadocliente;
//# sourceMappingURL=cliente.controllers.js.map