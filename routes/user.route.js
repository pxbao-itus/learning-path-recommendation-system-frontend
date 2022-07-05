const router = require('express').Router();
const controller = require('../controllers/user/user.controller')

router.get("/", controller.getUserInfo)




module.exports = router