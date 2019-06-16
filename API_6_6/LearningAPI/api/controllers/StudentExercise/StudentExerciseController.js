'use strict';
const util = require('util');
var sql = require('../../db');

module.exports = {
    start: (req, res) => {
        if (user.UserLevel !== 2) {
            res.status(500);
        } else {
            var request = new sql.Request()
                .input('ExerciseID', sql.NChar, req.params.ExerciseID)
                .input('StudentID', sql.NVarChar, req.user._id)
                .query('INSERT INTO Student_Exercise (StudentID,ExerciseID) VALUES (@StudentID,@ExerciseID)', (err, result) => {
                    if (err)
                        res.status(400);
                });
            var request2 = new sql.Request()
                .input('ExerciseID', sql.NChar, req.params.ExerciseID)
                .input('StudentID', sql.NVarChar, req.user._id)
                .query('INSERT INTO Student_Answer (StudentID,QuestionID,ExerciseID) VALUES SELECT (@StudentID,QuestionID,ExerciseID) FROM Question WHERE ExerciseID = @ExerciseID ', (err, result) => {
                    if (err)
                        res.status(400);
                });
            res.json({ message: 'Start doing exercise' });

        }

    },
    getall: (req, res) => {
        var request = new sql.Request()
            .input('ExerciseID', sql.NChar, req.ExerciseID)
            .query('SELECT Student_Exercise.* FROM Student_Exercise WHERE ExerciseID = @ExerciseID', (err, result) => {
                if (err)
                    res.status(400);
                res.end(JSON.stringify(result.recordsets));
            });
    },
    grade: (req, res) => {
        var request = new sql.Request()
            .input('StudentID', sql.NChar, req.user._id)
            .input('ExerciseID', sql.NChar, req.params.ExerciseID)
            .input('Score', sql.Float, req.body.Score)
            .input('Comment', sql.NVarChar, req.body.Comment)
            .query('UPDATE Student_Exercise SET Score = @Score, Comment = @Comment WHERE ExerciseID = @ExerciseID AND StudentID = @StudentID', (err, resutl) => {
                if (err)
                    res.status(400);
                res.json({ message: "Update success !" });
            });

    }
};