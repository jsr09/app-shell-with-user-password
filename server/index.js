const Sequelize = require("sequelize");
const db = require("./database/db");
const Port = process.env.PORT || 8080;
const app = require("./app");
const seed = require("./seed");

const init = async () => {
  try {
    await db.sync({force: true});
    console.log('Database synced');
    await seed();
    app.listen(Port, () => {
      console.log(`Listening on port ${Port}`);
    });
   
  } catch (error) {
    console.error('Seeding Failed');
    // db.close();
  }
};

init();
