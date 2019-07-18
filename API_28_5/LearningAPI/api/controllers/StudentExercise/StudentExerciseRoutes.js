module.exports = function (app) {

    // Student Exercise Route Routes
    let StudentExerciseCtrl = require('./StudentExerciseController');
    app.route('/StudentExercise/start/:ExerciseID')
        .get(StudentExerciseCtrl.start);
    app.route('/StudentExercise/end/:ExerciseID')
        .get(StudentExerciseCtrl.end);
    app.route('/StudentExercise/GetAll/:ExerciseID')
        .get(StudentExerciseCtrl.getall);
    app.route('/StudentExercise/grade/:ExerciseID/:StudentID')
        .post(StudentExerciseCtrl.grade);
    
 
};