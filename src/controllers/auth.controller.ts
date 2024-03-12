import { Request , Response} from "express";
import UsuarioModel from "../models/Usuario.model";
import bcrypt from 'bcryptjs';
import generateJWT from "../helpers/jwt";
export const login = async (req: Request, res: Response) => {
    const {login, password}= req.body;
    try {
// se verificara si el login coincide como tal 
// el find one es busqueme el primero que encuentre como tal 
const  usuarioLogin = await UsuarioModel.findOne({ login:login});

// si dado el caso no llega a existir entonces
if(!usuarioLogin){
    return res.status(404).json({
        ok:false,
        msg:"Las credencias como tal no son validas"
    })
}
//verificar el password
// lo que hago es que en una costante vamos a coger la incirptacion y comparar el pasword con el login si coinciden 
const validarPassword = bcrypt.compareSync(password,usuarioLogin.password);
if(!validarPassword){
    return res.status(401).json({
ok:false,
msg:"las credenciales no son validas",


    });
}

// generar tolen
//lamo mi funcion generar token
const token = await generateJWT(usuarioLogin._id, usuarioLogin.login);

res.status(200).json({
ok:true,
usuario:usuarioLogin,
token,   // miro que con este token me deuvleva en el posman el token
});
    }catch(error){
res.status(400).json( {
    ok:false,
    error,
    msg:"hable con el adminsitrador "
});

    }
};




