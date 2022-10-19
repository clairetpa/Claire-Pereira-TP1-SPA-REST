const dotenv = require("dotenv");

dotenv.config();

/* objet qui va recuperer tous les elements crées dans config/twit.js */
module.exports = {
    PORT: process.env.PORT,
    CONSUMER_KEY: process.env.CONSUMER_KEY,
    CONSUMER_SECRET: process.env.CONSUMER_SECRET,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET
};