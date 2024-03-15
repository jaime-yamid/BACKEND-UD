import express from "express";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import { cambiocontraseña, login, olvidocontraseña, renewToken, updateNewPassword } from "../controllers/auth.controller";
import validateJWT from "../middlewares/validate-jwt";
import validateJWTpass from "../middlewares/validate-jwt";

//path:/api/v1/aut


const router = express.Router();

// las cosas que se reciben
router.post('/',
[
  
    check("login","El login es obiligatorio").not().isEmpty(),
    check("password","El password es obiligatorio").not().isEmpty(),
    validateFields,
],
login
);  // Asegúrate de que sea POST

router.post('/olvidocontrasena',
[
  
    check("login","El login es obiligatorio").not().isEmpty(),
    check("numeroDocumento","El numero de Documento es obiligatorio").not().isEmpty(),
    validateFields,
],olvidocontraseña);  // Asegúrate de que sea POST

router.put('/cambiocontrasena',
    validateJWTpass,
[
    check("password","Se necesita digital contraseña nueva").not().isEmpty(),
    validateFields,
],
cambiocontraseña
);  // Asegúrate de que sea POST


router.get("/", validateJWT, renewToken);
router.put("/", validateJWT,updateNewPassword);

//exportando mi ruta
export default router