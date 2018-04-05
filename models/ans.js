module.exports = (dbPool) => {
    return {
        create: (ans, request, response, callback) => {
            let username = request.cookies['username'];
            const qStr = 'SELECT * FROM users WHERE username = $1';
            const val = [username];
            dbPool.query(qStr, val, (err, result) => {
                console.log('model ans create result.rows[0] = users result: ');
                console.log(result.rows[0]);

                const qs = 'SELECT * FROM questions WHERE userid = $1';
                const v = [result.rows[0].id];
                dbPool.query(qs, v, (err2, res) => {
                    const queryString = 'INSERT INTO answers (question_id, ans) VALUES ($1, $2)';
                    const VALUES = [res.rows[0].id, ans.opta | ans.optb | ans.optc | ans.opd];
                    console.log(VALUES);

                    dbPool.query(queryString, VALUES, (result, res, error, queryResult) => {
                        console.log('models ans create queryResult: ');
                        console.log(queryResult);
                        callback(result, res, error, queryResult);
                    });
                });
            });
        }
    };
};