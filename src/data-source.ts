import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT! || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  migrations: ['src/migrations/*.ts'],
  entities: ['src/**/*.entity.ts'],
  synchronize: false,
  logging: true,
});
