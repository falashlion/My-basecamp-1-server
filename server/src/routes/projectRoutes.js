const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/auth-check');
const projectController = require('../controllers/ProjectController');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename : function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const File = multer({storage: storage});

// get all projects
router.get('/', projectController.getAllProjects);
// create a new project

router.post('/', checkAuth, projectController.createProject);

// get a specific project
router.get('/:id', projectController.getProjectById );

// update a specific project

router.patch('/:id', checkAuth, projectController.updateProject);

// delete a specific project

router.delete('/:id', checkAuth, projectController.deleteProject);

// upload attachments for a specific project
router.post('/:id/attachments', checkAuth, projectController.uploadAttachments);

module.exports = router;