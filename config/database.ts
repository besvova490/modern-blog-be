import * as path from 'path';
import * as dotenv from 'dotenv';
import { type TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const join = path.join;
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const DatabaseConfig = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [join(__dirname, '../src/entities/!(*app-base).entity.{ts,js}')],
  migrations: [join(__dirname, '../database/migrations/*{.ts,.js}')],
  ssl: false,
  synchronize: false,
  cli: {
    migrationsDir: 'database/migrations',
  },
} as TypeOrmModuleOptions;
