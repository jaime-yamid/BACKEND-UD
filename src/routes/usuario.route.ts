import express from "express";
import { check } from "express-validator";

import { crearUsuario } from "../controllers/Usuario.controller";






const router = express.Router();

router.post('/', 
[
    
    check("nombre","El Nombre es obligatorio").not().isEmpty(),
    check("email","El email es obligatorio").not().isEmpty().isEmail(),
    check("telefono","El telefono es obligatorio").not().isEmpty(),
    check("tipoDocumento","El tipo de documento es obiligatorio").not().isEmpty(),
    check("numeroDocumento","El numero de  documento es obiligatorio").not().isEmpty(),
    check("user","El user es obiligatorio").not().isEmpty(),
    check("password","El password es obiligatorio").not().isEmpty(),

], crearUsuario);  // Asegúrate de que sea POST


//exportando mi ruta
export default router