import { Router } from "express";
import { categoriaController } from "../controllers/categoriaController";
import { jwtCheck } from "../middlewares/jwtCheck";
import { validate } from "../middlewares/validatorCheck";
import { insertValidationRules, updateValidationRules } from "../validators/categoriasValidatorRules";

class CategoriaRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  private config() {
    // Listar
    this.router.get("/", categoriaController.listar);
    // Insertar
    this.router.post("/", insertValidationRules(), categoriaController.insertar);
    // Actualizar
    this.router.put("/:idCategoria", updateValidationRules(), categoriaController.actualizar);
    // Eliminar
    this.router.delete("/:idCategoria", categoriaController.eliminar);
  }
}

const categoriaRoutes = new CategoriaRoutes();
export default categoriaRoutes.router;