import express from "express";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import { login } from "../controllers/auth.controller";


//path:/api/v1/aut


const router = express.Router();

// las cosas que se reciben
router.post('/',
[
  
    check("login","El login es obiligatorio").not().isEmpty(),
    check("password","El password es obiligatorio").not().isEmpty(),
    validateFields,
],login);  // Asegúrate de que sea POST


//exportando mi ruta
export default router