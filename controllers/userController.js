'use strict'

const bcrypt = require('bcrypt-nodejs');
const fs = require('fs');
const path = require('path');

const User = require('../models/user');

const jwt = require('../services/jwt');

function test(req, res){
    res.status(200).send({
        message: 'probando el controlador de usuarios y la accion pruebas',
        user: req.user
    });
}

function registerUser(req, res){
    let user = new User();

    let params = req.body;

    if(params.password && params.name && params.surname && params.email){
        user.name = params.name;
        user.surname = params.surname;
        user.email = params.email;
        user.role = 'ROLE_USER';
        user.image = null;

        User.findOne({email: user.email.toLowerCase()}, (err, isExistingUser) => {
            if(err){
                res.status(500).send({message: 'Error checking user'});
            }else{
                if(!isExistingUser){
                    // encrypt password and save to database
                    bcrypt.hash(params.password, null, null, (err, hash) => {
                        user.password = hash;
                        
                        user.save((err, userStored) => {
                            if(err){
                                res.status(500).send({message: 'Error saving the user'});
                            }else{
                                if(!userStored){
                                    res.status(404).send({message: 'User has not been registered'});
                                }else{
                                    res.status(200).send({user: userStored});
                                }
                            }
                        });
                    });
                }else{
                    res.status(200).send({
                        message: 'User with the entered email already exists'
                    });
                }
            }
        });
    }else{
        res.status(200).send({
            message: 'Data incorrect'
        });
    }
}

function login(req, res){
    let params = req.body;

    let email = params.email;
    let password = params.password;
    
    if(email){
        User.findOne({email: email.toLowerCase()}, (err, user) => {
            if(err){
                res.status(500).send({message: 'Error checking user'});
            }else{
                if(user){
                    bcrypt.compare(password, user.password, (err, check) => {
                        if(check){
                            //check and generate token
                            if(params.getToken){
                                res.status(200).send({
                                    token: jwt.createToken(user)
                                });
                            }else{
                                user.password = "";
                                res.status(200).send({user});
                            }
                        }else{
                            res.status(404).send({
                                message: 'Login failed, incorrect password'
                            });
                        }
                    });
                    
                }else{
                    res.status(404).send({
                        message: 'User does not exists'
                    });
                }
            }
        });
    }else{
        res.status(404).send({
            message: 'Email is empty'
        });
    }
}

module.exports = {
    test, 
    registerUser,
    login
}