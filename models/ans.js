module.exports = (dbPool) => {
    return {

        getBar: (id, callback) => {
            let queryString = 'SELECT * FROM questions WHERE id=$1';
            let VALUES = [id];
            dbPool.query(queryString, VALUES, (error1, queryResult) => {

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

                                    callback(error, queryResult, result, queryResA, queryResB, queryResC, queryResD);
                                });

                            });

                        });

                    });
                });
            });
        }

    };
};