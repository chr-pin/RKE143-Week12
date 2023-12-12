const dotenv = require('dotenv');
dotenv.config();
const { Pool } = require('pg');

const itemsPool = new Pool ({
    connectionString: process.env.DBconnectionstring,
    ssl: {
        rejectUnauthorized: false
    }
});

// const itemsPool = new Pool({
//     user: 'postgres',
//     password: 'huxley',
//     host: 'localhost',
//     port: 5432,
//     database: 'myrecipes'
// });

module.exports = itemsPool;