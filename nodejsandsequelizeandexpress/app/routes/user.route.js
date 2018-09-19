module.exports = function(app) {

    const users = require('../controllers/user.controller.js');

    app.post('/users/signup', users.signup);
    app.post('/users/login', users.login);
    app.delete('/users/:userId', users.Deleteuser);
}