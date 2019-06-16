
module.exports = function (app) {

    //Category Course Routes
    let CategoryCourseCtrl = require('./CategoryCourseController');
    app.route('/Category_Course/:CategoryID')
        .get(CategoryCourseCtrl.get)
        .post(CategoryCourseCtrl.store);
    app.route('/Category_Course/:CourseID/:CategoryID')
        .delete(CategoryCourseCtrl.delete);

 
};