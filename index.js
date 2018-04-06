/**
 * ==================================
 * Imported external library modules
 * ==================================
 */

const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');

const allModels = require('./db');

const handlebarsConfig = {
    extname: '.handlebars',
    layoutsDir: 'views',
    defaultLayout: 'layout'
}

/**
 * ================================
 * Configurations and set up
 * ================================
 */

// Init express app
const app = express();

// Set up middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride('_method'));
app.use(cookieParser());

//Set handlebars to be the default view engine
app.engine('.handlebars', handlebars(handlebarsConfig));
app.set('view engine', 'handlebars');


/**
 * ================================
 * Routes
 * ================================
 */

//Import routes to match incoming requests
require('./routes')(app, allModels);

//Root GET request
app.get('/', (request, response) => {
    let loggedIn = request.cookies['loggedIn'];
    let username = request.cookies['username'];

    if (request.cookies['loggedIn'] === 'true') {

        let queryString = 'SELECT * FROM users WHERE username=$1';
        let VALUES = [username];

        allModels.pool.query(queryString, VALUES, (error, queryResult) => {
            if (error) console.log('error!', error);

            let content = {
                loggedIn: loggedIn,
                username: username,
                user: queryResult.rows[0]
            };
            response.render('home', content);
        });
    } else {
        allModels.pool.query('SELECT * FROM users', (error, queryResult) => {
            if (error) console.error('error!', error);

            let content = {
                loggedIn: loggedIn,
                username: username
            };
            response.render('home', content);
        });
    }
});

// Catch all unmatched requests and return 404 not found page
app.get('*', (request, response) => {
    response.render('404');
});

/**
 * =================================
 * Listen to requests on port 3000
 * =================================
 */

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => console.log('~~~ Tuning in to the waves of port ' + PORT + ' ~~~'));

// Run clean up actions when server shuts down
server.on('close', () => {
    console.log('Closed express server');

    //close database connection pool
    allModels.pool.end(() => {
        console.log('Shut down db connection pool');
    });
});