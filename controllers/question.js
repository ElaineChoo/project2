/**
 * ===================================================
 * Question Controller Functions
 * ===================================================
 */

/**
 * ===================================================
 * Controller Logic
 * ===================================================
 */
const get = (allModels) => {
    return (request, response) => {
        // use question model to retrive the particular questions and its selection
        allModels.question.get(request.params.id, (error, queryResult, err, result) => {
            //queryResult contains question data returned from the question model
            if (error) {
                console.log('error getting question data: ', error);
            } else {
                //render question.handlebars in the question view folder
                let content = {
                    loggedIn: request.cookies['loggedIn'],
                    username: request.cookies['username'],
                    question: queryResult.rows[0],
                    user: result.rows[0]
                };

                response.render('question/question', content);
            }
        });

    };
};

const createForm = (allModels) => {
    return (request, response) => {
        allModels.question.createForm(request, response, (error, queryResult) => {

            if (error) {
                response.sendStatus(500);
            } else {
                let content = {
                    loggedIn: request.cookies['loggedIn'],
                    username: request.cookies['username'],
                    user: queryResult.rows[0]
                };
                console.log(content.user);
                response.render('question/new', content);

            }
        });

    };
};

const create = (allModels) => {
    return (request, response) => {
        allModels.question.create(request.body, (error, queryResult) => {

            // check if able to get queryResult
            if (error) {
                response.sendStatus(500);
            }

            // check if question is successfully created
            if (queryResult.rowCount >= 1) {
                console.log('Question is created successfully');
            } else {
                console.log('Question could not be created');
            }

            //redirect to My Poll after creation
            let content = {
                loggedIn: request.cookies['loggedIn'],
                username: request.cookies['username'],
                question: queryResult.rows[0]
            };
            response.redirect('/' + request.params.userid + '/polls', content);
        });
    };
};

/**
 * ================================================
 * Export Controller Functions as a module
 * ================================================
 */
module.exports = {
    get,
    createForm,
    create
};