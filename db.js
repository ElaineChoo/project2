/**
 * ========================================
 * Postgres database configuration
 * ========================================
 */
//require the url library
//this comes with node, so no need to yarn add
const url = require('url');

const pg = require('pg');
const user = require('./models/user');
const ans = require('./models/ans');
const question = require('./models/question');

/check to see if we have this heroku environment variable
if (process.env.DATABASE_URL) {

    //we need to take apart the url so we can set the appropriate configs

    const params = url.parse(process.env.DATABASE_URL);
    const auth = params.auth.split(':');

    //make the configs object
    var configs = {
        user: auth[0],
        password: auth[1],
        host: params.hostname,
        port: params.port,
        database: params.pathname.split('/')[1],
        ssl: true
    };

} else {

    //otherwise we are on the local network
    var configs = {
        user: 'postgres',
        password: '13Dec1985',
        host: '127.0.0.1',
        database: 'project2',
        port: 5432
    };
}

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