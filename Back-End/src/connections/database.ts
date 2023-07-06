//const sql = require('mssql')
import mysql from 'promise-mysql'
import chain from '../config/connection';
 
const pool= mysql.createPool(chain.database);
export default pool;
