'use strict';
const util = require('util');
var sql = require('../../db');

module.exports = {
    //Class
    get: (req, res) => {
        const request = new sql.Request().query('SELECT * FROM Class', (err, result) => {
            if (err) console.log(err);
            res.end(JSON.stringify(result.recordsets));
        });
    },
    getCourseClass: (req, res) => {
        const request = new sql.Request()
            .input('CourseID', sql.NChar, req.params.CourseID)
            .query('SELECT * FROM Class WHERE CourseID = @CourseID', (err, result) => {
            if (err) console.log(err);
            res.end(JSON.stringify(result.recordsets));
        });
    },
    detail: (req, res) => {
        const request = new sql.Request()
            .input('ClassID', sql.NChar, req.params.ClassID)
            .query('SELECT * FROM Class WHERE ClassID = @ClassID', (err, result) => {
                if (err) console.log(err);
                res.end(JSON.stringify(result.recordset[0]));
            });
    },
    update: (req, res) => {
        const request = new sql.Request()
            .input('ClassName', sql.NVarChar, req.body.ClassName)
            .input('CourseID', sql.NVarChar, req.body.CourseID)
            .input('numOfStudent', sql.Int, req.body.NumOfStudent)
            .query('UPDATE Class SET ClassName = @ClassName, CourseID = @CourseID, NumOfStudent = @numOfStudent WHERE ClassID = @ClassID', (err, result) => {
                if (err)
                    console.log(err);
                res.json({ message: 'Update success!' });
            });
    },
    store: (req, res) => {
        let data = req.body;
        const request = new sql.Request()
            .input('ClassName', sql.NVarChar, req.body.ClassName)
            .input('CourseID', sql.NChar, req.body.CourseID)
            .input('numOfStudent', sql.Int, req.body.NumOfStudent)
            .query('EXEC proc_Add_Class @ClassName,@CourseID,@numOfStudent', (err, result) => {
                if (err)
                    console.log(err);
                res.json({ message: 'Insert success!' });
            });

    },
    delete: (req, res) => {
        const request = new sql.Request()
            .input('ClassID', sql.NChar, req.params.ClassID)
            .query('DELETE Class WHERE ClassID = @ClassID', (err, result) => {
                if (err) console.log(err);
                res.json({ message: 'Delete success!' });
            });
    }
    
  
};