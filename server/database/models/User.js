const Sequelize = require('sequelize');
const db = require('../db');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();


const User = db.define('User', {
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

User.beforeCreate( async (user) => {
    const salt = await bcrypt.genSalt(Number(process.env.ROUNDS));
    user.password =  await bcrypt.hash(user.password, salt);
});

User.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
  //this.password is the hashed password stored in the database
};

module.exports = User;