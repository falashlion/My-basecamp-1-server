const mongoose = require('mongoose');
const userModel = require('../models/userModel');
const { responseHandler } = require('../utils/responseHandler');
const bcrypt = require('bcrypt');
exports.getAllUsers = (req, res, next) => {
    userModel.find().select('_id firstName lastName email is_admin userImage').exec()
        .then(docs => {
            const response = {
                count: docs.length,
                users: docs.map(doc => {
                    return {
                        _id: doc._id,
                        firstName: doc.firstName,
                        lastName: doc.lastName,
                        email: doc.email,
                        is_admin: doc.is_admin,
                        userImage: doc.userImage,
                        request: {
                            method: 'GET',
                            url: "http://localhost:5000/api/users/" + doc._id
                        }
                    }
                })
            }; 
            responseHandler(res, 200, "getting all users", { response });
        })
        .catch(err => {
            responseHandler(res, 500, "An error occurred", { error: err });
        });
};

exports.createUser = (req, res, next) => {
    userModel.find({ email: req.params.email }).exec().then(user => {
        if (user.length >= 1) {
            return responseHandler(res, 409, "User email already exists", {});
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err){
                    responseHandler(res, 500, "An error occurred", { error: err });
                } else {
                    const data = new userModel({
                        _id: new mongoose.Types.ObjectId(),
                        firstName: req.body.firstName || null,
                        lastName: req.body.lastName || null,
                        email: req.body.email,
                        password: hash,
                        userImage: null
                    });
                    data.save()
                        .then(result => {
                            responseHandler(res, 201, "User created successfully", {
                                user: {
                                    _id: result._id,
                                    firstName: result.firstName,
                                    lastName: result.lastName,
                                    email: result.email,
                                    userImage: result.userImage,
                                    request: {
                                        method: 'POST',
                                        url: "http://localhost:5000/api/users/" + result._id
                                    }
                                }
                             });
                        })
                        .catch(err => {
                            responseHandler(res, 500, "An error occurred", { error: err });
                        });
                }
            }); 
        }
    });
};

exports.getUser = (req, res, next) => {
    const id = req.params.userId;
    userModel.findById(id).exec()
        .then(doc => {
            if (doc) {
                responseHandler(res, 200, "User found", { 
                    user: {
                        _id: doc._id,
                        firstName: doc.firstName,
                        lastName: doc.lastName,
                        email: doc.email,
                        is_admin: doc.is_admin,
                        userImage: doc.userImage,
                        request: {
                            method: 'GET',
                            url: "http://localhost:5000/api/users/" + doc._id }
                 }
                });
            } else {
                responseHandler(res, 404, "No valid entry found for provided ID", {id : id});
            }
        })
        .catch(err => {
            responseHandler(res, 500, "An error occurred", { error: err });
        });
};

exports.updateUser = (req, res, next) => {
    const id = req.params.userId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    userModel.findByIdAndUpdate({ _id: id }, { $set: updateOps }).exec()
        .then(doc => {
            console.log(doc);
            responseHandler(res, 200, "User updated successfully", { user: {
                _id: doc._id,
                firstName: doc.firstName,
                lastName: doc.lastName,
                email: doc.email,
                is_admin: doc.is_admin,
                userImage: doc.userImage,
                request: {
                    method: 'PATCH',
                    url: "http://localhost:5000/api/users/" + doc._id }
         } });
        })
        .catch(err => {
            responseHandler(res, 500, "An error occurred", { error: err });
        });
};

exports.deleteUser = (req, res, next) => {
    const id = req.params.userId;
    userModel.deleteOne({ _id: id }).exec()
        .then(result => {
            responseHandler(res, 204, "User deleted successfully", {result });
        })
        .catch(err => {
            responseHandler(res, 500, "An error occurred", { error: err });
        });
};

exports.uploadImage = (req, res, next) => {
    const id = req.params.userId;
    userModel.updateOne({ _id: id }, { userImage: req.file.path }).exec()
        .then(docs => {
            responseHandler(res, 200, "image uploaded successfully", { user: docs });
        })
        .catch(err => {
            responseHandler(res, 500, "An error occurred", { error: err });
        });
};