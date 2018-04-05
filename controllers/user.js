/**
 * ======================================
 * Controller logic
 * ======================================
 */

const get = (allModels) => {
    return (request, response) => {
        //use user model method 'get' to retrive user data
        allModels.user.get(request.params.id, (error, queryResult, err, result) => {
            //queryResult contains user data returned from the user model
            if (error) {
                console.log('error getting user: ', error);
                response.sendStatus(500);
            } else {
                //render polls.handlebars in the user view folder
                let content = {
                    loggedIn: request.cookies['loggedIn'],
                    username: request.cookies['username'],
                    user: queryResult.rows[0],
                    question: result.rows
                }
                console.log(content.user);
                response.render('user/polls', content);
            }
        });
    };
};

const updateForm = (allModels) => {

    return (request, response) => {
        console.log('controllers updateform id: ' + request.params.id);
        allModels.user.updateForm(request.params.id, (error, queryResult) => {
            if (error) {
                console.log('error getting user: ', error);
                response.sendStatus(500);
            } else {
                //render edit.handlebars in user views folder
                let content = {
                    loggedIn: request.cookies['loggedIn'],
                    username: request.cookies['username'],
                    user: queryResult.rows[0]
                };

                response.render('user/edit', content);
            }
        });
    };
};

const update = (allModels) => {
    return (request, response) => {
        allModels.user.update(request.body, (error, queryResult) => {
            let userId = request.params.id;

            if (error) {
                response.sendStatus(500);
            } else {
                let content = {
                    loggedIn: request.cookies['loggedIn'],
                    username: request.cookies['username'],
                    user: queryResult.rows[0]
                };
                response.render('user/user', content);
            }
        })
    }
}

const newForm = (request, response) => {

    if (request.cookies['loggedIn'] === 'true') {
        response.redirect('/');
    } else {
        response.render('user/new');
    }
};

const create = (allModels) => {
    return (request, response) => {
        //create new user entry in database

        allModels.user.create(request.body, (error, queryResult) => {

            if (error) {
                console.error('error!!!', error);
            }

            if (queryResult.rowCount >= 1) {
                console.log("User created successfully!");

                //drop cookies to indicate user's logged in status and username
                response.cookie('loggedIn', true);
                response.cookie('username', request.body.username);
            } else {
                console.log('User could not be created');
                response.sendStatus(500);
            }
            //redirect to /:id/polls after creation
            let content = {
                loggedIn: request.cookies['loggedIn'],
                username: request.cookies['username'],
                user: queryResult.rows[0]
            };
            response.render('user/polls');
        });
    };
};

const loginForm = (request, response) => {
    if (request.cookies['loggedIn'] === 'true') {
        response.redirect('/');
    } else {
        response.render('user/login');
    }
};

const login = (allModels) => {
    return (request, response) => {
        allModels.user.login(request.body, (error, queryResult) => {
            if (queryResult) {
                let content = {
                    loggedIn: request.cookies['loggedIn'],
                    username: request.cookies['username'],
                    user: queryResult.rows[0]
                };

                response.cookie('loggedIn', true);
                response.cookie('username', content.user.username);
                response.redirect('/' + content.user.id + '/polls');

            } else {
                response.render('user/login');
            }
        });
    };
};

const logout = (request, response) => {
    response.clearCookie('loggedIn');
    response.clearCookie('username');
    response.redirect('/');
};

/**
 * =========================================
 * Export Controller Functions as a Module
 * =========================================
 */

module.exports = {
    get,
    updateForm,
    update,
    newForm,
    create,
    loginForm,
    login,
    logout
};