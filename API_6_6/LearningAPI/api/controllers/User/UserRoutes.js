
module.exports = function (app) {

    //Class Routes
    let UserCtrl = require('./UserController');
    app.route('/Student')
        .get(UserCtrl.getStudent);
    app.route('/Teacher')
        .get(UserCtrl.getTeacher);
};