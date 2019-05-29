
module.exports = function (app) {


    // Exercise Question Routes
    let ExerciseQuestionCtrl = require('./ExerciseQuestionController');
    app.route('/ExerciseQuestion/:ExerciseID')
        .get(ExerciseQuestionCtrl.get)
        .post(ExerciseQuestionCtrl.store);
    app.route('/ExerciseQuestion/:ExerciseID/:QuestionID')
        .get(ExerciseQuestionCtrl.delete);

 
};