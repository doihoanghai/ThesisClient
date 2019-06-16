
module.exports = function (app) {


    // Question Routes
    let QuestionCtrl = require('./QuestionController');
    app.route('/Question')
        .get(QuestionCtrl.get)
        .post(QuestionCtrl.store);
    app.route('/Question/:QuestionID')
        .get(QuestionCtrl.detail)
        .put(QuestionCtrl.update)
        .delete(QuestionCtrl.delete);
    app.route('/ExerciseQ/:ExerciseID')
        .get(QuestionCtrl.getExerciseQ);
    app.route('/UploadFile/:QuestionID')
        .post(QuestionCtrl.uploadFile);
};