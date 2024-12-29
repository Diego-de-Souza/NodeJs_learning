var express = require('express');
var router = express.Router();
var HomeController = require('../controllers/HomeController');
const UserController = require('../controllers/UserController');
var Auth = require('../middleware/authMiddleware');

router.get('/', HomeController.index);
router.post('/user', UserController.create);
router.get('/user',Auth, UserController.index);
router.get('/user/:id', Auth, UserController.findUser);
router.put('/user', UserController.edit);
router.post('/passwordRecovery', UserController.recoveryPassword);
router.post('/changePassword', UserController.changePassword);
router.post('/login', UserController.login);
router.post('/validate',Auth, HomeController.validate);
router.delete('/user/:id', Auth, UserController.remove);

module.exports = router;