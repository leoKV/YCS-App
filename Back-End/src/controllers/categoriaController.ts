import { Request, Response } from "express";
import { utils } from "../utils/utils";
import dao from "../database/categoriaDatabase";
import daoC from "../database/categoriaDatabase";

class CategoriaController {
  public async listar(req: Request, res: Response) {
    try {
      const categorias = await daoC.listar();
      res.json(categorias);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: "Ocurrió un error" });
    }
  }
  public async insertar(req: Request, res: Response) {
    try {
      const token = <string>req.headers["auth"];
      const data = utils.getPayload(token);

      // Crear un objeto con los datos de la nueva categoría y el idRegistro del usuario
      const newCategoria = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        idRegistro: data.idUsuario
      };

      const result = await daoC.insertar(newCategoria.nombre, newCategoria.descripcion, newCategoria.idRegistro);

      if (result.affectedRows > 0) {
        return res.json({ mensaje: "Categoría registrada correctamente" });
      } else {
        return res.status(500).json({ mensaje: "Ocurrió un error al registrar la categoría" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensaje: "Ocurrió un error" });
    }
  }
  public async actualizar(req: Request, res: Response) {
    try {
      const { idCategoria } = req.params; 
      const { nombre, descripcion } = req.body;

      const result = await daoC.actualizar(idCategoria, nombre, descripcion);
      if (result.affectedRows > 0) {
        res.json({ mensaje: "Categoría actualizada correctamente" });
      } else {
        res.status(500).json({ mensaje: "Ocurrió un error al actualizar la categoría" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: "Ocurrió un error" });
    }
  }


  public async eliminar(req: Request, res: Response) {
    try {
      const { idCategoria } = req.params;

      const result = await daoC.eliminar(idCategoria);
      if (result.affectedRows > 0) {
        res.json({ mensaje: "Categoría eliminada correctamente" });
      } else {
        res.status(500).json({ mensaje: "Ocurrió un error al eliminar la categoría" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: "Ocurrió un error" });
    }
  }
}

export const categoriaController = new CategoriaController();