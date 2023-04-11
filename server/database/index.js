const db = require('./db');
const User = require('./models/User');

//User.hasMany(Todo)
//Todo.belongsTo(User)


module.exports = {
    db,
    User
}