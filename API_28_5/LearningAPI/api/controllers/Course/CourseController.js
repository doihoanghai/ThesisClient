'use strict';
const util = require('util');
var sql = require('../../db');

module.exports = {
    get: (req, res) => {
        const request = new sql.Request().query('SELECT * FROM Course', (err, result) => {
            if (err) console.log(err);
            res.end(JSON.stringify(result.recordsets));
        });
    },
    getOwnCourse: (req, res) => {
        if (req.user !== undefined) {
            switch (req.user.UserLevel) {
                case 0:
                    const request = new sql.Request().query('SELECT * FROM Course', (err, result) => {
                        if (err) console.log(err);
                        res.end(JSON.stringify(result.recordsets));
                    });
                    break;
                case 1:
                    const request1 = new sql.Request()
                        .input('userID', sql.NVarChar, req.user._id)
                        .query('SELECT Course.* FROM Course_Teacher LEFT JOIN Course on Course_Teacher.CourseID = Course.CourseID WHERE TeacherID = @userID', (err, result) => {
                        if (err) console.log(err);
                        res.end(JSON.stringify(result.recordsets));
                    });
                    break;
                case 2:
                    const request2 = new sql.Reques()
                        .input('userID', sql.NVarChar, req.user._id)
                        .query('SELECT Course.* FROM Class_Student LEFT JOIN Class SELECT Course.* From Class_Student LEFT JOIN Class on Class_Student.ClassID = Class.ClassID LEFT JOIN Course on Course.CourseID = Class.CourseID WHERE StudentID = @userID',
                            (err, result) => {
                                if (err)
                                    console.log(err);
                                res.end(JSON.stringify(result.recordsets));
                            });
                    break;
                default:
                    break;
            }
        }
        
    },
    detail: (req, res) => {
        const request = new sql.Request()
            .input('courseID', sql.NChar, req.params.CourseID)
            .query('SELECT * FROM Course WHERE CourseID = @courseID', (err, result) => {
                if (err) console.log(err);
                res.end(JSON.stringify(result.recordset[0]));
            });
    },
    update: (req, res) => {
        //test finish -> delete route
        if (req.user == undefined) {
            res.json({ message : 'Unauthorized' })
        }

        switch (req.user.UserLevel) {
            case 1:
                const request1 = new sql.Request()
                    .input('TeacherID', sql.NVarChar, req.user._id)
                    .input('CourseID', sql.NChar, req.body.CourseID)
                    .query('SELECT * FROM Course_Teacher WHERE TeacherID = @TeacherID AND CourseID = @CourseID', (err, result) => {
                        if (err)
                            res.json({ message: 'Internal Server Erro' });
                        if (result.recordset.length != 0) {
                            const request = new sql.Request()
                                .input('courseID', sql.NVarChar, req.params.CourseID)
                                .input('courseName', sql.NVarChar, req.body.CourseName)
                                .input('description', sql.NVarChar, req.body.Description)
                                .input('numOfStudent', sql.Int, req.body.NumOfStudent)
                                .query('UPDATE Course SET CourseName = @courseName, Description = @description, NumOfStudent = @numOfStudent WHERE CourseID = @courseID', (err, result) => {
                                    if (err)
                                        console.log(err);
                                    res.json({ message: 'Update success!' });
                                });
                        }
                        else{
                            res.json({message:'Not Allow Access'});
                        } 
                    });
                break;
            case 0:
                const request = new sql.Request()
                    .input('courseID', sql.NVarChar, req.body.CourseID)
                    .input('courseName', sql.NVarChar, req.body.CourseName)
                    .input('description', sql.NVarChar, req.body.Description)
                    .input('numOfStudent', sql.Int, req.body.NumOfStudent)
                    .query('UPDATE Course SET CourseName = @courseName, Description = @description, NumOfStudent = @numOfStudent WHERE CourseID = @courseID', (err, result) => {
                        if (err)
                            res.json(err);
                        res.json({ message: 'Update success!' });
                    });
                    break;
            default : 
                res.json({message : 'Not Allow Access !'});
                break;

        }

        
    },
    store: (req, res) => {
        if (req.user != undefined && req.user.UserLevel < 2) {
            const request = new sql.Request()
                .input('courseName', sql.NVarChar, req.body.CourseName)
                .input('description', sql.NVarChar, req.body.Description)
                .input('numOfStudent', sql.Int, req.body.NumOfStudent)
                .query('EXEC proc_Add_Course @courseName,@description,@numOfStudent', (err, response) => {
                    if (err) throw err;
                    res.json({ message: 'Insert success!' });
                });
        }
        else {
            res.json({ message: 'Unauthorized ' });
        }
        
    },
    delete: (req, res) => {
        if (req.user != undefined && req.UserLevel < 2) {
            //Test update first
            const request = new sql.Request()
                .input('courseID', sql.NChar, req.params.CourseID)
                .query('DELETE Course WHERE CourseID = @courseID', (err, result) => {
                    if (err) console.log(err);
                    res.json({ message: 'Delete success!' });
                });
        }
        else {
            res.json({ message: 'Unauthorized' });
        }
        
    }

};