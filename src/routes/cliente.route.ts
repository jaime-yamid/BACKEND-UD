
//path:/api/v2/cliente  esta es la ruta del path

// cliente.route.ts
import express from 'express';
import { DeleteCliente, UpdateEstadocliente, crearClientes, getClientes, getunClientes, updateCliente } from '../controllers/cliente.controllers';
import { check } from 'express-validator';

const router = express.Router();

router.post('/',
[
    
    check("nombre","El Nombre es obligatorio").not().isEmpty(),
    check("email","El email es obligatorio").not().isEmpty().isEmail(),

], crearClientes);  // Asegúrate de que sea POST
router.get("/", getClientes);
router.get("/:id",getunClientes);
router.put("/:id",updateCliente );
router.delete("/:id",DeleteCliente);
router.put("/:id",UpdateEstadocliente)

export default router;