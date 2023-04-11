const { db } = require('./database/db');
const Port = process.env.PORT || 8080;
const app = require('./app');
// const seed = require('./seed');


const init = async () => {
  try {
    // if(process.env.SEED === 'true') {
    //     await seed();
    // }else {
    //     await db.sync();
    // }
    
    //or

        db.sync().then(() => {
        app.listen(Port, () => {
            console.log(`Listening on port ${Port}`);
        });
        });
    } catch (error) {
        console.log(error);
    }
};

init();
