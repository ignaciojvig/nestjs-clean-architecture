module.exports = {
  type: 'better-sqlite3',
  database: 'series-db.sqlite3',
  entities: ['dist/**/*.entity.js'],
  migrations: ['src/environment/database/migration/*.ts'],
  // migrations: [
  //   process.env.TYPEORMCLI
  //     ? 'src/environment/database/migration/*.ts'
  //     : 'dist/environment/database/migration/*.js',
  // ],
  cli: {
    migrationsDir: 'src/environment/database/migration',
  },
};
