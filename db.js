/**
 * ========================================
 * Postgres database configuration
 * ========================================
 */

const pg = require('pg');
const user = require('./models/user');
const ans = require('./models/ans');
const question = require('./models/question');

const configs = {
    user: 'postgres',
    password: '13Dec1985',
    host: '127.0.0.1',
    database: 'project2',
    port: 5432
};

const pool = new pg.Pool(configs);

pool.on('error', function(err) {
    console.log('idle client error', err.message, err.stack);
});

module.exports = {
    pool: pool,
    user: user(pool),
    question: question(pool),
    ans: ans(pool)
        // delegate: delegate(pool)
};