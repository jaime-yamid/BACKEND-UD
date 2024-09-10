import express, { Application, Request, Response } from "express";
import { dbConection } from "./database/conection";
import usuarioRoutes from "./routes/usuario.route";
import authRoutes from "./routes/auth.router";
import cors from "cors";
import interaccionRoutes from "./routes/interaccion.route";

class Server {
private app: Application;
private port: string;  
private apiPath = {
    
    usuario:"/api/v1/usuario",
    auth:"/api/v1/auth",
    interaccion: "/api/v1/interaccion/",
   
};
    constructor() {

        this.app = express();
        this.port = process.env.PORT || "3000" ;
        //base de datos
        dbConection();
        // metodos iniciales
        // this.miPrimeraApi();

        //metodos inicilaes
        this.middlewares();

        // llamando las rutas
        this.routes();

    }
    middlewares(){
  this.app.use(cors()); // los cors para permisos para consumir mi IP 

        //lectrua de body todo lo metera como jeysson todo lo qie llega por medio de api se lo 
        //convierte a una APi
        this.app.use(express.json());
        this.miPrimeraApi();
    }

miPrimeraApi (){
        // Ruta inicial para propósitos de prueba
    this.app.get("/",(req: Request, res: Response ) =>
       res.status(200).json({ msg: "informacion"})
    );
}


routes(): void {
        // Configuración de rutas

    this.app.use(this.apiPath.usuario, usuarioRoutes);
    this.app.use(this.apiPath.auth, authRoutes);
    this.app.use(this.apiPath.interaccion, interaccionRoutes);
 
}

    listen(): void{
        this.app.listen(this.port, () => {
            console.log("servidor corriendo en el puerto", this.port);

        }
        
        
        )
    }
}

//esta linea es para escuchar invocar o oir esta clase como tal en otro lado
export default Server;