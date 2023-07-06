//const sql = require('mssql')
import mysql from 'promise-mysql'
import chain from '../models/connection';

const pool= mysql.createPool(chain.database);
export default pool;
