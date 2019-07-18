'use strict';
const util = require('util');
var sql = require('../../db');

module.exports = {
    start: (req, res) => {
        
            var request = new sql.Request()
                .input('ExerciseID', sql.NChar, req.params.ExerciseID)
                .input('StudentID', sql.NVarChar, req.user._id)
                .query('SELECT * FROM Student_Exercise WHERE StudentID = @StudentID AND ExerciseID = @ExerciseID', (err, result) => {
                    if (err)
                        res.json({ message: 'Wrong Request or Internal Server erro' });
                    if (result.recordset.length == 0) {
                        var request1 = new sql.Request()
                            .input('ExerciseID', sql.NChar, req.params.ExerciseID)
                            .input('StudentID', sql.NVarChar, req.user._id)
                            .input('CurTime', sql.DateTime, new Date())
                            .query('INSERT INTO Student_Exercise (StudentID,ExerciseID,StartTime) VALUES (@StudentID,@ExerciseID,@CurTime)', (err, result) => {
                                if (err)
                                    res.json({ message: 'Wrong Request or Internal Server Erro' });
                                var request2 = new sql.Request()
                                    .input('ExerciseID', sql.NChar, req.params.ExerciseID)
                                    .input('StudentID', sql.NVarChar, req.user._id)
                                    .query('INSERT INTO Student_Answer (StudentID,QuestionID,ExerciseID)  (SELECT @StudentID,QuestionID,ExerciseID FROM Question WHERE ExerciseID = @ExerciseID) ', (err, result) => {
                                        if (err)
                                            res.json({ message: 'Wrong Request or Internal Server Erro' });
                                        res.json({ message: 'Start doing exercise' });
                                    });
                            });
                    }
                    else {
                        res.status(400).json({ message : 'Exercise is done !' })
                    }
                });
        
    },
    end: (req, res) => {
        var request = new sql.Request()
            .input('StudentID', sql.NVarChar, req.user._id)
            .input('ExerciseID', sql.NChar, req.params.ExerciseID)
            .input('CurTime', sql.DateTime, new Date())
            .query('UPDATE Student_Exercise SET EndTime = @curTime WHERE StudentID = @StudentID AND ExerciseID = @ExerciseID', (err, result) => {
                if (err)
                    res.json({ message: 'Wrong Request or Internal Server Erro !' });
                res.json({ message: 'Finished !' });
            });
    },
    getall: (req, res) => {
        var request = new sql.Request()
            .input('ExerciseID', sql.NChar, req.ExerciseID)
            .query('SELECT ApplicationUsers.* FROM Student_Exercise LEFT JOIN ApplicationUsers ON Id = StudentID WHERE ExerciseID = @ExerciseID', (err, result) => {
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