const { User } = require("./database/models/User");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const seed = async () => {
  try {
    // Sync the User model with the database
    await User.sync({ force: true });

    // Generate hashed passwords for sample users
    const salt = await bcrypt.genSalt(Number(process.env.ROUNDS));
    const hashedPassword1 = await bcrypt.hash("password1", salt);
    const hashedPassword2 = await bcrypt.hash("password2", salt);

    // Add some sample users to the database
    await User.bulkCreate([
      {
        name: "John Doe",
        email: "john.doe@example.com",
        password: hashedPassword1,
      },
      {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        password: hashedPassword2,
      },
    ]);

    console.log("Seed data inserted successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // Close the database connection
    await User.sequelize.close();
  }
};

module.exports = seed;
