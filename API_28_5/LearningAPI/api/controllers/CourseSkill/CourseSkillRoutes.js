
module.exports = function (app) {

    // Course Skill Routes
    let CourseSkillCtrl = require('./CourseSkillController');
    app.route('/CourseSkill/:CourseID')
        .get(CourseSkillCtrl.get)
        .post(CourseSkillCtrl.store);
    app.route('/CourseSkill/:CourseID/:SkillID')
        .delete(CourseSkillCtrl.delete);
 
};