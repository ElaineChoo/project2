/**
 * =================================================
 * Routes file
 * =================================================
 */

const users = require('./controllers/user');
const questions = require('./controllers/question');
const anss = require('./controllers/ans');
const delegates = require('./controllers/delegate');

module.exports = (app, allModels) => {

    /**
     * =============================================
     * Users
     * =============================================
     */
    // CRUD users

    app.get('/register', users.newForm);
    app.post('/users/:id/polls', users.create(allModels));
    app.get('/:id/polls', users.get(allModels));
    app.get('/users/:id/edit', users.updateForm(allModels));
    app.put('/users/:id', users.update(allModels));

    //Authentication
    app.post('/users/logout', users.logout);
    app.get('/login', users.loginForm);
    app.post('/users/login', users.login(allModels));

    /**
     * ============================================
     * Questions
     * ============================================
     */
    // CRUDE questions

    app.get('/:userid/questions/new', questions.createForm(allModels));
    app.post('/:userid/polls', questions.create(allModels));
    app.get('/:userid/polls/:id/question', questions.get(allModels));
    app.post('/:userid/polls/:id/question', questions.activate(allModels));


    // app.post('/:userid/polls/:id/question', anss.create(allModels));


    app.get('/:id', delegates.getQns(allModels));
    app.post('/:id', delegates.createAns(allModels));
};