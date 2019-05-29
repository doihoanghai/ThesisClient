'use strict';
const util = require('util');
var sql = require('../../db');

module.exports = {
    
    get: (req, res) => {
        const request = new sql.Request()
            .input('CourseID', sql.NChar, req.params.CourseID)
            .query('SELECT Skill.* FROM Course_Skill LEFT JOIN Skill on Course_Skill.SkillID = Skill.SkillID where CourseID = @CourseID', (err, result) => {
                if (err) {
                    res.json({ message: 'Erro !!!' });
                }
                else {
                    res.end(JSON.stringify(result.recordsets));
                }
            });
    },
    store: (req, res) => {
        const request = new sql.Request()
            .input('SkillID', sql.NChar, req.body.SkillID)
            .input('CourseID', sql.NChar, req.body.CourseID)
            .query('INSERT INTO Course_Skill (CourseID,SkillID) VALUES (@CourseID,@SkillID)', (err, result) => {
                if (err) {
                    res.json({ message: 'Erro !!!' });
                }
                else {
                    res.json({ message: 'Insert success !' });
                }
            });
    },
    update: (req, res) => {
        const request = new sql.Request()
            .input('SkillName', sql.NVarChar, req.params.SkillName)
            .input('Description', sql.NVarChar, req.params.Decription)
            .query('UPDATE Course_Skill SET SkillName = @role WHERE ExerciseID = @ExerciseID', (err, result) => {
                if (err) {
                    res.json({ message: 'Update Erro !' });
                } else {
                    res.json({ message: 'Update success!' });
                }
            });
    },
    delete: (req, res) => {
        const request = new sql.Request()
            .input('SkillID', sql.NChar, req.params.SkillID)
            .input('CourseID', sql.NChar, req.params.CourseID)
            .query('DELETE Course_Skill WHERE SkillID = @SkillID AND CourseID = @CourseID', (err, result) => {
                if (err) {
                    console.log("Delete skill in course erro !");
                } else {
                    res.json({ message: 'deltete success!' });
                }
            });
    }

};