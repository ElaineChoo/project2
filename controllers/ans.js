const create = (allModels) => {
    return (request, response) => {
        allModels.ans.create(request.body, request.params.id, (error, queryResult) => {
            if (error) {
                response.sendStatus(500);
            }

            if (queryResult.rowCount >= 1) {
                console.log('Answer is created successfully');
            } else {
                console.log('Answer could not be created');
            }

            //redirect to My Poll after creation
            let content = {
                loggedIn: request.cookies['loggedIn'],
                username: request.cookies['username'],
                ans: queryResult.rows[0]
            };

            response.render('question/question');
            // allModels.ans.create(request.body, request, response, (result, res, error, queryResult) => {
            //     // check if able to get queryResult
            //     if (error) {
            //         console.log(error);
            //         response.sendStatus(500);
            //     }

            //     // check if question is successfully created
            //     if (queryResult.rowCount >= 1) {
            //         console.log('Answer is created successfully');
            //     } else {
            //         console.log('Answer could not be created');
            //     }

            //     //redirect to My Poll after creation
            //     let content = {
            //         loggedIn: request.cookies['loggedIn'],
            //         username: request.cookies['username'],
            //         user: result.rows[0],
            //         question: res.rows[0],
            //         ans: queryResult.rows[0]
            //     };
            //     // console.log(content.user.id);
        });
    };
};


/**
 * ================================================
 * Export Controller Functions as a module
 * ================================================
 */
module.exports = {

    create
};