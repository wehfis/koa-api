import common from '../config';
import { Client } from 'pg';
 
export const db = new Client({
  user: common.dbUser,
  host: common.dbHost,
  database: common.dbName,
  password: common.dbPassword,
  port: common.dbPort,
})
