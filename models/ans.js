module.exports = (dbPool) => {
    return {

        create: (ans, id, callback) => {
            let queryString = 'INSERT INTO answers (question_id, ans) VALUES ($1, $2) RETURNING *';
            let VALUES = [id, ans.ans];

            dbPool.query(queryString, VALUES, (error, queryResult) => {
                console.log('model/ ans.js/ create/ queryResult: ');
                console.log(queryResult.rows);
                callback(error, queryResult);
            });
        }



        // create: (ans, request, response, callback) => {
        //     let username = request.cookies['username'];
        //     const qStr = 'SELECT * FROM users WHERE username = $1';
        //     const val = [username];
        //     dbPool.query(qStr, val, (err, result) => {
        //         // console.log('model ans create result.rows[0].id = users result: ');
        //         //console.log(result.rows[0].id);

        //         const qs = 'SELECT * FROM questions WHERE userid = $1';
        //         const v = [result.rows[0].id];
        //         dbPool.query(qs, v, (err2, res) => {
        //             // console.log('models ans create queryString ans value : ');
        //             // console.log(ans.ans);
        //             // console.log('models ans create res.row[0] = question res :');
        //             console.log(res.rows);

        //             const queryString = 'INSERT INTO answers (question_id, ans) VALUES ($1, $2) RETURNING *';
        //             const VALUES = [res.rows, ans.ans];
        //             dbPool.query(queryString, VALUES, (error, queryResult) => {
        //                 console.log(queryResult.rows);
        //                 callback(result, res, error, queryResult);
        //             });
        //         });
        //     });
        // }
    };
};