module.exports = (dbPool) => {
    return {

        getBar: (id, callback) => {
            //select question
            let queryString = 'SELECT * FROM questions WHERE id=$1';
            let VALUES = [id];
            dbPool.query(queryString, VALUES, (error1, queryResult) => {

                let queryStr = 'SELECT * FROM users WHERE id=$1';
                let value = [queryResult.rows[0].userid];
                dbPool.query(queryStr, value, (err, queryRes) => {

                    let qStr = 'SELECT COUNT(*) FROM answers WHERE question_id=$1';
                    let val = [id];
                    dbPool.query(qStr, val, (error, result) => {

                        let queryStrA = 'SELECT COUNT (ans) FROM answers WHERE question_id=$1 AND ans=$2';
                        let valA = [id, 'A'];
                        dbPool.query(queryStrA, valA, (errA, queryResA) => {

                            let queryStrB = 'SELECT COUNT (ans) FROM answers WHERE question_id=$1 AND ans=$2';
                            let valB = [id, 'B'];
                            dbPool.query(queryStrB, valB, (errB, queryResB) => {

                                let queryStrC = 'SELECT COUNT (ans) FROM answers WHERE question_id=$1 AND ans=$2';
                                let valC = [id, 'C'];
                                dbPool.query(queryStrC, valC, (errC, queryResC) => {

                                    let queryStrD = 'SELECT COUNT (ans) FROM answers WHERE question_id=$1 AND ans=$2';
                                    let valD = [id, 'D'];
                                    dbPool.query(queryStrD, valD, (errD, queryResD) => {

                                        callback(error, queryResult, queryRes, result, queryResA, queryResB, queryResC, queryResD);
                                    });

                                });

                            });

                        });
                    });
                });
            });
        }

    };
};