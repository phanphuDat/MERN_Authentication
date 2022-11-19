var express = require('express');
var router = express.Router();
var { registerUser, loginUser, getMe } = require('../controllers/usersCtrl')
var  {protect} = require('../middleware/authMiddle')

router.post('/', registerUser)
router.post('/login', loginUser)

router.get('/me',protect, getMe)

module.exports = router;
