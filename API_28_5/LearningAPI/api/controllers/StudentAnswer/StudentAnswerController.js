'use strict';
const util = require('util');
var sql = require('../../db');

module.exports = {

    getExerciseAnswer: (req, res) => {
        //Check authentication of Teacher to get this data
        const request = new sql.Request()
            .input('ExerciseID', sql.NChar, req.params.ExerciseID)
            .query('SELECT * FROM Student_Answer WHERE ExerciseID = @ExerciseID', (err, result) => {
                if (err)
                    res.json({ message: 'Internal Server Erro' });
                else
                    res.json(result.recordsets);
            });
    },
    get: (req, res) => {
        //Authen
        const request = new sql.Request()
            .input('QuestionID', sql.NChar, req.params.QuestionID)
            .query('SELECT * FROM Student_Answer WHERE QuestionID = @QuestionID', (err, result) => {
                if (err)
                    res.status(501).json({ message: 'Internal Server Erro' });
                else
                    res.json(result.recordsets);
            });
    },
    put: (req, res) => {
        //Check Authentication to update the answer ?
        const request = new sql.Request()
            .input('QuestionID', sql.NChar, req.params.QuestionID)
            .input('StudentID', sql.NVarChar, req.user._id)
            .input('AnswerContent', sql.NVarChar, req.body.AnswerContent)
            .input('AnswerID', sql.NChar, req.body.AnswerID)
            .query('UPDATE Student_Answer SET AnswerID = @AnswerID, AnswerContent = @AnswerContent WHERE QuestionID = @QuestionID AND StudentID = @id', (err, result) => {
                if (err)
                    res.status(501).json({ message: 'Internal Server Erro' });
                res.json({ message: 'Update succes' });
            });
    },
    post: (req, res) => {
        //Check Authentication to update the answer ?
        const request = new sql.Request()
            .input('QuestionID', sql.NChar, req.params.QuestionID)
            .input('StudentID', sql.NVarChar, req.user._id)
            .input('AnswerContent', sql.NVarChar, req.body.AnswerContent)
            .input('AnswerID', sql.NChar, req.body.AnswerID)
            .input('ExerciseID', sql.NChar, req.body.ExerciseID)
            .query('INSERT INTO Student_Answer (QuestionID,StudentID,ExerciseID,AnswerID,AnswerContent) VALUES (@QuestionID,@StudentID,@ExerciseID,@AnswerID,@AnswerContent) ', (err, result) => {
                if (err)
                    res.status(501).json({ message: 'Internal Server Erro' });
                res.json({ message: 'Update succes' });
            });
    },
    feedback: (req, res) => {
        //Check teacher authentiocaton to feedback Student Answer
        const request = new sql.Request()
            .input('QuestionID', sql.NChar, req.params.QuestionID)
            .input('StudentID', sql.NVarChar, req.user._id)
            .input('TeacherFeedback', sql.NVarChar, req.body.TeacherFeedback)
            .input('Score', sql.Float, req.body.Score)
            .query('UPDATE Student_Answer SET TeacherFeedback = @TeacherFeedback,Score = @Score WHERE QuestionID = @QuestionID AND StudentID = @StudentID', (err, result) => {
                if (err)
                    res.status(501).json({ message: 'Internal Server Erro' });
                res.json({ message: 'Update success' });
            });
            
    }
  
};