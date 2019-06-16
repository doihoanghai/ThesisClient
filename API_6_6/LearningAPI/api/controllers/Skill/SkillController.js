'use strict'
const util = require('util');
var sql = require('../../db');

module.exports = {
    get: (req, res) => {
        const request = new sql.Request().query('SELECT * FROM Skill', (err, result) => {
            if (err) console.log(err);
            res.end(JSON.stringify(result.recordsets));
        });
    },
    detail: (req, res) => {
        const request = new sql.Request()
            .input('SkillID', sql.NChar, req.params.SkillID)
            .query('SELECT * FROM Skill WHERE SkillID = @SkillID', (err, result) => {
                if (err) console.log(err);
                res.end(JSON.stringify(result.recordset[0]));
            });
    },
    update: (req, res) => {
        const request = new sql.Request()
            .input('SkillID', sql.NChar, req.params.SkillID)
            .input('skillName', sql.NVarChar, req.body.SkillName)
            .input('description', sql.NVarChar, req.body.Description)
            .query('UPDATE Skill SET SkillName = @skillName, Description = @description WHERE SkillID = @SkillID', (err, result) => {
                if (err)
                    console.log(err);
                res.json({ message: 'Update success!' });
            });
    },
    store: (req, res) => {
        let data = req.body;
        const request = new sql.Request()
            .input('skillName', sql.NVarChar, req.body.SkillName)
            .input('description', sql.NVarChar, req.body.Description)
            .query('EXEC proc_Add_Skill @skillName,@description', (err, response) => {
                if (err) throw err;
                res.json({ message: 'Insert success!' });
            });
    },
    delete: (req, res) => {
        const request = new sql.Request()
            .input('SkillID', sql.NChar, req.params.SkillID)
            .query('DELETE Skill WHERE SkillID = @SkillID', (err, result) => {
                if (err) console.log(err);
                res.json({ message: 'Delete success!' });
            });
    }
   
}