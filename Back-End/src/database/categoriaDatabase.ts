import pool from "../connections/database";

class CategoriaDatabase {
  public async listar() {
    const result = await pool.then(async (connection) => {
      return await connection.query("SELECT * FROM tblCategoria");
    });
    return result;
  }

  public async insertar(nombre: string, descripcion: string, idRegistro: number) {
    const connection = await pool;

    // Verificar si el idRegistro está definido y es un número
    if (typeof idRegistro === "number") {
      const query = "INSERT INTO tblCategoria (nombre, descripcion, idRegistro) VALUES (?, ?, ?)";
      const result = await connection.query(query, [nombre, descripcion, idRegistro]);
      return result;
    } else {
      throw new Error("El idRegistro es inválido");
    }
  }

  public async actualizar(idCategoria: string, nombre: string, descripcion: string) {
    const result = await pool.then(async (connection) => {
      const query = "UPDATE tblCategoria SET nombre = ?, descripcion = ? WHERE idCategoria = ?";
      return await connection.query(query, [nombre, descripcion, idCategoria]);
    });

    return result;
  }

  public async eliminar(idCategoria: string) {
    const result = await pool.then(async (connection) => {
      const query = "DELETE FROM tblCategoria WHERE idCategoria = ?";
      return await connection.query(query, [idCategoria]);
    });

    return result;
  }
}

const daoC = new CategoriaDatabase();
export default daoC;