const bcrypt = require("bcryptjs");
const User = require("./database/models/User");

async function testValidPassword() {
  const user = await User.findOne({ where: { email: "john.doe@example.com" } });
  const isValidPassword = await user.validPassword("password1");
  const isPasswordCorrect = await bcrypt.compare("password1", user.password);

  console.log("isValidPassword", isValidPassword); // should output true
  console.log("isPasswordCorrect", isPasswordCorrect); // should output true
}

testValidPassword();
