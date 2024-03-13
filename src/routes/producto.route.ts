import express from "express";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import { crearProducto,getProductos }
 from "../controllers/producto.controller";
import validateJWT from "../middlewares/validate-jwt";

const router = express.Router();

router.post('/',
validateJWT,
[
    check("nombre","El Nombre es obligatorio").not().isEmpty(),
    check("precio","El precio es obligatorio").not().isEmpty(),
    check("categoria","La categoria es obligatorio").not().isEmpty(),validateFields,
], crearProducto
);  // Asegúrate de que sea POST
router.get("/", validateJWT, getProductos);

export default router;