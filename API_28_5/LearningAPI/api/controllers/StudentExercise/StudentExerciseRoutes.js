
module.exports = function (app) {

    // Course Routes
    let StudentExerciseCtrl = require('./StudentExerciseController');
    app.route('/StudentExercise/start/:ExerciseID')
        .get(StudentExerciseCtrl.start);
    app.route('/StudentExercise/GetAll/:ExerciseID')
        .get(StudentExerciseCtrl.getall);
    app.route('/StudentExercise/grade/:ExerciseID/:StudentID')
        .post(StudentExerciseCtrl.grade);
    
 
};