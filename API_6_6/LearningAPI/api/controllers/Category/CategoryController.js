'use strict';
const util = require('util');
var sql = require('../../db');

module.exports = {
    get: (req, res) => {
        const request = new sql.Request().query('SELECT * FROM Category', (err, result) => {
            if (err) console.log(err);
            res.end(JSON.stringify(result.recordsets));
        });
    },
    detail: (req, res) => {
        const request = new sql.Request()
            .input('CategoryID', sql.NChar, req.params.CategoryID)
            .query('SELECT * FROM Category WHERE CategoryID = @CategoryID', (err, result) => {
                if (err) console.log(err);
                res.end(JSON.stringify(result.recordset[0]));
            });
    },
    update: (req, res) => {
        const request = new sql.Request()
            .input('CategoryID', sql.NVarChar, req.params.CategoryID)
            .input('CategoryName', sql.NVarChar, req.body.CategoryName)
            .input('description', sql.NVarChar, req.body.Description)
            .query('UPDATE Category SET CategoryName = @CategoryName, Description = @description WHERE CategoryID = @CategoryID', (err, result) => {
                if (err)
                    console.log(err);
                res.json({ message: 'Update success!' });
            });
    },
    store: (req, res) => {
        let data = req.body;
        const request = new sql.Request()
            .input('CategoryName', sql.NVarChar, req.body.CategoryName)
            .input('description', sql.NVarChar, req.body.Description)
            .query('EXEC proc_Add_Category @categoryName,@description', (err, result) => {
                if (err)
                    console.log(err);
                res.json({ message: 'Insert success!' });
            });

    },
    delete: (req, res) => {
        const request = new sql.Request()
            .input('CategoryID', sql.NChar, req.params.CategoryID)
            .query('DELETE Category WHERE CategoryID = @CategoryID', (err, result) => {
                if (err) console.log(err);
                res.json({ message: 'Delete suvvess!' });
            });
    }

};