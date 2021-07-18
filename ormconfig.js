module.exports = {
  type: 'better-sqlite3',
  database: 'series-db.sqlite3',
  entities: ['dist/**/*.entity.{ts,js}'],
  migrations: ['src/environment/database/migration/*.{ts,js}'],
  cli: {
    migrationsDir: 'src/environment/database/migration',
  },
};
