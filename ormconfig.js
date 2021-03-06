module.exports = {
  type: 'better-sqlite3',
  database: 'series-db.sqlite3',
  entities: ['dist/**/*.entity.js'],
  migrations: ['src/environment/database/migration/*.ts'],
  cli: {
    migrationsDir: 'src/environment/database/migration',
  },
};
