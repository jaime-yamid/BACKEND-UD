import ClienteModel from "../models/cliente.model";
import { Request, Response } from "express";


export const crearClientes = async (req: Request, res: Response) => {
const { body } = req;

try {

    console.log(req);
    console.log(body);
    const clienteNuevo = new ClienteModel(body);

        const clienteCreado = await clienteNuevo.save();
        res.status(200).json({
            ok:true,
            msg: "cliente creado",// devuelvo el mensaje del cliente para que el response se me vea lo que envio
            cliente: clienteNuevo,   
        });

}catch(error){

console.log(error);
res.status(400).json({
    ok:false,
    msg: `Error al crear el cliente ${error}`,
});
}
};  // se cree y no tenga epies

// Función para obtener todos los clientes
export const getClientes = async (req: Request, res: Response ) => {

    try{
        // METODO DE BUSCAR TODOS LOS CLIENTES 
        // Utiliza el método find() del modelo ClienteModel para obtener todos los clientes
        const clientes = await ClienteModel.find()
         // Responde con un objeto JSON que incluye los clientes obtenidos
            res.json({
                ok:true,
                clientes,
            });
       // Si hay un error, responde con un objeto JSON indicando que hubo un error
    }catch (error){
res.status(400).json({
    ok:false,   // Indica que la operación no fue exitosa
    msg:  `Error al crear el cliente ${error}`,
});
 }





};

// Función para obtener un solo clientes
export const getunClientes = async (req: Request, res: Response ) => {

    try{
       
        // aca me guarda el vody como tal
        const id = req.params.id;
        console.log("esto es el id",id)
        // METODO DE BUSCAR TODOS LOS CLIENTES 
        // Utiliza el método find() del modelo ClienteModel para obtener todos los clientes
        //esto son los parametros que cuando meta id lo mete en el findById
        const clientes = await ClienteModel.findById({_id:id});
         // Responde con un objeto JSON que incluye los clientes obtenidos
            res.json({
                ok:true,
               clientes,
            });
       // Si hay un error, responde con un objeto JSON indicando que hubo un error
    }catch (error){
res.status(400).json({
    ok:false,   // Indica que la operación no fue exitosa
    msg:  `Error al crear el cliente ${error}`,
});
 }
};

// Función para actualizar cliente
export const updateCliente = async (req: Request, res: Response ) => {

    try{
       
        // aca me guarda el vody como tal
        const id = req.params.id;

     // const body = req.body;

        const { body } = req;


        console.log("body",body)
        // METODO DE BUSCAR TODOS LOS CLIENTES 
        // Utiliza el método find() del modelo ClienteModel para obtener todos los clientes
        //esto son los parametros que cuando meta id lo mete en el findById
        const clienteActualizado = await ClienteModel.findByIdAndUpdate(id, body,{
            new:true
        });
         // Responde con un objeto JSON que incluye los clientes obtenidos
            res.json({
                ok:true,
               clientes: clienteActualizado,
            });
       // Si hay un error, responde con un objeto JSON indicando que hubo un error
    }catch (error){
res.status(400).json({
    ok:false,   // Indica que la operación no fue exitosa
    msg:  `Error al crear el cliente ${error}`,
});
 }
};


// Función para Eliminar Cliente
export const DeleteCliente = async (req: Request, res: Response ) => {

    try{
       
        // aca me guarda el vody como tal
        const id = req.params.id;

     // const body = req.body;




        //console.log("body",body)
        // METODO DE BUSCAR TODOS LOS CLIENTES 
        // Utiliza el método find() del modelo ClienteModel para obtener todos los clientes
        //esto son los parametros que cuando meta id lo mete en el findById
        const clienteEliminado = await ClienteModel.findByIdAndDelete(id);
         // Responde con un objeto JSON que incluye los clientes obtenidos
            res.json({
                ok:true,
               clientes: clienteEliminado,
            });
       // Si hay un error, responde con un objeto JSON indicando que hubo un error
    }catch (error){
res.status(400).json({
    ok:false,   // Indica que la operación no fue exitosa
    msg:  `Error al crear el cliente ${error}`,
});
 }
};

// Actualizar el estaod de un solo cliente
export const UpdateEstadocliente = async (req: Request, res: Response ) => {

    try{
       
        // aca me guarda el vody como tal
        const id = req.params.id;

     // const body = req.body;




        //console.log("body",body)
        // METODO DE BUSCAR TODOS LOS CLIENTES 
        // Utiliza el método find() del modelo ClienteModel para obtener todos los clientes
        //esto son los parametros que cuando meta id lo mete en el findById
        const UpdateEstadocliente = await ClienteModel.findByIdAndUpdate(id);
         // Responde con un objeto JSON que incluye los clientes obtenidos
            res.json({
                ok:true,
               clientes: UpdateEstadocliente,
            });
       // Si hay un error, responde con un objeto JSON indicando que hubo un error
    }catch (error){
res.status(400).json({
    ok:false,   // Indica que la operación no fue exitosa
    msg:  `Error al crear el cliente ${error}`,
});
 }
};
