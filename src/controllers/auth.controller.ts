import { Request , Response} from "express";
import UsuarioModel from "../models/Usuario.model";
import bcrypt from 'bcryptjs';
import generateJWT from "../helpers/jwt";
import { CustomRequest } from "../middlewares/validate-jwt";


export const user = async (req: Request, res: Response) => {
    const {user, password}= req.body;
    try {
// se verificara si el login coincide como tal 
// el find one es busqueme el primero que encuentre como tal 
const  usuarioUser = await UsuarioModel.findOne({ user:user});

// si dado el caso no llega a existir entonces
if(!usuarioUser){
    return res.status(404).json({
        ok:false,
        msg:"Las credencias como tal no son validas"
    })
}
//verificar el password
// lo que hago es que en una costante vamos a coger la incirptacion y comparar el pasword con el login si coinciden 
const validarPassword = bcrypt.compareSync(password,usuarioUser.password);
if(!validarPassword){
    return res.status(401).json({
ok:false,
msg:"las credenciales no son validas",


    });
}

// generar token
//lamo mi funcion generar token
const token = await generateJWT(usuarioUser._id, usuarioUser.user);

res.status(200).json({
ok:true,
usuario:usuarioUser,
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

// funcion para sacar mi token o validar mi token si se encuentra activo 

export const renewToken = async (req: CustomRequest, res: Response) => {
const id = req._id
try{
// para renovar el token solo lo hare ocn el ID req.id

if (typeof id === "undefined"){
    throw new Error ("No existe un id ");
}
// "consula de base de datos con esta linea "
const usuario = await UsuarioModel.findById(id);

// generar token
const token = await generateJWT(id.toString());
res.json ({
    ok:true,
    token,
    usuario,
});
} catch(error){

    res.status(401).json( {
        ok:false,
        error,
        msg:"hable con el adminsitrador "
});
}
}

export const exisitLogin = async (req:Request, res:Response)=> {
const {email, numeroDocumento}=req.body

try{
// verificando el login como tal 
const existEmail = await UsuarioModel.findOne({
    email,
    numeroDocumento,
});

if(!existEmail){
    return res.status(401).json({
        ok:false,
        msg: "las credenciales no son validas",
    });
}

//generar  token
const token = await generateJWT(
    existEmail.id,
    existEmail.user
);

res.status(200).json({
    ok:true,
    usuario:existEmail,
    token,
});



}catch (error){
res.status(400).json({
    ok:false,
    error,
    msg: "hable con el administrador ",
});

}

};


export const updateNewPassword =  async (req: CustomRequest, res: Response) => {
try {
const {password}= req.body;
const salt= bcrypt.genSaltSync(10);
const passwordCript =bcrypt.hashSync(password, salt);

const id= req._id;

const newusuario = await UsuarioModel.findByIdAndUpdate(
id,
{
    password:passwordCript },
    {
        new: true,
    }
);
res.json({
    ok:true,
    user:newusuario,
})
} catch(error){
    res.status(400).json({
        ok:false,
        msg:"porfavor digite una contraseña validaS"
    })
}       
    }

export const olvidocontraseña = async ( req: CustomRequest, res: Response)=> {
const {user, numeroDocumento}=req.body;
try{
    const existeUsuario = await UsuarioModel.findOne({
         user,
         numeroDocumento,
    });
    if(!existeUsuario){
        res.status(400).json({
            ok:false,
            msg: "No coincide sus credenciales",
        });
    }
console.log("existeUsuario", existeUsuario);
const id= existeUsuario?._id;
if(id){
    // generar token
    const token = await generateJWT(
        id, 
        user,
        "1H", 
        process.env.JWT_SECRET_PASS
        );
        res.status(200).json({
            ok:true,
            msg:"Proceso de exito",
            Usuario:existeUsuario,
            token,
        });
    }
}catch(error){
console.error(error)
res.status(400).json({
    ok:false,
    msg:"NO se logra validar  sus credenciales con exito, porfavor comuniquese con el administracion"
});
}
}



export const cambiocontraseña = async (req: CustomRequest, res: Response) => {
    const id = req._id;
    const { password } = req.body;

    try {
        if (!password) {
            return res.status(400).json({
                ok: false,
                msg: "Error al actualizar la contraseña"
            });
        }

        // Encriptar la contraseña
        const newpassword = bcrypt.hashSync(password, 10);

        // Actualizar la contraseña
        const actualizarpassword = await UsuarioModel.findByIdAndUpdate(
            id, 
            { password: newpassword },
            { new: true }
        );

        if (!actualizarpassword) {
            return res.status(400).json({
                ok: false,
                msg: "Error al actualizar la contraseña"
            });
        }

        res.status(200).json({
            ok: true,
            msg: "Contraseña actualizada"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: "Error al actualizar la contraseña, hable con sus administradores"
        });
    }
};

