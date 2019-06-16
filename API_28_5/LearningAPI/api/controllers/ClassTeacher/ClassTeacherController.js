'use strict';
const util = require('util');
var sql = require('../../db');

module.exports = {
    
    get: (req, res) => {
        const request = new sql.Request()
            .input('ClassID', sql.NChar, req.params.ClassID)
            .query('SELECT Id,FullName,Address,BirthDay,Email,Role, UserName FROM Class_Teacher LEFT JOIN ApplicationUsers on TeacherID = Id where ClassID = @ClassID', (err, result) => {
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
            .input('teacherID', sql.NVarChar, req.body.TeacherID)
            .input('classID', sql.NChar, req.body.ClassID)
            .input('role', sql.Int, req.body.Role)
            .query('INSERT INTO Class_Teacher (TeacherID,ClassID,Role) VALUES (@teacherID,@classID,@role)', (err, result) => {
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
            .input('teacherID', sql.NVarChar, req.params.TeacherID)
            .input('role', sql.Int, 0)
            .query('UPDATE Class_Teacher SET Role = @role WHERE TeacherID = @teacherID', (err, result) => {
                if (err) {
                    res.json({ message: 'Update Erro !' });
                } else {
                    res.json({ message: 'Update success!' });
                }
            });
    },
    delete: (req, res) => {
        const request = new sql.Request()
            .input('teacherID', sql.NVarChar, req.params.TeacherID)
            .input('classID', sql.NChar, req.params.ClassID)
            .query('DELETE Class_Teacher WHERE TeacherID = @teacherID AND ClassID = @classID', (err, result) => {
                if (err) {
                    console.log("Delete Teacher in class erro !");
                } else {
                    res.json({ message: 'deltete success!' });
                }
            });
    }

};