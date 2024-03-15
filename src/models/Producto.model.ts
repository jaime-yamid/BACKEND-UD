import { Document,Model, Schema, Types, model } from "mongoose"
import { object } from "webidl-conversions";


// se puede crear una interfaz de los datos generales como tal

interface caracteristicas {
 procesador: string,
 memoriaRan: string;
 almacenamiento: string;
 pantalla: string;

}

interface programaInstalados {
    so: string;
    office:string;
    antivirus: string;
    multimedia: string;
}
interface Distribuidor {
    nit: string;
    razonSocial: string;
    telefono: number;
    direccion: string;
}
interface opiniones {
    comentario: string;
    razonSocial: string;
    telefono: number;
    direccion: string;
}
// esa interfacz o documento sera por parte de mongo DB

interface productoInterface{
    nombre: string;
    descripcion: string;
    precio: number;
    categoria: string;
    stock: number;
    createdAt: Date;
    peso: string;
    ip:string;
    estado: Boolean;
caracteristicas: caracteristicas; // es un objeto con sus caractersiticas
programasInstalados: programaInstalados; // es un objeto con sus caracteristicas
distribuidor: Distribuidor;// es un objeto con sus caracteristicas
opiniones: opiniones;
usuario: Types.ObjectId;
}
// se creara una intefaz general qu e tenga todo 
// el esquema no sera cualquiera si no con las caracteristicas que le estoy dadno en la 
// parte de arriba como tal
 const ProductoSchema = new Schema <productoInterface> ({
nombre: {type: String, required:true},
descripcion : {type: String},
precio:{type: Number, required: true},
categoria:{type: String, required: true},
stock: {type: Number, required:true},
createdAt: {type:Date,
default:Date.now(),
},
peso: { type:String, required: true},
ip: { type:String},
estado: {type: Boolean, required: true, default: true },
caracteristicas: {type:Object, required:true},
programasInstalados : {type: Object, required:true},
distribuidor: {type:Object, required:true},
opiniones: {type : Object},
usuario: {type:Schema.Types.ObjectId, ref: "usuario",required: true},

});

const ProductoModel: Model<productoInterface> = model<productoInterface>
("producto",
ProductoSchema);//Asi se crea mi cliente esquema opr el nombre que

// se coloca entre comillas
export default ProductoModel;