
module.exports = function (app) {

    // Course Teacher Routes
    let CourseTeacherCtrl = require('./CourseTeacherController');
    app.route('/CourseTeacher/:CourseID')
        .get(CourseTeacherCtrl.get)
        .post(CourseTeacherCtrl.store);
    app.route('/CourseTeacher/:CourseID/:TeacherID')
        .get(CourseTeacherCtrl.delete);

 
};