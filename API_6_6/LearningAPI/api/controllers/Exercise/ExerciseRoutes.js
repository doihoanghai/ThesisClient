
module.exports = function (app) {

    // Exercise Routes
    let ExerciseCtrl = require('./ExerciseController');
    app.route('/Exercise')
        .get(ExerciseCtrl.get)
        .post(ExerciseCtrl.store);
    app.route('/Exercise/:ExerciseID')
        .get(ExerciseCtrl.detail)
        .put(ExerciseCtrl.update)
        .delete(ExerciseCtrl.delete);
    //app.route('/Course_Exercise/:CourseID')
    //    .get(ExerciseCtrl.getCourseExercise)
    //    .post(ExerciseCtrl.storeCourseExercise)
    //    .put(ExerciseCtrl.updateCourseExercise)
    //    .delete(ExerciseCtrl.deleteCourseExercise);
    //app.route('/Class_Exercise/:ClassID')
    //    .get(ExerciseCtrl.getClassExercise)
    //    .post(ExerciseCtrl.storeClassExercise)
    //    .put(ExerciseCtrl.updateClassExercise)
    //    .delete(ExerciseCtrl.deleteClassExercise);

    
 
};