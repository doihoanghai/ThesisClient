
module.exports = function (app) {

    //Class - Student
    let ClassStudentCtrl = require('./ClassStudentController');
    app.route('/Class_Student/Class/:ClassID')
        .get(ClassStudentCtrl.get)
        .post(ClassStudentCtrl.store);
    app.route('/Class_Student/:ClassID/:StudentID')
        .delete(ClassStudentCtrl.delete);
    app.route('/Class_Student/GetOwnClass')
        .get(ClassStudentCtrl.getOwnClass);
    app.route('/Class_Student/ActiveCode/:Code')
        .get(ClassStudentCtrl.activeCode);
 
};