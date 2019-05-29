
module.exports = function (app) {

    // Course Routes
    let CourseCtrl = require('./CourseController');
    app.route('/Course')
        .get(CourseCtrl.get)
        .post(CourseCtrl.store);
    app.route('/Course/:CourseID')
        .get(CourseCtrl.detail)
        .put(CourseCtrl.update)
        .delete(CourseCtrl.delete);
    app.route('/CourseManager')
        .get(CourseCtrl.getOwnCourse);
 
};