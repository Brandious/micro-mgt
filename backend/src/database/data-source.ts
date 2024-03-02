import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_DATABASE_HOST,
  port: parseInt(process.env.POSTGRES_DATABASE_PORT),
  username: process.env.POSTGRES_DATABASE_USERNAME || 'postgres',
  password: process.env.POSTGRES_DATABASE_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DATABASE_NAME,
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  migrations: [`${__dirname}/../migrations/*{.ts,.js}`],
  synchronize: false,
  migrationsRun: true,
  logging: true,
});
