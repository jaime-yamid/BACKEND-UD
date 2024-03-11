
import mongoose from "mongoose";

export const dbConection = async () => {
    try{
       const dbURL = process.env.DB_CONNECTION 
       if(!dbURL){
       throw new Error ("ERROR: Falta la URL de conexion de la base de datos")
       }
       await mongoose.connect(dbURL);
       console.log("DB si hay conexion en la BASE ");

    }catch (error){
    console.log(error);
    console.log("Error en la ocnexion de la base de datos");
    console.error("Error de conexión a la base de datos:", error);
    console.log("Error en la conexión de la base de datos");
}


};



