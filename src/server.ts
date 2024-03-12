import express, { Application, Request, Response } from "express";
import { dbConection } from "./database/conection";
import clienteRoutes from "./routes/cliente.route";
import usuarioRoutes from "./routes/usuario.route";
import authRoutes from "./routes/auth.router";

class Server {
private app: Application;/* una varibale de tipo provada*/
private port: string;    /* puerto donde fluye nuestra api*/
private apiPath = {
    clientes:"/api/v1/cliente",
    usuario:"/api/v1/usuario",
    auth:"/api/v1/auth",
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
    this.app.use(this.apiPath.clientes, clienteRoutes);
    this.app.use(this.apiPath.usuario, usuarioRoutes);
    this.app.use(this.apiPath.auth, authRoutes);
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