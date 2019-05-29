'use strict';
const util = require('util');
var sql = require('../../db');

module.exports = {
    
    get: (req, res) => {
        const request = new sql.Request()
            .input('CategoryID', sql.NChar, req.params.CategoryID)
            .query('SELECT Course.* FROM Category_Course LEFT JOIN Course on Course.CourseID = Category_Course.CourseID WHERE CategoryID = @CategoryID ', (err, result) => {
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
            .input('CategoryID', sql.NVarChar, req.params.CategoryID)
            .input('CourseID', sql.NChar, req.body.CourseID)
            .query('INSERT INTO Category_Course (CategoryID,CourseID) VALUES (@CategoryID,@CourseID)', (err, result) => {
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
            .input('CategoryID', sql.NChar, req.params.CategoryID)
            .input('CourseID', sql.NChar, req.params.CourseID)
            .query('DELETE Category_Course WHERE CategoryID = @CategoryID AND CourseID = @CourseID', (err, result) => {
                if (err) {
                    console.log("Delete Category in Course erro !");
                } else {
                    res.json({ message: 'deltete success!' });
                }
            });
    }

};