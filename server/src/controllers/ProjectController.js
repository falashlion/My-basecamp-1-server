const mongoose = require('mongoose');
const projectModel = require('../models/projectModel');
const { responseHandler } = require('../utils/responseHandler');

exports.getAllProjects = (req, res, next) => {
    projectModel.find().select('_id name description created_by attachments').populate('created_by',' _id first_name last_name email is_admin').exec().then(docs => {
            const response = {
                count: docs.length,
                project: docs.map(doc => {
                return {
                    id:doc._id,
                    name: doc.name,
                    description: doc.description,
                    created_by: doc.created_by,
                    attachments: doc.attachments,
                    request: {
                        method: 'GET',
                        url: "http://localhost:5000/api/projects/" + docs._id
                    }
                }
            })
            }
                responseHandler(res, 200, "All Projects found successfully", {response });
        
    }).catch(err => {       
        responseHandler(res, 500, "An error occurred", { error: err });
    });
};

exports.createProject = (req, res, next) => {
    const data = new projectModel( {
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        created_by: req.body.created_by
    });
    data.save().then(docs => {
        responseHandler(res, 201, "Project created successfully", {
            Project: {
                id:docs._id,
                name: docs.name,
                description: docs.description,
                created_by: docs.created_by,
                attachments: docs.attachments,
                request: {
                    method: 'GET',
                    url: "http://localhost:5000/api/projects/" + docs._id
                }
            }
        });
    })
    .catch(err => {       
        responseHandler(res, 500, "An error occurred", { error: err });
    });  
};

exports.getProjectById = (req, res, next) => {
    const id = req.params.id
    projectModel.findById({_id: id}).populate('created_by', '_id first_name last_name email is_admin').exec().then(docs => {
        responseHandler(res, 200, "Project found successfully", {
            Project: {
                id:docs._id,
                name: docs.name,
                description: docs.description,
                created_by: docs.created_by,
                attachments: docs.attachments,
                request: {
                    method: 'GET',
                    url: "http://localhost:5000/api/projects/" + docs._id
                }
            }
        }); 
    }).catch(err => {       
        responseHandler(res, 500, "An error occurred", { error: err });
    });
};

exports.updateProject = (req, res, next) => {
    const id = req.params.id
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    projectModel.findByIdAndUpdate({_id: id}, {$set: updateOps}).populate('created_by','_id first_name last_name email is_admin').exec().then(docs => {
        if(!docs){
            responseHandler(res, 404, "No valid entry found for provided ID", {id : id});
        }
        responseHandler(res, 201, "Project updated successfully", {
            Project: {
                id:docs._id,
                name: docs.name,
                description: docs.description,
                created_by: docs.created_by,
                attachments: docs.attachments,
                request: {
                    method: 'GET',
                    url: "http://localhost:5000/api/projects/" + docs._id
                }
            }
        });
    }).catch(err => {       
        responseHandler(res, 500, "An error occurred", { error: err });
    });
};

exports.deleteProject = (req, res, next) => {
    const id = req.params.id
    projectModel.remove({_id: id}).exec().then(docs => {
        if(docs.deletedCount === 0){
            responseHandler(res, 404, "No valid entry found for provided ID", {id : id});
        }
        responseHandler(res, 204, "Project updated successfully", {docs});
    }).catch(err => {       
        responseHandler(res, 500, "An error occurred", { error: err });
    });
};

exports.uploadAttachments = (req, res, next) => {
    const attachments = req.files;
    const id = req.params.id;
    const attachmentPaths = attachments.map(file => file.path);

    projectModel.updateOne({_id: id}, { $push: { attachments: { $each: attachmentPaths } } }).exec().then( docs => {
        responseHandler(res, 200, "attachment added successfully", {project: docs})
    }).catch(err => {
        responseHandler(res, 500, "Sorry an Error", {error:err})
    });
};