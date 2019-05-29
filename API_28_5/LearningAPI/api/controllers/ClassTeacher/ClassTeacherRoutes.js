
module.exports = function (app) {

    //Class - Teacher
    let ClassTeacherCtrl = require('./ClassTeacherController');
    app.route('/Class_Teacher/:ClassID')
        .get(ClassTeacherCtrl.get)
        .post(ClassTeacherCtrl.store);
    app.route('/Class_Teacher/:ClassID/:TeacherID')
        .put(ClassTeacherCtrl.update)
        .delete(ClassTeacherCtrl.delete);
 
};