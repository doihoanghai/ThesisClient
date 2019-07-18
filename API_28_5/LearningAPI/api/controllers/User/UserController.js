'use strict';
const util = require('util');
var sql = require('../../db');

module.exports = {
    getStudent: (req, res) => {
        var request = new sql.Request()
            .query('SELECT * FROM ApplicationUsers WHERE UserLevel = 2', (err, result) => {
                if (err)
                    res.json({ message: 'Internal Server Erro !' });
                res.json(result.recordsets);
            });
    },
    getTeacher: (req, res) => {
        var request = new sql.Request()
            .query('SELECT * FROM ApplicationUsers WHERE UserLevel = 1', (err, result) => {
                if (err)
                    res.json({ message: 'Internal Server Erro !' });
                res.json(result.recordsets);
            });
    },
    getProfile : (req,res) => {
        var request = new sql.Request()
            .input('Id',sql.NVarChar, req.user._id)
            .query('SELECT * FROM ApplicationUsers WHERE Id = @Id', (err,result) => {
                if (err)
                    res.json({ message: 'Internal Server Erro !' });
                res.json(result.recordsets);
            });
    }  
};