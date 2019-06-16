'use strict';
const util = require('util');
var sql = require('../../db');

module.exports = {
    //Answer
    get: (req, res) => {
        const request = new sql.Request()
            .input('QuestionID', sql.NChar, req.params.QuestionID)
            .query('SELECT * FROM Answer WHERE QuestionID = @QuestionID', (err, result) => {
            if (err) console.log(err);
            res.end(JSON.stringify(result.recordsets));
        });
    },
    update: (req, res) => {
        const request = new sql.Request()
            .input('AnswerID', sql.NVarChar, req.params.AnswerID)
            .input('QuestionID', sql.NVarChar, req.params.QuestionID)
            .input('AnswerContent', sql.NVarChar, req.body.AnswerContent)
            .input('AnswerPath', sql.NChar, req.body.AnswerPath)
            .query('UPDATE Answer SET AnswerContent = @AnswerContent, AnswerPath = @AnswerPath WHERE AnswerID = @AnswerID AND QuestionID = @QuestionID', (err, result) => {
                if (err)
                    console.log(err);
                res.json({ message: 'Update success!' });
            });
    },
    store: (req, res) => {
        let data = req.body;
        const request = new sql.Request()
            .input('QuestionID', sql.NVarChar, req.params.QuestionID)
            .input('AnswerContent', sql.NVarChar, req.body.AnswerContent)
            .input('AnswerPath', sql.NChar, req.body.AnswerPath)
            .query('EXEC proc_Add_Answer @QuestionID,@AnswerContent,@AnswerPath', (err, result) => {
                if (err)
                    console.log(err);
                res.json({ message: 'Insert success!' });
            });

    },
    delete: (req, res) => {
        const request = new sql.Request()
            .input('AnswerID', sql.NChar, req.params.AnswerID)
            .input('QuestionID', sql.NChar, req.params.QuestionID)
            .query('DELETE Answer   WHERE AnswerID = @AnswerID AND QuestionID = @QuestionID', (err, result) => {
                if (err) console.log(err);
                res.json({ message: 'Delete success!' });
            });
    },
    getExerciseAnswer: (req, res) => {
        const request = new sql.Request()
            .input('ExerciseID', sql.NChar, req.params.ExerciseID)
            .query('SELECT Answer.* FROM Answer LEFT JOIN Question on Question.QuestionID = Answer.QuestionID WHERE ExerciseID = @ExerciseID', (err, result) => {
                if (err)
                    res.status(400).json({ message: "Internal server erro or wrong request params" });
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

            var newfilename = req.params.AnswerID + '.' + filetype;
            var newpath = 'C:/Users/DoiHoangHai/source/repos/LearningAPI/LearningAPI/files/' + newfilename;
            fs.rename(files.file.path, newpath, function (err) {
                if (err) throw err;

                res.json({ message: "Upload successful" });
            });
        });
    },
  
};