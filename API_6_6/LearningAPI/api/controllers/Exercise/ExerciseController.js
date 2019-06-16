'use strict';
const util = require('util');
var sql = require('../../db');

module.exports = {
    get: (req, res) => {
        const request = new sql.Request().query('SELECT * FROM Exercise', (err, result) => {
            if (err) console.log(err);
            res.end(JSON.stringify(result.recordsets));
        });
    },
    detail: (req, res) => {
        const request = new sql.Request()
            .input('exerciseID', sql.NChar, req.params.ExerciseID)
            .query('SELECT * FROM Exercise WHERE ExerciseID = @exerciseID', (err, result) => {
                if (err) console.log(err);
                res.end(JSON.stringify(result.recordset[0]));
            });
    },
    update: (req, res) => {
        const request = new sql.Request()
            .input('exerciseID', sql.NVarChar, req.params.ExerciseID)
            .input('courseID', sql.NChar, req.body.CourseID)
            .input('exerciseName', sql.NVarChar, req.body.ExerciseName)
            .input('description', sql.NVarChar, req.body.Description)
            .input('exerciseTime', sql.Int, req.body.ExerciseTime)
            .input('exerciseScore', sql.Int, req.body.ExerciseScore)
            .input('exercisePath', sql.NChar, req.body.ExercisePath)
            .input('note', sql.NVarChar, req.body.Note)
            .query('UPDATE Exercise SET ExerciseName = @exerciseName,CourseID = @courseID, Description = @description, ExerciseTime = @exerciseTime,ExerciseScore = @exerciseScore,ExercisePath = @exercisePath,Note = @note WHERE ExerciseID = @exerciseID', (err, result) => {
                if (err)
                    console.log(err);
                res.json({ message: 'Update success!' });
            });
    },
    store: (req, res) => {
        let data = req.body;
        const request = new sql.Request()
            .input('exerciseName', sql.NVarChar, req.body.ExerciseName)
            .input('courseID', sql.NChar, req.body.CourseID)
            .input('description', sql.NVarChar, req.body.Description)
            .input('exerciseTime', sql.Int, req.body.ExerciseTime)
            .input('exerciseScore', sql.Int, req.body.ExerciseScore)
            .input('exercisePath', sql.NChar, req.body.ExercisePath)
            .input('note', sql.NVarChar, req.body.Note)
            .query('EXEC proc_Add_Exercise @courseID,@exerciseName,@description,@exerciseTime,@exerciseScore,@exercisePath,@note', (err, response) => {
                if (err) throw err;
                res.json({ message: 'Insert success!' });
            });
    },
    delete: (req, res) => {
        const request = new sql.Request()
            .input('ExerciseID', sql.NChar, req.params.ExerciseID)
            .query('DELETE Exercise WHERE ExerciseID = @ExerciseID', (err, result) => {
                if (err) console.log(err);
                res.json({ message: 'Delete success!' });
            });
    },
    //getCourseExercise: (req, res) => {
    //    const request = new sql.Request()
    //        .input('CourseID', sql.NChar, req.params.CourseID)
    //        .query('SELECT * FROM Exercise WHERE CourseID = @CourseID', (err, result) => {
    //            if (err)
    //                console.log(err);
    //            res.json(result.recordsets);
    //        });
    //},
    
};