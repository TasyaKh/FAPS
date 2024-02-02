import { DataSource } from 'typeorm';
import CONNECTION from "./db.connection";

const AppDataSource = new DataSource({
  ...CONNECTION,
  entities: ['src/entities/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
  // entities: ['dist/entities/*.entity.js'],
  // migrations: ['dist/migrations/*.js'],
});

export default AppDataSource;
