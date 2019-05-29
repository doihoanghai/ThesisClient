
module.exports = function (app) {

    let AnswerCtrl = require('./AnswerController');
    app.route('/Answer/:QuestionID')
        .get(AnswerCtrl.get)
        .post(AnswerCtrl.store);
    app.route('/Answer/:QuestionID/:AnswerID')
        .put(AnswerCtrl.update)
        .delete(AnswerCtrl.delete);
    app.route('/ExerciseAnswer/:ExerciseID')
        .get(AnswerCtrl.getExerciseAnswer);
 
};