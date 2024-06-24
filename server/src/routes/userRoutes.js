const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/auth-check');

const UserController = require('../controllers/UserController');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.memetype === 'image/png' || file.memetype === 'image/jpeg' || file.memetype === 'image/jpg' || file.memetype === 'image/gif' || file.memetype === 'image/svg'){
        cb(null, true);
    } else {
    cb(new Error, false);
    }
}
const File = multer({storage: storage,
    limit: {
        fileSize: 1024 * 1024 * 8
    },
    fileFilter: fileFilter
});

// get all users
router.get('/', UserController.getAllUsers);

// create a new user
router.post('/',UserController.createUser);

// get a specific user
router.get('/:userId', UserController.getUser);

// update a specific user
router.patch('/:userId', checkAuth, UserController.updateUser);

// delete a specific user
router.delete('/:userId', checkAuth, UserController.deleteUser);

// upload image for a specific user
router.post('/:userId/image',File.single('userImage'), UserController.uploadImage);

module.exports = router;
