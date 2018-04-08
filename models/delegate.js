module.exports = (dbPool) => {
    return {

        getQns: (id, callback) => {
            const queryString = 'SELECT * FROM questions WHERE userid=$1 AND is_active=$2';
            const VALUES = [id, 'Y'];

            dbPool.query(queryString, VALUES, (error, queryResult) => {

                callback(error, queryResult);
            })
        },


        createAns: (ans, id, callback) => {

            const qStr = 'SELECT id FROM questions WHERE userid=$1 AND is_active=$2';
            const val = [id, 'Y'];

            dbPool.query(qStr, val, (err, result) => {

                let queryString = 'INSERT INTO answers (question_id, ans) VALUES ($1, $2) RETURNING *';
                let VALUES = [result.rows[0].id, ans.ans];

                dbPool.query(queryString, VALUES, (error, queryResult) => {

                    callback(error, queryResult);
                });
            });

        }

    };
};