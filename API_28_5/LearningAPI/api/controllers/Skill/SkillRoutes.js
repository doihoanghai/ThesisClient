
module.exports = function (app) {



    // Skill Routes
    let SkillCtrl = require('./SkillController');
    app.route('/Skill')
        .get(SkillCtrl.get)
        .post(SkillCtrl.store);
    app.route('/Skill/:SkillID')
        .get(SkillCtrl.detail)
        .put(SkillCtrl.update)
        .delete(SkillCtrl.delete);
 
};