module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  timezone: 'Z',
  synchronize: false,
  entities: ['dist/app/entities/*.js'],
  migrations: ['dist/database/migrations/*.js'],
  seeds: ['dist/database/seeds/*.js'],
  subscribers: ['dist/database/subscribers/**/*.js'],
  cli: {
    entitiesDir: 'src/app/entities',
    migrationsDir: 'src/database/migrations',
    subscribersDir: 'src/database/subscribers',
  },
};
