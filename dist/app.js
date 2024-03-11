"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./src/server"));
const dotenv_1 = __importDefault(require("dotenv"));
//configurar .env 
dotenv_1.default.config();
const server = new server_1.default();
server.listen();
//ya hemos solo creado una sola funcion
//# sourceMappingURL=app.js.map