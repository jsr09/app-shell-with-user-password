const Sequelize = require('sequelize');
const pkg = require('../../package.json');

const db = new Sequelize(process.env.DATABASE_URL || `postgres://localhost:5432/${pkg.name}`, {
  logging: false
})

module.exports = db


