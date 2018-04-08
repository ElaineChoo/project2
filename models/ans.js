module.exports = (dbPool) => {
    return {

        // create: (ans, id, callback) => {
        //     let queryString = 'INSERT INTO answers (question_id, ans) VALUES ($1, $2) RETURNING *';
        //     let VALUES = [id, ans.ans];


        //     dbPool.query(queryString, VALUES, (error, queryResult) => {

        //         callback(error, queryResult);
        //     });
        // }

    };
};


/**
 * 
 * select COUNT(*) FROM ANSWERS WHERE question_id='id';
 * //output = total response for that question
 * 
 * SELECT COUNT(ans) FROM answers WHERE question_id='id' AND ans='D';
 * //output = total response that replied D for that question
 * 
 * 
 */