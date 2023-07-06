//const sql = require('mssql')
import chain from '../models/connection';

const pool= mysql.createPool(chain.database);
export default pool;
