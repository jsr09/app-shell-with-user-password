const express = require('express');
const router = express.Router();

//routes example
router.use("/", require("./auth"));
router.use('/user', require('./users'));

router.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});
module.exports = router;