const getBar = (allModels) => {
    return (request, response) => {
        allModels.ans.getBar(request.params.id, (error, queryResult, result, queryResA, queryResB, queryResC, queryResD) => {
            if (error) {
                response.sendStatus(500);
            }

            let resA = Math.round(parseInt(queryResA.rows[0].count) / parseInt(result.rows[0].count) * 100);
            let resB = Math.round(parseInt(queryResB.rows[0].count) / parseInt(result.rows[0].count) * 100);
            let resC = Math.round(parseInt(queryResC.rows[0].count) / parseInt(result.rows[0].count) * 100);
            let resD = Math.round(parseInt(queryResD.rows[0].count) / parseInt(result.rows[0].count) * 100);

            //redirect to My Poll after creation
            let content = {
                loggedIn: request.cookies['loggedIn'],
                username: request.cookies['username'],
                question: queryResult.rows[0],
                ResA: resA,
                ResB: resB,
                ResC: resC,
                ResD: resD
            };


            response.render('ans/result', content);
        });
    };
};


/**
 * ================================================
 * Export Controller Functions as a module
 * ================================================
 */
module.exports = {

    getBar
};