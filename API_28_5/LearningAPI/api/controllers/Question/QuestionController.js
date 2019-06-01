'use strict';
const util = require('util');
var sql = require('../../db');
var formidable = require('formidable');
var fs = require('fs');

module.exports = {
    get: (req, res) => {
        const request = new sql.Request().query('SELECT * FROM Question', (err, result) => {
            if (err) console.log(err);
            res.end(JSON.stringify(result.recordsets));
        });
    },
    detail: (req, res) => {
        const request = new sql.Request()
            .input('QuestionID', sql.NChar, req.params.QuestionID)
            .query('SELECT * FROM Question WHERE QuestionID = @QuestionID', (err, result) => {
                if (err) console.log(err);
                res.end(JSON.stringify(result.recordsets));
            });
    },
    update: (req, res) => {
        const request = new sql.Request()
            .input('QuestionID', sql.NChar, req.params.QuestionID)
            .input('ExerciseID', sql.NChar, req.body.ExerciseID)
            .input('QuestionContent', sql.NVarChar, req.body.QuestionContent)
            .input('QuestionType', sql.Int, req.body.QuestionType)
            .input('QuestionTime', sql.Int, req.body.QuestionTime)
            .input('AnswerID', sql.NChar, req.body.AnswerID)
            .input('Score', sql.Int, req.body.Score)
            .query('UPDATE Question SET ExerciseID = @ExerciseID, QuestionContent = @QuestionContent, QuestionType = @QuestionType,QuestionTime = @QuestionTime,AnswerID = @AnswerID,Score = @Score WHERE QuestionID = @QuestionID', (err, result) => {
                if (err)
                    console.log(err);
                res.json({ message: 'Update success!' });
            });
    },
    store: (req, res) => {
        let data = req.body;
        const request = new sql.Request()
            .input('ExerciseID', sql.NChar, req.body.ExerciseID)
            .input('QuestionContent', sql.NVarChar, req.body.QuestionContent)
            .input('QuestionType', sql.Int, req.body.QuestionType)
            .input('QuestionTime', sql.Int, req.body.QuestionTime)
            .input('AnswerID', sql.NChar, req.body.AnswerID)
            .input('Score', sql.Int, req.body.Score)
            .query('EXEC proc_Add_Question @ExerciseID,@QuestionContent,@QuestionType,@QuestionTime,@AnswerID,@Score', (err, response) => {
                if (err) throw err;
                res.json({ message: 'Insert success!' });
            });
    },
    delete: (req, res) => {
        const request = new sql.Request()
            .input('QuestionID', sql.NChar, req.params.QuestionID)
            .query('DELETE Question WHERE QuestionID = @QuestionID', (err, result) => {
                if (err) console.log(err);
                res.json({ message: 'Delete success!' });
            });
    },
    getExerciseQ: (req, res) => {
        const request = new sql.Request()
            .input('ExerciseID', sql.NChar, req.params.ExerciseID)
            .query('SELECT * FROM Question WHERE ExerciseID = @ExerciseID', (err, result) => {
                if (err) console.log(err);
                res.end(JSON.stringify(result.recordsets));
            });
    },
    uploadFile: (req, res) => {
        var form = formidable.IncomingForm();

        ////need check
        //if (req.user > 1)
        //    res.status(403).json({ message: "Not Acceptable" });

        //var request = new sql.Request()
        //    .input('QuestionID', sql.NChar, req.params.QuestionID)
        //    .query('SELECT * FROM Question WHERE QuestionID = @QuestionID', (err, result) => {
        //        if (err)
        //            res.status(501).json("Internal Server Erro or Wrong Request Params");
        //        if (result.recordsets == [])
        //            res.status(400).json({ message: "Question not exist" });
        //    });

        form.parse(req, function (err, fields, files) {
            if (err) {
                res.status(501).json("Internal Server Erro or Wrong request");
            }
            var termpath = files.file.path;
            var filename = files.file.name;
            var filetype = filename.split('.')[1];

            var newfilename = req.params.QuestionID +'.'+ filetype;
            var newpath = 'C:/Users/DoiHoangHai/source/repos/LearningAPI/LearningAPI/files/' + newfilename;
            fs.rename(files.file.path, newpath, function (err) {
                if (err) throw err;

                res.json({ message: "Upload successful" });
            });
        });
    },

};