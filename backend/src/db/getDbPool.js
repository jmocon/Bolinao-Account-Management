import mysql from 'mysql';

const getDbPool = () =>
  mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'account_management',
    connectionLimit: 15
  });

export default getDbPool;
