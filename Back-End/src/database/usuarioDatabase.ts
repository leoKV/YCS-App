//import connection from "../config/connection";
import pool from "../connections/database";

class UsuarioDatabase{

    public async listar(idUsuario: number){
        const result =await pool.then(async (connection)=>{
            return await connection.query(
                " SELECT idUsuario, nombre, apellidoPaterno,apellidoMaterno,email,telefono,fecha_Registro "
                +" FROM tblUsuario WHERE idUsuario !=? ",
                [idUsuario]
            );
        });

        return result;
    }

    public async listarRolByUserId(idUsuario: number){
        const result =await pool.then(async (connection)=>{
            return await connection.query(
                " SELECT r.* "
                +" FROM tblUsuarioRol ru"
                +" JOIN tblRol r ON r.idRol = ru.idRol "
                +" WHERE ru.idUsuario =? ",
                [ idUsuario ]
            );
        });

        return result;
    }

    public async verificarEmail(email: string){
        const result =await pool.then(async (connection)=>{
            return await connection.query(
                " SELECT idUsuario FROM tblUsuario WHERE email = ? ",
                [email]
            );
        });

        return result;
    }

    public async insertar(usuario: any){
        const result= await pool.then(async(connection)=>{
            return await connection.query(" INSERT INTO tblUsuario SET ? ",[usuario]);
        });
        return result;
    }

    public async actualizar(usuario:any, idUsuario:number){
        const result = await pool.then(async(connection)=>{
            return await connection.query(
                " UPDATE tblUsuario SET ? WHERE idUsuario = ? ",
                [usuario, idUsuario]
            );
        });
        return result;
    }

    public async eliminar(idUsuario:number){
        const result = await pool.then(async(connection)=>{
            return await connection.query(
                " DELETE FROM tblUsuario WHERE idUsuario = ? ",
                [ idUsuario ]
            );
        });
        return result;
    }

    public async eliminarRolByIdUsuario(idUsuario:number){
        const result = await pool.then(async(connection)=>{
            return await connection.query(
                " DELETE FROM tblUsuarioRol WHERE idUsuario = ? ",
                [ idUsuario ]
            );
        });
        return result;
    }

    public async insertarRol(rol: any){
        const result = await pool.then(async (connection)=>{
            return await connection.query(" INSERT INTO tblUsuarioRol SET ? ",[rol]);
        });
        return result;
    }

}
const dao = new UsuarioDatabase();
export default dao;