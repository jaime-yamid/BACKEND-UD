import Server from "./src/server";
import dotenv from "dotenv";

//configurar .env 

dotenv.config();
const server = new Server();
server.listen();

//ya hemos solo creado una sola funcion