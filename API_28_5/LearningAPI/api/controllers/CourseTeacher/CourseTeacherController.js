'use strict';
const util = require('util');
var sql = require('../../db');

module.exports = {
    
    get: (req, res) => {
        const request = new sql.Request()
            .input('CourseID', sql.NChar, req.params.CourseID)
            .query('SELECT FullName,Address,BirthDay,Email,Role FROM Course_Teacher LEFT JOIN ApplicationUsers on TeacherID = Id where CourseID = @CourseID', (err, result) => {
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
            .input('teacherID', sql.NVarChar, req.user._id)
            .input('CourseID', sql.NChar, req.body.CourseID)
            .input('role', sql.Int, req.body.Role)
            .query('INSERT INTO Course_Teacher (TeacherID,CourseID,Role) VALUES (@teacherID,@CourseID,@role)', (err, result) => {
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
            .input('role', sql.Int, req.body.Role)
            .query('UPDATE Course_Teacher SET Role = @role WHERE TeacherID = @teacherID', (err, result) => {
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
            .input('CourseID', sql.NChar, req.params.CourseID)
            .query('DELETE Course_Teacher WHERE TeacherID = @teacherID AND CourseID = @CourseID', (err, result) => {
                if (err) {
                    console.log("Delete Teacher in Course erro !");
                } else {
                    res.json({ message: 'deltete success!' });
                }
            });
    }

};