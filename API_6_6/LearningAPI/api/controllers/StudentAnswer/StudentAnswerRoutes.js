
module.exports = function (app) {

    //Student Answer Routes
    let StudentAnswerCrtl = require('./StudentAnswerController');
    app.route('/StudentsAnswer/GetExerciseAnswer/:ExerciseID')
        .get(StudentAnswerCrtl.getExerciseAnswer);
    app.route('/StudentAnswer/:QuestionID')
        .get(StudentAnswerCrtl.get)
        .put(StudentAnswerCrtl.update)
        .post(StudentAnswerCrtl.store);
    app.route('/TeacherFeedback/:QuestionID/:UserID')
        .put(StudentAnswerCrtl.feedback);
};