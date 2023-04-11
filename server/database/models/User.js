const Sequalize = require('sequalize');
const db = require('./db');
const bcrypt = require('bcrypt');

const User = db.define('user', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
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