import config from 'config';
import {MysqlConnectionOptions} from "typeorm/driver/mysql/MysqlConnectionOptions";

const CONNECTION: MysqlConnectionOptions = {
  type: 'mysql',
  host: config.get('host'),
  port: config.get('portDB'),
  username: config.get('user'),
  password: config.get('password'),
  database: config.get('database'),
};
export default CONNECTION;
