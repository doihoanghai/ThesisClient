'use strict';
const util = require('util');
var sql = require('../../db');

module.exports = {
    
    get: (req, res) => {
        const request = new sql.Request()
            .input('ExerciseID', sql.NChar, req.params.ExerciseID)
            .query('SELECT QuestionContent,QuestionType,QuestionTime,AnswerID,Score FROM Exercise_Question LEFT JOIN Question on Question.QuestionID = Exercise_Question.QuestionID where ExerciseID = @ExerciseID', (err, result) => {
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
            .input('QuestionID', sql.NVarChar, req.body.QuestionID)
            .input('ExerciseID', sql.NChar, req.body.ExerciseID)
            .query('INSERT INTO Exercise_Question (QuestionID,ExerciseID) VALUES (@QuestionID,@ExerciseID)', (err, result) => {
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
            .input('QuestionID', sql.NVarChar, req.params.QuestionID)
            .input('ExerciseID', sql.NChar, req.params.ExerciseID)
            .query('DELETE Exercise_Question WHERE QuestionID = @QuestionID AND ExerciseID = @ExerciseID', (err, result) => {
                if (err) {
                    console.log("Delete Question in Exercise erro !");
                } else {
                    res.json({ message: 'deltete success!' });
                }
            });
    }

};