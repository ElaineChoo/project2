const getQns = (allModels) => {
    return (request, response) => {
        allModels.delegate.getQns(request.params.id, (error, queryResult) => {
            if (error) {
                response.sendStatus(500);
            } else {
                let content = {
                    question: queryResult.rows[0]
                };
                response.render('delegate/question', content);
            }
        });
    };
};

const createAns = (allModels) => {
    return (request, response) => {
        allModels.delegate.createAns(request.body, request.params.id, (error, queryResult) => {
            if (error) {
                response.sendStatus(500);
            }

            if (queryResult.rowCount >= 1) {
                console.log('Answer is created successfully');
            } else {
                console.log('Answer could not be created');
            }

            //redirect to My Poll after creation

            response.render('delegate/submit');
        });
    };
};


/**
 * ================================================
 * Export Controller Functions as a module
 * ================================================
 */
module.exports = {

    getQns,
    createAns
};