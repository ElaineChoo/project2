/**
 * ==========================================
 * Question Model Function
 * ==========================================
 */

/**
 * ==========================================
 * Export Model Functions as a Module
 * ========================================== 
 */

module.exports = (dbPool) => {
    return {

        createForm: (request, response, callback) => {
            let username = request.cookies['username'];
            let queryString = 'SELECT id FROM users WHERE username=$1';
            let VALUES = [username];
            dbPool.query(queryString, VALUES, (error, queryResult) => {

                callback(error, queryResult);
            });
        },

        create: (question, callback) => {
            const queryString = 'INSERT INTO questions (userid, question, opta, optb, optc, optd, is_active) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
            const VALUES = [
                question.userid,
                question.question,
                question.opta,
                question.optb,
                question.optc,
                question.optd,
                'N'
            ];
            // execute query
            dbPool.query(queryString, VALUES, (error, queryResult) => {
                console.log('question model create queryResult: ');
                console.log(queryResult.rows);
                callback(error, queryResult);
            });
        },

        get: (id, callback) => {
            const queryString = 'SELECT * FROM questions WHERE id=$1';
            const VALUES = [id];

            dbPool.query(queryString, VALUES, (error, queryResult) => {
                const qStr = 'SELECT * FROM users WHERE id=$1';
                const val = [parseInt(queryResult.rows[0].userid)];

                dbPool.query(qStr, val, (err, result) => {
                    callback(error, queryResult, err, result);
                })
            });
        },

        activate: (id, userid, callback) => {
            const qStr = 'UPDATE questions SET is_active=$1 WHERE userid = $2';
            const val = ['N', userid];

            dbPool.query(qStr, val, (err, result) => {
                const queryString = 'UPDATE questions SET is_active=$1 WHERE id = $2 RETURNING *';
                const VALUES = ['Y', id];

                dbPool.query(queryString, VALUES, (error, queryResult) => {

                    callback(error, queryResult);
                });
            });
        }

    };
};