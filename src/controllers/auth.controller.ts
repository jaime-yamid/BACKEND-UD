import { Request , Response} from "express";
import UsuarioModel from "../models/Usuario.model";
import bcrypt from 'bcryptjs';
export const login = async (req: Request, res: Response) => {
    const {loginUser, password}= req.body;
    try {
// se verificara si el login coincide como tal 
// el find one es busqueme el primero que encuentre como tal 
const  usuarioLogin = await UsuarioModel.findOne({ login:loginUser});

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


    })
}

res.json({
ok:true,
usuario:usuarioLogin,
});
    }catch(error)
    {
res.json( {
    ok:false,
    error,
    msg:"hable con el adminsitrador "
});

    }
};