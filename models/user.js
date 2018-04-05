/**
 * =============================================
 * User Model functions
 * =============================================
 */

const bcrypt = require('bcrypt');

/**
 * ============================================
 * Export Model functions as a module
 * ============================================
 */

module.exports = (dbPool) => {
    // 'dbPool' is accessible within this function scope

    return {
        create: (user, callback) => {

            //run user input password through bcrypt to obtain hashed password
            bcrypt.hash(user.password, 1, (err, hashed) => {
                if (err) console.error('error!', err);

                //setup query
                const queryString = 'INSERT INTO users (username, email, password, img) VALUES ($1, $2, $3, $4) RETURNING *';
                const VALUES = [
                    user.username,
                    user.email,
                    hashed,
                    user.img
                ];

                //execute query
                dbPool.query(queryString, VALUES, (error, queryResult) => {
                    //invoke callback function with results after query has executed
                    callback(error, queryResult);
                });
            });
        },

        login: (user, callback) => {
            const queryString = "SELECT * FROM users WHERE username = $1";
            const VALUES = [user.username];

            dbPool.query(queryString, VALUES, (error, queryResult) => {
                console.log('models queryResult : ' + queryResult.rows[0]);
                bcrypt.compare(user.password, queryResult.rows[0].password, (err, res) => {
                    if (res) {
                        callback(error, queryResult);
                    } else {
                        callback(error, queryResult);
                    }
                });
            });
        },

        get: (id, callback) => {
            const queryString = 'SELECT * FROM users WHERE id=$1';
            const VALUES = [id];

            dbPool.query(queryString, VALUES, (error, queryResult) => {
                const qStr = 'SELECT * FROM questions WHERE userId = $1';
                const val = [id];
                dbPool.query(qStr, val, (err, result) => {
                    callback(error, queryResult, err, result);
                });
            });
        },

        updateForm: (id, callback) => {
            const queryString = 'SELECT * from users WHERE id = $1';
            const VALUES = [id];

            dbPool.query(queryString, VALUES, (error, queryResult) => {
                callback(error, queryResult);
            })
        },

        update: (user, callback) => {
            const queryString = 'UPDATE users SET img=$1, username=$2, email=$3 WHERE id=$4 RETURNING *'
            const VALUES = [user.img, user.username, user.email, parseInt(user.id)];

            //set up query to update data of a specific user
            dbPool.query(queryString, VALUES, (error, queryResult) => {
                callback(error, queryResult);
            });
        }
    };
};