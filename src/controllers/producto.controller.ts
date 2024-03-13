import { CustomRequest } from "../middlewares/validate-jwt";
import ProductoModel from "../models/Producto.model";

import { Request, Response } from "express";


export const crearProducto = async (req: CustomRequest, res: Response) => {
const { body } = req;
const id= req._id;
console.log("req",req.ip);


console.log ("EL ID del suuario autenticado", id);

try {

    const productoNuevo = new ProductoModel({usuario: id, ...body});
     const productoCreado = await productoNuevo.save();
        res.status(200).json({
            ok:true,
            msg: "Producto registrado satifactoriamente",// devuelvo el mensaje del cliente para que el response se me vea lo que envio
            productoCreado,   
        });

}catch(error){

console.log(error);
res.status(400).json({
    ok:false,
    msg: `Error al crear el cliente ${error}`,
});
}
};  // se cree y no tenga epies

export const getProductos = async (req: Request, res: Response)=> {
    try {
        // devuelvo todo el lsitado de produtos con la informacion del 
    //usuario que lo creo como tal 
const productos = await ProductoModel.find().populate({
    path:"usuario", select: "nombre,numeroDocuemtno, email"
})
   res.json({
    ok:true,
    productos,
   })


}catch (error){
    res.status(400).json({
        ok:false,
        msg: "Error al crear el producto",
    });

    }
}   