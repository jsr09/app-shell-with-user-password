const Sequelize = require('sequelize');
const db = require('../db');
const bcrypt = require('bcrypt');

const User = db.define('user', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
});

User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(process.env.Rounds);
    user.password = await bcrypt.hash(user.password, salt);
});
User.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = User;