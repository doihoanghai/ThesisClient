'use strict';
const util = require('util');
var sql = require('./db');
var bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");
module.exports = {

    login: (req, res) => {
        const request = new sql.Request()
            .input('UserName', sql.NVarChar, req.body.UserName)
            .query('SELECT * From ApplicationUsers Where UserName = @UserName', (err, result) => {
                if (err)
                    res.json({ message: 'Internal Server Erro' });
                else {
                    if (result.recordset == []) {
                        res.json({ message: "Username not exists" });
                    }
                    else {
                        if (bcrypt.compareSync(req.body.Password, result.recordset[0].PasswordHash))
                            res.json({
                                token: jwt.sign({ _id: result.recordset[0].Id, FullName: result.recordset[0].FullName, UserName: result.recordset[0].UserName, UserLevel: result.recordset[0].UserLevel }, 'RESTFULAPIs'),
                                FullName: result.recordset[0].FullName,
                                UserLevel: result.recordset[0].UserLevel
                            });
                        else
                            res.json({ message: 'Wrong User name or password ' });
                    }
                    
                }
            });
    },
    logout : (req, res) => {

    },
    signup: (req, res) => {
        const request1 = new sql.Request()
            .input('UserName', sql.NVarChar, req.body.UserName)
            .query('SELECT UserName FROM ApplicationUsers WHERE UserName = @Username', (err, result) => {
                if (result.recordsets[0].length != 0)
                    res.status(400).json({ message: 'Username already exists' });
                else {
                    var hash_password = bcrypt.hashSync(req.body.Password, 10);
                    if (req.body.UserLevel > 0) {
                        const request = new sql.Request()
                            .input('UserName', sql.NVarChar, req.body.UserName)
                            .input('PasswordHash', sql.NVarChar, hash_password)
                            .input('UserLevel', sql.Int, req.body.UserLevel)
                            .query('EXEC proc_Add_User @UserName,@PasswordHash,@UserLevel', (err, result) => {
                                if (err) {
                                    res.status(501).json({ message: 'Internal Server Erro !' });
                                }
                                else {
                                    res.end(JSON.stringify(result.recordset));
                                }
                            });
                    }
                    else {
                        res.status(400).json({ message: 'Cant create admin account' });
                    }
                }
            });
       
    },
    changePassword : (req, res) => {
        const request = new sql.Request()
            .input('UserName', sql.NVarChar, req.user.UserName)
            .query('SELECT * From ApplicationUsers Where UserName = @UserName', (err, result) => {
                if (err)
                    res.json({ message: 'Internal Server Erro' });
                else {
                    if (bcrypt.compareSync(req.body.Password, result.recordset[0].PasswordHash))
                    {
                        var newPass = bcrypt.hashSync(req.body.newPassword, 10);
                        const newRequest = new sql.Request()
                            .input('newPassword', sql.NVarChar, newPass)
                            .input('id', sql.NVarChar, req.user._id)
                            .query('UPDATE ApplicationUsers SET PasswordHash = @newPassword WHERE Id =@id', (err, result) => {
                                if (err) {
                                    res.json({ message: 'Internal Server Erro' });

                                }
                                res.json({ message: 'Change password success !' });
                            });
                    }
                    else
                        res.json({ message: 'Wrong User name or password ' });
                }
            });
    }


    

};