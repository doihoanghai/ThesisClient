
module.exports = function (app) {

    //Class Routes
    let ClassCtrl = require('./ClassController');
    app.route('/Class')
        .get(ClassCtrl.get)
        .post(ClassCtrl.store);
    app.route('/Course_Class/:CourseID')
        .get(ClassCtrl.getCourseClass);
    app.route('/Class/:ClassID')
        .get(ClassCtrl.detail)
        .put(ClassCtrl.update)
        .delete(ClassCtrl.delete);

 
};