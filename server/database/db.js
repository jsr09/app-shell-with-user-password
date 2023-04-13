const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/app-shell-01', {
  logging: false
})


// const db = new Sequelize('postgres://postgres:password@localhost:5432/dbname', {
//     logging: false
// });

module.exports = db;


