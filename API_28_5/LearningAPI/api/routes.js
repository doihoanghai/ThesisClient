
module.exports = function (app) {

    let AuthCtrl = require('./AuthController');

    app.route('/login')
        .post(AuthCtrl.login);

    app.route('/logout')
        .get(AuthCtrl.logout);

    app.route('/signup')
        .post(AuthCtrl.signup);

    app.route('/changePassword')
        .post(AuthCtrl.changePassword);
   

};