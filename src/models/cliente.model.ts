import { Model, Schema, model } from "mongoose"

 const ClienteSchema = new Schema ({
nombre : {
    type: String,
    required: true,
},
direccion: { type: String,
    required: false},
telefono: {type: Number,
    required: true},
email:{type: String,
    required: true},
tipodeDocumento:{type: String,
    required: true},
numeroDocumento:{type: String,
        required: true},
estado:{type: Boolean,
    required: true, default: true},
createdAt: {
    type:Date,
    default: Date.now,
},
updatedAt:{
    type: Date,
    default: Date.now(),
},


});

const ClienteModel: Model<any> = model("clientes", ClienteSchema); //Asi se crea mi cliente esquema opr el nombre que
// se coloca entre comillas
export default ClienteModel;