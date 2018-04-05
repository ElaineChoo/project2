/**
 * =================================================
 * Routes file
 * =================================================
 */

const users = require('./controllers/user');

module.exports = (app, allModels) => {

    /**
     * =============================================
     * Users
     * =============================================
     */
    // CRUD users

    app.get('/register', users.newForm);
    app.post('/:id/polls', users.create(allModels));
    app.get('/:id/polls', users.get(allModels));
    app.get('/users/:id/edit', users.updateForm(allModels));
    app.put('/users/:id', users.update(allModels));

    //Authentication
    app.post('/users/logout', users.logout);
    app.get('/login', users.loginForm);
    app.post('/users/login', users.login(allModels));
};