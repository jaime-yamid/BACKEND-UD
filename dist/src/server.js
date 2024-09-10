"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const conection_1 = require("./database/conection");
const usuario_route_1 = __importDefault(require("./routes/usuario.route"));
const auth_router_1 = __importDefault(require("./routes/auth.router"));
const cors_1 = __importDefault(require("cors"));
const interaccion_route_1 = __importDefault(require("./routes/interaccion.route"));
class Server {
    constructor() {
        this.apiPath = {
            usuario: "/api/v1/usuario",
            auth: "/api/v1/auth",
            interaccion: "/api/v1/interaccion/",
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "3000";
        //base de datos
        (0, conection_1.dbConection)();
        // metodos iniciales
        // this.miPrimeraApi();
        //metodos inicilaes
        this.middlewares();
        // llamando las rutas
        this.routes();
    }
    middlewares() {
        this.app.use((0, cors_1.default)()); // los cors para permisos para consumir mi IP 
        //lectrua de body todo lo metera como jeysson todo lo qie llega por medio de api se lo 
        //convierte a una APi
        this.app.use(express_1.default.json());
        this.miPrimeraApi();
    }
    miPrimeraApi() {
        // Ruta inicial para propósitos de prueba
        this.app.get("/", (req, res) => res.status(200).json({ msg: "informacion" }));
    }
    routes() {
        // Configuración de rutas
        this.app.use(this.apiPath.usuario, usuario_route_1.default);
        this.app.use(this.apiPath.auth, auth_router_1.default);
        this.app.use(this.apiPath.interaccion, interaccion_route_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("servidor corriendo en el puerto", this.port);
        });
    }
}
//esta linea es para escuchar invocar o oir esta clase como tal en otro lado
exports.default = Server;
//# sourceMappingURL=server.js.map