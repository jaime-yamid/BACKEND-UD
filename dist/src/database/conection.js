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
exports.dbConection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dbConection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dbURL = process.env.DB_CONNECTION;
        if (!dbURL) {
            throw new Error("ERROR: Falta la URL de conexion de la base de datos");
        }
        yield mongoose_1.default.connect(dbURL);
        console.log("DB si hay conexion en la BASE ");
    }
    catch (error) {
        console.log(error);
        console.log("Error en la ocnexion de la base de datos");
        console.error("Error de conexión a la base de datos:", error);
        console.log("Error en la conexión de la base de datos");
    }
});
exports.dbConection = dbConection;
//# sourceMappingURL=conection.js.map