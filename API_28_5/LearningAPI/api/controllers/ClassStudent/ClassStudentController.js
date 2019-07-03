'use strict';
const util = require('util');
var sql = require('../../db');

module.exports = {
    
    get: (req, res) => {
        const request = new sql.Request()
            .input('ClassID', sql.NChar, req.params.ClassID)
            .query('SELECT Id,FullName,Address,BirthDay,Email,UserName FROM Class_Student LEFT JOIN ApplicationUsers on StudentID = Id where ClassID = @ClassID', (err, result) => {
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
            .input('studentID', sql.NVarChar, req.body.StudentID)
            .input('classID', sql.NChar, req.body.ClassID)
            .query('INSERT INTO Class_Student (StudentID,ClassID) VALUES (@studentID,@classID)', (err, result) => {
                if (err) {
                    res.json({ message: 'Erro !!!' });
                }
                else {
                    res.json({ message: 'Insert success !' });
                }
            });
    },
    delete: (req, res) => {
        const request = new sql.Request()
            .input('studentID', sql.NVarChar, req.params.StudentID)
            .input('classID', sql.NChar, req.params.ClassID)
            .query('DELETE Class_Student WHERE StudentID = @studentID AND ClassID = @classID', (err, result) => {
                if (err) {
                    console.log("Delete student in class erro !");
                } else {
                    res.json({ message: 'deltete success!' });
                }
            });
    },
    getOwnClass: (req, res) => {
        const request = new sql.Request()
            .input('StudentID', sql.NChar, req.user._id)
            .query('SELECT Class.* FROM Class_Student LEFT JOIN Class on Class_Student.ClassID = Class.ClassID where StudentID = @StudentID', (err, result) => {
                if (err) {
                    res.json({ message: 'Erro !!!' });
                }
                else {
                    res.end(JSON.stringify(result.recordsets));
                }
            });
    },
    activeCode: (req, res) => {
        if ( req.user.UserLevel == 2) {
            const request = new sql.Request()
                .input('Code', sql.NChar, req.params.Code)
                .input('StudentID', sql.NVarChar, req.user._id)
                .query('EXEC proc_ActiveCode @StudentID,@Code', (err, result) => {
                    if (err)
                        res.status(500);
                    //check result value
                    res.json({
                        message: 'Join class success'
                    });
                });
        }
        else {
            res.status(400).json('Only Student account can active code !');
        }
    }

};